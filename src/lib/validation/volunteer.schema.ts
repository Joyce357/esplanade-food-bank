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
    .string({ required_error: "Full name is required" })
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
    ),
  email: z
    .string({ required_error: "Email address is required" })
    .transform(sanitizeEmail)
    .pipe(z.string().email("Please provide a valid email address")),
  phone: z
    .string()
    .optional()
    .transform(sanitizePhone)
    .pipe(z.string().max(30, "Phone number is too long").optional()),
  preferredRole: z.enum(VOLUNTEER_ROLES, {
    errorMap: () => ({ message: "Please select a preferred role" }),
  }),
  notes: z
    .string()
    .optional()
    .transform(sanitizeText)
    .pipe(z.string().max(2000, "Notes cannot exceed 2,000 characters").optional()),
  // Honeypot field
  website_url_hp: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
