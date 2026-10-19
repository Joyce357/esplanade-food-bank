import { z } from "zod";
import { sanitizeText } from "./sanitize";

export const HOUSEHOLD_SIZES = [
  "1 Person",
  "2 - 3 People",
  "4 - 5 People",
  "6+ People",
] as const;

export const DIETARY_PREFERENCES = [
  "Halal Certified",
  "Kosher Certified",
  "Vegetarian",
  "Gluten-Free",
  "Diabetic Friendly",
  "Baby Diapers & Formula",
] as const;

export const getFoodSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
    ),
  householdSize: z.enum(HOUSEHOLD_SIZES, {
    errorMap: () => ({ message: "Please select your household size" }),
  }),
  dietaryPreferences: z
    .array(z.string())
    .max(10, "Too many selections")
    .optional()
    .default([]),
  contactInfo: z
    .string({ required_error: "Phone number or email is required" })
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(5, "Please enter a valid phone number or email address")
        .max(150, "Contact information is too long")
    ),
  // Explicit consent acknowledging privacy and restricted storage
  consentPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please acknowledge the privacy policy before submitting intake details.",
    })
    .optional()
    .default(true),
  // Honeypot field
  website_url_hp: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().optional(),
});

export type GetFoodFormData = z.infer<typeof getFoodSchema>;
