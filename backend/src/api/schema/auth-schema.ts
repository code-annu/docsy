import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("invalid or missing email").trim(),
  password: z
    .string("password is required")
    .trim()
    .min(6, "password must be at least 6 characters long")
    .max(100, "password must be at most 100 characters long"),
  fullname: z
    .string("fullname is required")
    .trim()
    .min(3, "fullname must be at least 3 characters long")
    .max(100, "fullname must be at most 100 characters long"),
  avatarUrl: z.string().url().optional(),
  about: z
    .string()
    .trim()
    .max(500, "about must be at most 500 characters long")
    .optional(),
});

export const loginSchema = z.object({
  email: z.email("email is required").trim(),
  password: z.string("password is required").trim(),
});

export const refreshTokenSchema = z.object({
  token: z.string("token is required").trim(),
});

export type SignupBody = z.infer<typeof signupSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type RefreshTokenBody = z.infer<typeof refreshTokenSchema>;
