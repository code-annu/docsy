import { DocsyDocument } from "../../domain/entities/document-entity";
import { IDocsyDocument } from "../model/document-model";

export class DocumentMapper {
  static toDomain(doc: IDocsyDocument): DocsyDocument {
    return {
      id: doc._id.toString(),
      title: doc.title,
      ownerId: doc.ownerId.toString(),
      currentContent: doc.currentContent,
      currentVersion: doc.currentVersion,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      isPrivate: doc.isPrivate,
      lastViewedAt: doc.lastViewedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: IDocsyDocument[]): DocsyDocument[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
