import { escapeHtml } from "@/lib/validation/sanitize";
import { GetFoodFormData } from "@/lib/validation/get-food.schema";

/**
 * Confidential Food Assistance Intake Alert
 *
 * PRIVACY PROTECTION RULE:
 * In compliance with client data protection requirements, full sensitive
 * household details and medical/dietary preferences are NEVER transmitted
 * over plain unencrypted email. Only a secure reference ID and contact
 * channel are provided for authorized intake staff.
 */
export function renderFoodAssistanceAlertEmail(
  data: GetFoodFormData,
  referenceId: string
): { html: string; text: string } {
  const safeName = escapeHtml(data.fullName);
  const safeContact = escapeHtml(data.contactInfo);
  const timestamp = new Date().toUTCString();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confidential Intake Alert: ${referenceId}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e1e1e; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #094425; color: #ffffff; padding: 24px;">
      <h2 style="margin: 0; font-size: 20px;">Esplanade Community Food Bank</h2>
      <p style="margin: 4px 0 0 0; opacity: 0.85; font-size: 14px;">Confidential Food Assistance Inquiry Alert</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background: #effdf0; border-left: 4px solid #094425; padding: 12px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; color: #094425;"><strong>Intake Reference ID:</strong> ${referenceId}</p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #2d3748;">Received: ${timestamp}</p>
      </div>

      <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 13px; color: #92400e;">
          <strong>Confidentiality Notice:</strong> Sensitive household composition and specific dietary/medical requirements are stored exclusively in the secure encrypted intake database. To protect applicant dignity and privacy, full records are accessible only through authenticated internal access.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #718096; width: 140px;">Applicant Name:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #1a202c;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #718096;">Contact Channel:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #094425;">${safeContact}</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 13px; color: #4a5568;">
        <p style="margin: 0 0 8px 0;"><strong>Action Required:</strong></p>
        <p style="margin: 0;">Authorized intake staff should review this application in the internal registry using Reference ID <strong>${referenceId}</strong> to schedule an initial consultation or pantry visit.</p>
      </div>
    </div>

    <div style="background: #f7fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; text-align: center;">
      Esplanade Community Food Bank Secure Client Care Gateway
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Esplanade Community Food Bank - Confidential Food Assistance Intake Alert
Reference ID: ${referenceId}
Received: ${timestamp}

Applicant Name: ${data.fullName}
Contact Channel: ${data.contactInfo}

CONFIDENTIALITY NOTICE:
Sensitive household composition and specific dietary/medical requirements are stored exclusively in the secure intake database and are not sent over plain email.

Action Required:
Authorized intake staff should log into the internal registry using Reference ID ${referenceId} to review full profile details.
  `.trim();

  return { html, text };
}
