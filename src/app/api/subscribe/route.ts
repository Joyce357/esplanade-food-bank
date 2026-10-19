import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validation/subscribe.schema";
import { escapeHtml } from "@/lib/validation/sanitize";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import {
  saveNewsletterSubscription,
  unsubscribeNewsletter,
} from "@/lib/db/repository";
import { sendEmail } from "@/lib/email/resend";
import { renderSubscriberOptInEmail } from "@/lib/email/templates/subscribe.template";

/**
 * POST /api/subscribe
 * Handles:
 * 1. New newsletter subscription with persistent consent audit
 * 2. Form submission for confirming unsubscribe (prevents bot pre-fetching issues)
 */
export async function POST(req: Request) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const ip = getClientIp(req);
    const contentType = req.headers.get("content-type") || "";

    // A. Handle Form POST for Confirming Unsubscribe (bot-safe)
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      const action = formData.get("action");
      const email = formData.get("email")?.toString() || "";
      const token = formData.get("token")?.toString() || "";

      if (action === "confirm_unsubscribe" && email && token) {
        const result = await unsubscribeNewsletter(email, token, ip);
        return new Response(
          `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribed - Esplanade Community Food Bank</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: white; padding: 36px; border-radius: 20px; border: 1px solid #e2e8f0; max-width: 480px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    h1 { color: #094425; font-size: 22px; margin-bottom: 12px; }
    p { color: #475569; line-height: 1.6; font-size: 15px; margin-bottom: 24px; }
    a { display: inline-block; background: #094425; color: white; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${result.success ? "Unsubscribed Successfully" : "Unsubscribe Notice"}</h1>
    <p>${escapeHtml(result.message)}</p>
    <a href="/">Return to Homepage</a>
  </div>
</body>
</html>`,
          {
            status: result.success ? 200 : 400,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          }
        );
      }
    }

    // B. Standard Newsletter Subscription Processing
    // 1. Rate limiting (10 subscriptions per 10 minutes per IP window)
    const rateLimit = await checkRateLimit(req, "subscribe", {
      maxRequests: 10,
      windowSeconds: 600,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many subscription attempts from this connection. Please try again in ${rateLimit.retryAfterSeconds || 60} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": (rateLimit.retryAfterSeconds || 60).toString(),
          },
        }
      );
    }

    // Parse JSON body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request payload. Expected JSON." },
        { status: 400 }
      );
    }

    // Check if confirming unsubscribe via JSON
    if (
      typeof body === "object" &&
      body !== null &&
      "action" in body &&
      (body as Record<string, unknown>).action === "confirm_unsubscribe"
    ) {
      const email = String((body as Record<string, unknown>).email || "");
      const token = String((body as Record<string, unknown>).token || "");
      const result = await unsubscribeNewsletter(email, token, ip);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // 2. Honeypot check - silently drop bots
    if (
      typeof body === "object" &&
      body !== null &&
      "website_url_hp" in body &&
      Boolean((body as Record<string, unknown>).website_url_hp)
    ) {
      return NextResponse.json({
        success: true,
        message: "Subscription processed successfully.",
      });
    }

    // 3. Schema validation
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(err.message);
      });

      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, turnstileToken } = validationResult.data;

    // 4. Cloudflare Turnstile CAPTCHA verification (fails closed in production)
    const turnstileResult = await verifyTurnstileToken(turnstileToken, ip);
    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: turnstileResult.error || "Security verification failed.",
        },
        { status: 400 }
      );
    }

    // 5. Save to persistent subscriber registry (FAILS CLOSED in production if DATABASE_URL missing)
    const subResult = await saveNewsletterSubscription(email, ip);

    if (subResult.status === "error" && isProduction) {
      return NextResponse.json(
        {
          success: false,
          message: subResult.error || "Subscriber registry service is currently offline.",
        },
        { status: 503 }
      );
    }

    if (subResult.status === "already_subscribed") {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to The Esplanade Gazette.",
      });
    }

    // 6. Send opt-in confirmation with unsubscribe token link
    const { html, text } = renderSubscriberOptInEmail(email, subResult.token);
    const emailResult = await sendEmail({
      to: email,
      subject: "Welcome to The Esplanade Gazette",
      html,
      text,
    });

    const isPreview = subResult.previewMode || emailResult.previewMode;

    return NextResponse.json({
      success: true,
      previewMode: isPreview,
      isTestSubmission: isPreview,
      message: isPreview
        ? "[TEST PREVIEW] Subscription validated locally."
        : "Thank you for subscribing! Please check your inbox for confirmation.",
      previewNotice: isPreview
        ? "[LOCAL TEST MODE] This subscription was processed in development test mode. Automated mailing list synchronization and live newsletter dispatch will activate upon official client launch."
        : undefined,
    });
  } catch (error) {
    console.error("Error handling /api/subscribe:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred while processing your subscription. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/subscribe?action=unsubscribe&token=...&email=...
 * Safe unsubscribe mechanism compliant with CAN-SPAM / CASL.
 * IMPORTANT: Renders a confirmation form to prevent automated email link scanners
 * (e.g. anti-virus / spam crawler bots) from pre-fetching and prematurely unsubscribing users!
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (action === "unsubscribe" && token && email) {
    const escapedEmail = escapeHtml(email);
    const escapedToken = escapeHtml(token);

    // Render interactive confirmation page instead of immediately altering status
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Confirm Unsubscribe - The Esplanade Gazette</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: white; padding: 36px; border-radius: 20px; border: 1px solid #e2e8f0; max-width: 480px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    h1 { color: #094425; font-size: 22px; margin-bottom: 12px; }
    p { color: #475569; line-height: 1.6; font-size: 15px; margin-bottom: 24px; }
    .email-badge { background: #f1f5f9; padding: 4px 12px; border-radius: 9999px; font-weight: 600; color: #094425; font-size: 13px; }
    .btn-submit { background: #094425; color: white; padding: 12px 28px; border-radius: 9999px; border: none; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s; }
    .btn-submit:hover { background: #0c5c32; }
    .btn-cancel { display: inline-block; margin-top: 14px; color: #64748b; font-size: 13px; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Confirm Unsubscribe</h1>
    <p>
      Are you sure you want to stop receiving monthly harvest updates, pantry distribution schedules, and volunteer notices for:
    </p>
    <p><span class="email-badge">${escapedEmail}</span></p>
    
    <form method="POST" action="/api/subscribe">
      <input type="hidden" name="action" value="confirm_unsubscribe" />
      <input type="hidden" name="email" value="${escapedEmail}" />
      <input type="hidden" name="token" value="${escapedToken}" />
      <button type="submit" class="btn-submit">
        Yes, Unsubscribe Me
      </button>
    </form>
    <div>
      <a href="/" class="btn-cancel">Cancel and return to homepage</a>
    </div>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid request parameters." },
    { status: 400 }
  );
}
