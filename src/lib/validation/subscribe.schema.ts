import { z } from "zod";
import { sanitizeEmail } from "./sanitize";

export const subscribeSchema = z.object({
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
  website_url_hp: z
    .string()
    .max(200)
    .optional()
    .refine((val) => !val || val.length === 0, {
      message: "Spam detection triggered",
    }),
  turnstileToken: z.string().max(4096).optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
