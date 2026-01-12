import {
  CollaborationCreate,
  Collaboration,
  CollaborationUpdate,
} from "../entities/collaboration-entity";

export interface ICollaborationRepository {
  create(collaboration: CollaborationCreate): Promise<Collaboration>;
  findById(id: string): Promise<Collaboration | null>;
  update(id: string, updates: CollaborationUpdate): Promise<Collaboration>;
  updateByDocumentIdAndUserId(
    documentId: string,
    userId: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration>;
  delete(id: string): Promise<void>;
  deleteByDocumentId(documentId: string): Promise<void>;
  deleteOwnedByUserId(userId: string): Promise<void>;
  findByUserId(userId: string): Promise<Collaboration[]>;
  findNotOwnedByUserId(userId: string): Promise<Collaboration[]>;
  findByDocumentId(documentId: string): Promise<Collaboration[]>;
  findByDocumentIdAndUserId(
    documentId: string,
    userId: string
  ): Promise<Collaboration | null>;
}
