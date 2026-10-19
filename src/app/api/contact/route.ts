import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact.schema";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { saveContactInquiry } from "@/lib/db/repository";
import { sendEmail, SendEmailResult } from "@/lib/email/resend";
import { renderContactEmail } from "@/lib/email/templates/contact.template";

export async function POST(req: Request) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const ip = getClientIp(req);

    // 1. Rate limiting (12 submissions per 10 minutes per IP window)
    const rateLimit = await checkRateLimit(req, "contact", {
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

    // 2. Honeypot protection - silently drop spam bots
    if (
      typeof body === "object" &&
      body !== null &&
      "website_url_hp" in body &&
      Boolean((body as Record<string, unknown>).website_url_hp)
    ) {
      return NextResponse.json({
        success: true,
        message: "Inquiry processed successfully.",
      });
    }

    // 3. Schema validation
    const validationResult = contactSchema.safeParse(body);
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
          message: "Please correct the errors in the form.",
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
    const stored = await saveContactInquiry(validData, ip);
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
      process.env.CONTACT_NOTIFICATION_EMAIL || process.env.CONTACT_INBOX_EMAIL;

    let emailResult: SendEmailResult = { sent: false, previewMode: true, message: "" };

    if (recipient) {
      const { html, text } = renderContactEmail(validData, stored.referenceId);
      emailResult = await sendEmail({
        to: recipient,
        subject: `[Contact Inquiry] ${validData.topic} - ${stored.referenceId}`,
        html,
        text,
        replyTo: validData.email,
      });
    } else if (isProduction) {
      console.error("[FAIL-CLOSED] No CONTACT_NOTIFICATION_EMAIL configured in production.");
      return NextResponse.json(
        {
          success: false,
          message: "Contact delivery service is not configured. Real submissions cannot be accepted.",
        },
        { status: 503 }
      );
    }

    // In production, ensure at least one reliable delivery channel succeeded
    if (isProduction && !emailResult.sent && stored.previewMode) {
      return NextResponse.json(
        {
          success: false,
          message: "Submission service is currently offline. Real submissions cannot be accepted.",
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
        ? "[TEST PREVIEW] Submission validated locally."
        : "Thank you for reaching out. Your message has been received.",
      previewNotice: isPreview
        ? "[LOCAL TEST MODE] This submission was processed in development test mode. No live email notification was dispatched and no permanent database record was saved."
        : undefined,
    });
  } catch (error) {
    console.error("Error handling /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
