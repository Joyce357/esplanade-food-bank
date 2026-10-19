import { NextResponse } from "next/server";
import { volunteerSchema } from "@/lib/validation/volunteer.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { saveVolunteerApplication } from "@/lib/db/repository";
import { sendEmail, SendEmailResult } from "@/lib/email/resend";
import { renderVolunteerEmail } from "@/lib/email/templates/volunteer.template";

export async function POST(req: Request) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const ip = getClientIp(req);

    // 1. Rate limiting (12 submissions per 10 minutes per IP window)
    const rateLimit = await checkRateLimit(req, "volunteer", {
      maxRequests: 12,
      windowSeconds: 600,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from this connection. Please try again in ${rateLimit.retryAfterSeconds || 60} seconds.`,
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

    // 2. Honeypot check - silently drop spam bots
    if (
      typeof body === "object" &&
      body !== null &&
      "website_url_hp" in body &&
      Boolean((body as Record<string, unknown>).website_url_hp)
    ) {
      return NextResponse.json({
        success: true,
        message: "Application processed successfully.",
      });
    }

    // 3. Schema validation
    const validationResult = volunteerSchema.safeParse(body);
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
          message: "Please correct the errors in the application form.",
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

    // 5. Save to database / repository
    const stored = await saveVolunteerApplication(validData, ip);
    if (stored.error && isProduction) {
      return NextResponse.json(
        {
          success: false,
          message: stored.error,
        },
        { status: 503 }
      );
    }

    // 6. Format and send transactional notification email
    const recipient =
      process.env.VOLUNTEER_NOTIFICATION_EMAIL || process.env.VOLUNTEER_INBOX_EMAIL;

    let emailResult: SendEmailResult = { sent: false, previewMode: true, message: "" };

    if (recipient) {
      const { html, text } = renderVolunteerEmail(validData, stored.referenceId);
      emailResult = await sendEmail({
        to: recipient,
        subject: `[Volunteer Application] ${validData.preferredRole} - ${stored.referenceId}`,
        html,
        text,
        replyTo: validData.email,
      });
    } else if (isProduction) {
      console.error("[FAIL-CLOSED] No VOLUNTEER_NOTIFICATION_EMAIL configured in production.");
      return NextResponse.json(
        {
          success: false,
          message: "Volunteer application service is not configured. Real applications cannot be accepted.",
        },
        { status: 503 }
      );
    }

    // In production, ensure at least one reliable delivery channel succeeded
    if (isProduction && !emailResult.sent && stored.previewMode) {
      return NextResponse.json(
        {
          success: false,
          message: "Volunteer application service is currently offline. Real applications cannot be accepted.",
        },
        { status: 503 }
      );
    }

    const isPreview = stored.previewMode || emailResult.previewMode;

    return NextResponse.json({
      success: true,
      referenceId: stored.referenceId,
      previewMode: isPreview,
      isTestSubmission: isPreview,
      message: isPreview
        ? "[TEST PREVIEW] Volunteer application validated locally."
        : "Thank you for stepping forward! Your volunteer application has been received.",
      previewNotice: isPreview
        ? "[LOCAL TEST MODE] This application was processed in development test mode. No live email notification was dispatched and no permanent database record was saved."
        : undefined,
    });
  } catch (error) {
    console.error("Error handling /api/volunteer:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
