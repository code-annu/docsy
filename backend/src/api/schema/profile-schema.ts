import { z } from "zod";

export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, "fullname must be at least 3 characters long")
    .max(100, "fullname must be at most 100 characters long")
    .optional(),
  avatarUrl: z.string().url("avatarUrl must be a valid URL").optional(),
  about: z
    .string()
    .trim()
    .max(500, "about must be at most 500 characters long")
    .optional(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
