import { escapeHtml } from "@/lib/validation/sanitize";

export function renderSubscriberOptInEmail(
  email: string,
  unsubscribeToken: string
): { html: string; text: string } {
  const safeEmail = escapeHtml(email);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const unsubscribeUrl = `${siteUrl}/api/subscribe?action=unsubscribe&token=${encodeURIComponent(
    unsubscribeToken
  )}&email=${encodeURIComponent(email)}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to The Esplanade Gazette</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e1e1e; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #094425; color: #ffffff; padding: 24px;">
      <h2 style="margin: 0; font-size: 20px;">The Esplanade Gazette</h2>
      <p style="margin: 4px 0 0 0; opacity: 0.85; font-size: 14px;">Community Harvest &amp; Pantry Updates</p>
    </div>
    
    <div style="padding: 24px;">
      <h3 style="margin-top: 0; color: #094425;">Welcome to Our Neighbourhood Circle</h3>
      <p style="color: #4a5568;">
        Thank you for subscribing to monthly news from the Esplanade Community Food Bank. You will receive updates on seasonal food rescue totals, volunteer orientation dates, community market schedules, and local harvest stories.
      </p>

      <div style="background: #effdf0; border-radius: 8px; padding: 14px 16px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #094425;">
          <strong>Subscribed Address:</strong> ${safeEmail}
        </p>
      </div>

      <p style="font-size: 13px; color: #718096;">
        We respect your inbox. We will never share or sell your contact information.
      </p>
    </div>

    <div style="background: #f7fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; text-align: center;">
      <p style="margin: 0 0 6px 0;">Esplanade Community Food Bank • Downtown East Toronto</p>
      <p style="margin: 0;">
        Want to stop receiving emails? <a href="${unsubscribeUrl}" style="color: #718096; text-decoration: underline;">Unsubscribe safely here</a>.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Welcome to The Esplanade Gazette - Community Harvest & Pantry Updates
Esplanade Community Food Bank

Thank you for subscribing (${email}). You will receive updates on seasonal food rescue totals, volunteer orientation dates, and community market schedules.

To unsubscribe at any time, visit:
${unsubscribeUrl}
  `.trim();

  return { html, text };
}
