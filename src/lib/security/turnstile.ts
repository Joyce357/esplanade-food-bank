/**
 * Cloudflare Turnstile CAPTCHA server-side verification helper
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(
  token?: string,
  remoteIp?: string
): Promise<{ success: boolean; previewMode: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const isProduction = process.env.NODE_ENV === "production";

  // In production, FAIL CLOSED if Turnstile credentials are not configured
  if (!secretKey || secretKey === "test_turnstile_secret") {
    if (isProduction) {
      console.error("[SECURITY FAIL-CLOSED] Cloudflare Turnstile secret key is missing in production.");
      return {
        success: false,
        previewMode: false,
        error: "Security verification service is not configured. Submissions are temporarily paused.",
      };
    }
    // Local development preview mode allows testing form rendering and validation
    return {
      success: true,
      previewMode: true,
    };
  }

  if (!token) {
    return {
      success: false,
      previewMode: false,
      error: "Spam verification token is missing. Please complete the security check.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        success: false,
        previewMode: false,
        error: "Unable to verify security challenge with Turnstile provider.",
      };
    }

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      return {
        success: false,
        previewMode: false,
        error: "Security verification failed. Please refresh and try again.",
      };
    }

    return {
      success: true,
      previewMode: false,
    };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return {
      success: false,
      previewMode: false,
      error: "Security challenge verification service unavailable.",
    };
  }
}
