import { z } from "zod";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "./sanitize";

export const CONTACT_TOPICS = [
  "Food Assistance Inquiry",
  "Volunteering Inquiry",
  "Donations & Food Drives",
  "Community Partnership",
  "General Inquiry",
] as const;

export const contactSchema = z.object({
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
  topic: z.enum(CONTACT_TOPICS, {
    error: "Please select an inquiry topic",
  }),
  message: z
    .string({ error: "Message is required" })
    .max(5000, "Message cannot exceed 3,000 characters")
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(3000, "Message cannot exceed 3,000 characters")
    ),
  // Honeypot field - must remain empty
  website_url_hp: z
    .string()
    .max(200)
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
