import { Resend } from "resend";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  sent: boolean;
  previewMode: boolean;
  messageId?: string;
  message: string;
  error?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const isProduction = process.env.NODE_ENV === "production";

  // Production Fail-Closed Check
  if (!apiKey || apiKey === "re_test_placeholder" || apiKey.includes("placeholder") || !fromEmail) {
    if (isProduction) {
      console.error(
        "[EMAIL FAIL-CLOSED] Transactional email credentials (RESEND_API_KEY / RESEND_FROM_EMAIL) missing in production."
      );
      return {
        sent: false,
        previewMode: false,
        message: "Email delivery service is currently unconfigured. Real submissions cannot be accepted.",
        error: "RESEND_API_KEY or RESEND_FROM_EMAIL missing in production.",
      };
    }

    // Local Development Preview Mode
    console.info(`[DEV EMAIL PREVIEW] To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.info(`[DEV EMAIL PREVIEW] Subject: ${subject}`);
    console.info(`[DEV EMAIL PREVIEW] From: ${fromEmail || "[Sender domain pending client configuration]"}`);
    if (replyTo) console.info(`[DEV EMAIL PREVIEW] Reply-To: ${replyTo}`);

    return {
      sent: false,
      previewMode: true,
      message:
        "Technical Preview: Form validated successfully. Email dispatch will be activated once RESEND_API_KEY and verified sender domain are configured by the client.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return {
        sent: false,
        previewMode: false,
        message: "Email dispatch provider returned an error.",
        error: error.message,
      };
    }

    return {
      sent: true,
      previewMode: false,
      messageId: data?.id,
      message: "Email notification dispatched successfully.",
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Resend send failed:", errorMessage);
    return {
      sent: false,
      previewMode: false,
      message: "Unable to connect to email notification service.",
      error: errorMessage,
    };
  }
}
