import {
  DocsyDocumentCreate,
  DocsyDocument,
  DocsyDocumentUpdate,
} from "../entities/document-entity";

export interface IDocumentRepository {
  create(document: DocsyDocumentCreate): Promise<DocsyDocument>;
  findById(id: string): Promise<DocsyDocument | null>;
  update(id: string, updates: DocsyDocumentUpdate): Promise<DocsyDocument>;
  delete(id: string): Promise<void>;
  deleteByOwnerId(ownerId: string): Promise<void>;
  findByIds(ids: string[]): Promise<DocsyDocument[]>;
  findByOwnerId(ownerId: string): Promise<DocsyDocument[]>;
}
