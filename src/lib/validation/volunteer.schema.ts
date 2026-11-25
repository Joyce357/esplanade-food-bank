import { z } from "zod";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "./sanitize";

export const VOLUNTEER_ROLES = [
  "General Community Support",
  "Welcoming & Hospitality",
  "Food Distribution & Packing",
  "Community Outreach & Drives",
  "Open to Where Needed Most",
] as const;

export const volunteerSchema = z.object({
  fullName: z
    .string({ error: "Full name is required" })
    .max(200, "Name cannot exceed 100 characters")
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
    ),
  email: z
    .string({ error: "Email address is required" })
    .max(254, "Email address is too long")
    .transform(sanitizeEmail)
    .pipe(
      z
        .string()
        .max(254, "Email address is too long")
        .email("Please provide a valid email address")
    ),
  phone: z
    .string()
    .max(50, "Phone number is too long")
    .optional()
    .transform((val) => (val ? sanitizePhone(val) : undefined))
    .pipe(z.string().max(30, "Phone number is too long").optional()),
  preferredRole: z.enum(VOLUNTEER_ROLES, {
    error: "Please select a preferred role",
  }),
  notes: z
    .string()
    .max(4000, "Notes cannot exceed 2,000 characters")
    .optional()
    .transform((val) => (val ? sanitizeText(val) : undefined))
    .pipe(z.string().max(2000, "Notes cannot exceed 2,000 characters").optional()),
  // Honeypot field
  website_url_hp: z
    .string()
    .max(200)
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().max(4096).optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
