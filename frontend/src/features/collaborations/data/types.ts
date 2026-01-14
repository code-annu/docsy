export interface CollaborationsResponse {
  status: string;
  message: string;
  code: string;
  data: Collaboration[];
}

export interface CollaborationResponse {
  status: string;
  message: string;
  code: string;
  data: Collaboration;
}

export enum CollaborationRole {
  OWNER = "owner",
  VIEWER = "viewer",
  EDITOR = "editor",
}

export interface Collaboration {
  id: string;
  collaborator: {
    id: string;
    email: string;
    fullname: string;
    avatarUrl: string | null;
  };
  role: CollaborationRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollaborationCreateRequest {
  collaboratorEmail: string;
  role: CollaborationRole;
}

export interface CollaborationUpdateRequest {
  id: string;
  role: CollaborationRole;
}
