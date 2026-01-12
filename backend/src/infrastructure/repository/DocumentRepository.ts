import { injectable } from "inversify";
import { IDocumentRepository } from "../../domain/repository/IDocumentRepository";
import {
  DocsyDocument,
  DocsyDocumentCreate,
  DocsyDocumentUpdate,
} from "../../domain/entities/document-entity";
import { DocumentModel } from "../model/document-model";
import { DocumentMapper } from "../mapper/document-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class DocumentRepository implements IDocumentRepository {
  async create(document: DocsyDocumentCreate): Promise<DocsyDocument> {
    const doc = await DocumentModel.create({
      title: document.title,
      currentContent: document.currentContent,
      ownerId: document.ownerId,
    });
    return DocumentMapper.toDomain(doc);
  }

  async findById(id: string): Promise<DocsyDocument | null> {
    const doc = await DocumentModel.findById(id);
    return doc ? DocumentMapper.toDomain(doc) : null;
  }

  async update(
    id: string,
    updates: DocsyDocumentUpdate
  ): Promise<DocsyDocument> {
    const doc = await DocumentModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!doc) {
      throw new NotFoundError(`Document with id ${id} not found`);
    }
    return DocumentMapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    const result = await DocumentModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundError(`Document with id ${id} not found`);
    }
  }

  async deleteByOwnerId(ownerId: string): Promise<void> {
    await DocumentModel.updateMany(
      { ownerId },
      { isDeleted: true, deletedAt: new Date() }
    );
  }

  async findByIds(ids: string[]): Promise<DocsyDocument[]> {
    const docs = await DocumentModel.find({ _id: { $in: ids } });
    return DocumentMapper.toDomainList(docs);
  }

  async findByOwnerId(ownerId: string): Promise<DocsyDocument[]> {
    const docs = await DocumentModel.find({ ownerId });
    return DocumentMapper.toDomainList(docs);
  }
}
