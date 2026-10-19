import { z } from "zod";
import { sanitizeEmail } from "./sanitize";

export const subscribeSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .transform(sanitizeEmail)
    .pipe(z.string().email("Please provide a valid email address")),
  website_url_hp: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
