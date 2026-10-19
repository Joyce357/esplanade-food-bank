/**
 * Input sanitization and safe text encoding utilities
 * Protects against XSS, injection, and control character exploits
 */

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    // Trim surrounding whitespace
    .trim()
    // Strip null bytes and ASCII control characters (except newline \n and carriage return \r)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Normalize newlines
    .replace(/\r\n/g, "\n");
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeEmail(email: unknown): string {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase().slice(0, 254);
}

export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== "string") return "";
  return phone.trim().slice(0, 30);
}
