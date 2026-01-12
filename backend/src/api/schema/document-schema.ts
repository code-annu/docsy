import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z
    .string("title is required")
    .trim()
    .min(1, "title must be at least 1 character long")
    .max(200, "title must be at most 200 characters long"),
  currentContent: z.string().default(""),
});

export const updateDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title must be at least 1 character long")
    .max(200, "title must be at most 200 characters long")
    .optional(),
  currentContent: z.string().optional(),
});

export const transferOwnershipSchema = z.object({
  newOwnerEmail: z.string("newOwnerEmail is required").trim(),
});

export type CreateDocumentBody = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentBody = z.infer<typeof updateDocumentSchema>;
export type TransferOwnershipBody = z.infer<typeof transferOwnershipSchema>;
