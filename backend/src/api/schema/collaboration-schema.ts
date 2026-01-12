import { z } from "zod";
import { CollaborationRole } from "../../domain/entities/collaboration-entity";

export const createCollaborationSchema = z.object({
  collaboratorEmail: z.string("collaboratorEmail is required").trim(),
  role: z.enum([CollaborationRole.VIEWER, CollaborationRole.EDITOR], {
    message: "role must be 'viewer' or 'editor'",
  }),
});

export const updateCollaborationSchema = z.object({
  role: z
    .enum([CollaborationRole.VIEWER, CollaborationRole.EDITOR], {
      message: "role must be 'viewer' or 'editor'",
    })
    .optional(),
});

export type CreateCollaborationBody = z.infer<typeof createCollaborationSchema>;
export type UpdateCollaborationBody = z.infer<typeof updateCollaborationSchema>;
