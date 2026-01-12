export enum CollaborationRole {
  OWNER = "owner",
  VIEWER = "viewer",
  EDITOR = "editor",
}

export interface Collaboration {
  readonly id: string;
  readonly documentId: string;
  readonly collaboratorId: string;
  readonly role: CollaborationRole;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CollaborationCreate {
  documentId: string;
  collaboratorId: string;
  role: CollaborationRole;
}

export interface CollaborationUpdate {
  role?: CollaborationRole;
}
