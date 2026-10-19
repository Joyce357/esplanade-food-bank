import { escapeHtml } from "@/lib/validation/sanitize";
import { VolunteerFormData } from "@/lib/validation/volunteer.schema";

export function renderVolunteerEmail(
  data: VolunteerFormData,
  referenceId: string
): { html: string; text: string } {
  const safeName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "Not provided";
  const safeRole = escapeHtml(data.preferredRole);
  const safeNotes = data.notes
    ? escapeHtml(data.notes).replace(/\n/g, "<br/>")
    : "No notes provided";
  const timestamp = new Date().toUTCString();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Volunteer Sign-Up: ${safeName}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e1e1e; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #094425; color: #ffffff; padding: 24px;">
      <h2 style="margin: 0; font-size: 20px;">Esplanade Community Food Bank</h2>
      <p style="margin: 4px 0 0 0; opacity: 0.85; font-size: 14px;">Volunteer Orientation Application</p>
    </div>
    
    <div style="padding: 24px;">
      <div style="background: #effdf0; border-left: 4px solid #094425; padding: 12px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; color: #094425;"><strong>Application Reference:</strong> ${referenceId}</p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #2d3748;">Received: ${timestamp}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #718096; width: 140px;">Applicant:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #1a202c;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #718096;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #094425;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #718096;">Phone:</td>
          <td style="padding: 8px 0;">${safePhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #718096;">Preferred Role:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #094425;">${safeRole}</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #718096;">Availability &amp; Notes:</h4>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 15px; color: #2d3748;">
          ${safeNotes}
        </div>
      </div>
    </div>

    <div style="background: #f7fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; text-align: center;">
      Esplanade Community Food Bank Volunteer Coordination System
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Esplanade Community Food Bank - Volunteer Application
Reference ID: ${referenceId}
Received: ${timestamp}

Applicant: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Preferred Role: ${data.preferredRole}

Availability & Notes:
${data.notes || "No notes provided"}
  `.trim();

  return { html, text };
}
