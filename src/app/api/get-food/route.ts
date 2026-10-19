import { NextResponse } from "next/server";
import { getFoodSchema } from "@/lib/validation/get-food.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { saveFoodAssistanceRecord } from "@/lib/db/repository";
import { sendEmail } from "@/lib/email/resend";
import { renderFoodAssistanceAlertEmail } from "@/lib/email/templates/food-assistance.template";

export async function POST(req: Request) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const ip = getClientIp(req);

    // 1. Rate limiting - Generous window (15 submissions per 10 mins)
    // to accommodate shared Wi-Fi networks in community hubs, shelters, or libraries
    const rateLimit = await checkRateLimit(req, "get-food", {
      maxRequests: 15,
      windowSeconds: 600,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many inquiries from this network connection. Please try again in ${rateLimit.retryAfterSeconds || 60} seconds, or call 211 Toronto for immediate assistance.`,
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

    // 2. Honeypot check - silently drop bots
    if (
      typeof body === "object" &&
      body !== null &&
      "website_url_hp" in body &&
      Boolean((body as Record<string, unknown>).website_url_hp)
    ) {
      return NextResponse.json({
        success: true,
        message: "Assistance inquiry processed successfully.",
      });
    }

    // 3. Schema validation
    const validationResult = getFoodSchema.safeParse(body);
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
          message: "Please complete all required fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 4. Cloudflare Turnstile CAPTCHA verification (fails closed in production)
    const turnstileResult = await verifyTurnstileToken(validData.turnstileToken, ip);
    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: turnstileResult.error || "Security verification failed.",
        },
        { status: 400 }
      );
    }

    // 5. Save to restricted database / repository (FAILS CLOSED in production if DATABASE_URL missing)
    const stored = await saveFoodAssistanceRecord(validData, ip);
    if (stored.error && isProduction) {
      return NextResponse.json(
        {
          success: false,
          message: stored.error,
        },
        { status: 503 }
      );
    }

    // 6. Minimal Confidential Email Alert
    // Full dietary and household information is strictly NOT transmitted over email
    const recipient =
      process.env.FOOD_ASSISTANCE_ALERT_EMAIL || process.env.FOOD_ASSISTANCE_INBOX_EMAIL;

    let emailResult = { sent: false, previewMode: true };

    if (recipient) {
      const { html, text } = renderFoodAssistanceAlertEmail(validData, stored.referenceId);
      emailResult = await sendEmail({
        to: recipient,
        subject: `[Confidential Intake Alert] Reference ${stored.referenceId}`,
        html,
        text,
      });
    }

    const isPreview = stored.previewMode || emailResult.previewMode;

    return NextResponse.json({
      success: true,
      referenceId: stored.referenceId,
      previewMode: isPreview,
      isTestSubmission: isPreview,
      message: isPreview
        ? "[TEST PREVIEW] Intake inquiry validated locally."
        : "Thank you for reaching out. Your assistance inquiry has been received.",
      previewNotice: isPreview
        ? "[LOCAL TEST MODE] This inquiry was processed in development test mode. No confidential intake records have been stored in live systems."
        : undefined,
    });
  } catch (error) {
    console.error("Error handling /api/get-food:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred. For immediate food assistance, please call 211 Toronto (free, 24/7 community dispatch).",
      },
      { status: 500 }
    );
  }
}
