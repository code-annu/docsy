import { User } from "@/domain/entities/user-entity";

export interface DocumentCreateInput {
  userId: string;
  title: string;
  currentContent: string;
}

export interface DocumentUpdateInput {
  userId: string;
  documentId: string;
  title?: string;
  currentContent?: string;
}

export interface DocumentTransferOwnershipInput {
  currentOwnerId: string;
  documentId: string;
  newOwnerEmail: string;
}

export interface DocumentOutput {
  id: string;
  title: string;
  owner: User;
  currentContent: string;
  currentVersion: number;
  isDeleted: boolean;
  deletedAt: Date | null;
  isPrivate: boolean;
  lastViewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum DocumentOwnerShipFilter {
  MINE = "mine",
  OTHERS = "others",
  ANY = "any",
}
