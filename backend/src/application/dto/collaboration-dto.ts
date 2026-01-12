import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { User } from "@/domain/entities/user-entity";

export interface CollaborationCreateInput {
  senderId: string;
  documentId: string;
  collaboratorEmail: string;
  role: CollaborationRole;
}

export interface CollaborationUpdateInput {
  userId: string;
  collaborationId: string;
  role?: CollaborationRole;
}

export interface CollaborationOutput {
  id: string;
  collaborator: User;
  role: CollaborationRole;
  createdAt: Date;
  updatedAt: Date;
}
