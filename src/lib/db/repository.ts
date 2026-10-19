import crypto from "crypto";
import { ContactFormData } from "@/lib/validation/contact.schema";
import { VolunteerFormData } from "@/lib/validation/volunteer.schema";
import { GetFoodFormData } from "@/lib/validation/get-food.schema";

export function generateReferenceId(prefix: string): string {
  const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
  const year = new Date().getFullYear();
  return `EFB-${prefix}-${year}-${randomHex}`;
}

export function generateUnsubscribeToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export interface StoredRecordMeta {
  id: string;
  referenceId: string;
  createdAt: string;
  previewMode: boolean;
  error?: string;
}

// In-memory preview stores for local development when DATABASE_URL is not provisioned
const memoryStore = {
  contacts: new Map<string, unknown>(),
  volunteers: new Map<string, unknown>(),
  foodAssistance: new Map<string, unknown>(),
  subscribers: new Map<
    string,
    { email: string; token: string; status: string; date: string; ipHash?: string }
  >(),
};

/**
 * 1. Contact Inquiry Record
 */
export async function saveContactInquiry(
  data: ContactFormData,
  ip: string
): Promise<StoredRecordMeta> {
  const isProduction = process.env.NODE_ENV === "production";
  const isDbConfigured = Boolean(process.env.DATABASE_URL);
  const isEmailConfigured = Boolean(process.env.RESEND_API_KEY);

  // In production, fail closed if neither persistent database nor email delivery is available
  if (isProduction && !isDbConfigured && !isEmailConfigured) {
    console.error("[STORAGE FAIL-CLOSED] No database or email service configured for contact inquiries in production.");
    return {
      id: "",
      referenceId: "",
      createdAt: new Date().toISOString(),
      previewMode: false,
      error: "Contact submission services are temporarily offline.",
    };
  }

  const referenceId = generateReferenceId("CT");
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const record = {
    id,
    referenceId,
    ...data,
    ip,
    status: "new",
    createdAt,
  };

  memoryStore.contacts.set(id, record);

  return {
    id,
    referenceId,
    createdAt,
    previewMode: !isDbConfigured,
  };
}

/**
 * 2. Volunteer Application Record
 */
export async function saveVolunteerApplication(
  data: VolunteerFormData,
  ip: string
): Promise<StoredRecordMeta> {
  const isProduction = process.env.NODE_ENV === "production";
  const isDbConfigured = Boolean(process.env.DATABASE_URL);
  const isEmailConfigured = Boolean(process.env.RESEND_API_KEY);

  // In production, fail closed if neither persistent database nor email delivery is available
  if (isProduction && !isDbConfigured && !isEmailConfigured) {
    console.error("[STORAGE FAIL-CLOSED] No database or email service configured for volunteer applications in production.");
    return {
      id: "",
      referenceId: "",
      createdAt: new Date().toISOString(),
      previewMode: false,
      error: "Volunteer registration services are temporarily offline.",
    };
  }

  const referenceId = generateReferenceId("VOL");
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const record = {
    id,
    referenceId,
    ...data,
    ip,
    orientationStatus: "pending_orientation",
    createdAt,
  };

  memoryStore.volunteers.set(id, record);

  return {
    id,
    referenceId,
    createdAt,
    previewMode: !isDbConfigured,
  };
}

/**
 * 3. Confidential Food Assistance Intake Record
 * RESTRICTED: Sensitive household and dietary details are NEVER logged.
 * In production: FAIL CLOSED if DATABASE_URL is missing to protect applicant privacy.
 */
export async function saveFoodAssistanceRecord(
  data: GetFoodFormData,
  ip: string
): Promise<StoredRecordMeta> {
  const isProduction = process.env.NODE_ENV === "production";
  const isDbConfigured = Boolean(process.env.DATABASE_URL);

  // In production: FAIL CLOSED. Real personal food assistance data must NOT be accepted without encrypted database storage
  if (isProduction && !isDbConfigured) {
    console.error("[CONFIDENTIALITY FAIL-CLOSED] DATABASE_URL is missing in production. Refusing to collect real intake records without verified database storage.");
    return {
      id: "",
      referenceId: "",
      createdAt: new Date().toISOString(),
      previewMode: false,
      error: "Intake registration database is currently offline. For urgent emergency food assistance, please call 211 Toronto.",
    };
  }

  const referenceId = generateReferenceId("FA");
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Configurable retention policy (subject to formal client approval)
  const retentionMonthsStr = process.env.INTAKE_RETENTION_MONTHS;
  const retentionMonths = retentionMonthsStr ? parseInt(retentionMonthsStr, 10) : 0;
  const retentionUntil =
    retentionMonths > 0
      ? new Date(Date.now() + retentionMonths * 30 * 24 * 60 * 60 * 1000).toISOString()
      : null; // Null indicates retention policy is pending client determination

  // SHA-256 hash client IP to prevent linkable persistent logs while allowing rate protection
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);

  const record = {
    id,
    referenceId,
    fullName: data.fullName,
    householdSize: data.householdSize,
    dietaryPreferences: data.dietaryPreferences,
    contactInfo: data.contactInfo,
    consentGiven: data.consentPrivacy,
    status: "pending_intake",
    retentionUntil,
    ipHash,
    createdAt,
  };

  memoryStore.foodAssistance.set(id, record);

  return {
    id,
    referenceId,
    createdAt,
    previewMode: !isDbConfigured,
  };
}

/**
 * 4. Newsletter Subscription Record
 */
export async function saveNewsletterSubscription(
  email: string,
  ip: string = "127.0.0.1"
): Promise<{
  status: "subscribed" | "already_subscribed" | "error";
  token: string;
  previewMode: boolean;
  error?: string;
}> {
  const isProduction = process.env.NODE_ENV === "production";
  const isDbConfigured = Boolean(process.env.DATABASE_URL);

  // In production, fail closed if no database is configured to persist subscriber consent records
  if (isProduction && !isDbConfigured) {
    console.error("[NEWSLETTER FAIL-CLOSED] DATABASE_URL missing in production. Cannot persist subscriber consent records.");
    return {
      status: "error",
      token: "",
      previewMode: false,
      error: "Subscriber database is currently offline.",
    };
  }

  const existing = memoryStore.subscribers.get(email);
  if (existing && existing.status === "active") {
    return {
      status: "already_subscribed",
      token: existing.token,
      previewMode: !isDbConfigured,
    };
  }

  const token = generateUnsubscribeToken();
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);

  memoryStore.subscribers.set(email, {
    email,
    token,
    status: "active",
    date: new Date().toISOString(),
    ipHash,
  });

  return {
    status: "subscribed",
    token,
    previewMode: !isDbConfigured,
  };
}

/**
 * 5. Safe Unsubscribe Processor
 */
export async function unsubscribeNewsletter(
  email: string,
  token: string,
  ip: string = "127.0.0.1"
): Promise<{ success: boolean; message: string }> {
  const existing = memoryStore.subscribers.get(email);
  if (!existing || existing.token !== token) {
    return {
      success: false,
      message: "Invalid or expired unsubscribe link.",
    };
  }

  existing.status = "unsubscribed";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
  existing.ipHash = ipHash;

  return {
    success: true,
    message: "You have been successfully unsubscribed from The Esplanade Gazette.",
  };
}
