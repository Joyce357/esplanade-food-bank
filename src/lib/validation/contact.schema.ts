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
  topic: z
    .enum(CONTACT_TOPICS, {
      errorMap: () => ({ message: "Please select an inquiry topic" }),
    }),
  message: z
    .string({ required_error: "Message is required" })
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
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
