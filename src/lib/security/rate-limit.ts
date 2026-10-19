/**
 * Sliding Window Rate Limiter for Next.js App Router (Serverless-ready)
 *
 * Designed with community equity in mind:
 * Accommodates shared public IPs (community centers, library Wi-Fi, multi-family housing)
 * without allowing aggressive spam bots to flood endpoints.
 */

interface RateLimitConfig {
  maxRequests: number; // Maximum allowed requests within window
  windowSeconds: number; // Time window in seconds
}

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory fallback for local development or when Redis is not yet provisioned
const memoryStore = new Map<string, RateLimitRecord>();

// Clean up stale memory records periodically
const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

function cleanupMemoryStore(windowSeconds: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const threshold = now - windowSeconds * 1000;
  for (const [key, record] of memoryStore.entries()) {
    record.timestamps = record.timestamps.filter((t) => t > threshold);
    if (record.timestamps.length === 0) {
      memoryStore.delete(key);
    }
  }
}

export function getClientIp(req: Request): string {
  const headers = req.headers;

  // Cloudflare Connecting IP
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // X-Forwarded-For (take the first IP in the list, representing the real client)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  // X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}

export async function checkRateLimit(
  req: Request,
  endpoint: string,
  config: RateLimitConfig = { maxRequests: 12, windowSeconds: 600 }
): Promise<{ allowed: boolean; remaining: number; retryAfterSeconds?: number }> {
  const ip = getClientIp(req);
  const key = `${endpoint}:${ip}`;
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const threshold = now - windowMs;

  const isProduction = process.env.NODE_ENV === "production";
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // In production, FAIL CLOSED if persistent rate limiting service is absent
  if (isProduction && (!redisUrl || !redisToken) && process.env.ALLOW_MEMORY_RATE_LIMIT !== "true") {
    console.error(
      "[RATE-LIMIT FAIL-CLOSED] Persistent rate-limiting service (Upstash Redis) is not configured in production. Rejecting requests to safeguard serverless endpoints."
    );
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 60,
    };
  }

  // 1. Production Redis Check (if Upstash credentials are provided)
  if (redisUrl && redisToken) {
    try {
      // Direct REST call to Upstash Redis to keep bundle zero-dependency
      const multiUrl = `${redisUrl}/multi-exec`;
      const response = await fetch(multiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["ZREMRANGEBYSCORE", key, "0", threshold.toString()],
          ["ZCARD", key],
          ["ZADD", key, now.toString(), `${now}-${Math.random()}`],
          ["EXPIRE", key, config.windowSeconds.toString()],
        ]),
        cache: "no-store",
      });

      if (response.ok) {
        const results = await response.json();
        const count = (results[1]?.result as number) || 0;
        if (count >= config.maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            retryAfterSeconds: Math.ceil(config.windowSeconds / 2),
          };
        }
        return {
          allowed: true,
          remaining: Math.max(0, config.maxRequests - count - 1),
        };
      }
    } catch (err) {
      console.warn("Upstash Redis rate limit failed:", err);
      if (isProduction && process.env.ALLOW_MEMORY_RATE_LIMIT !== "true") {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: 60,
        };
      }
    }
  }

  // 2. In-Memory Sliding Window Fallback (Local Development Only)
  cleanupMemoryStore(config.windowSeconds);

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((t) => t > threshold);

  if (record.timestamps.length >= config.maxRequests) {
    const oldest = record.timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: config.maxRequests - record.timestamps.length,
  };
}
