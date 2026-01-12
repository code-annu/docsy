import { Collaboration } from "../../domain/entities/collaboration-entity";
import { ICollaborationDocument } from "../model/collaboration-model";

export class CollaborationMapper {
  static toDomain(doc: ICollaborationDocument): Collaboration {
    return {
      id: doc._id.toString(),
      documentId: doc.documentId.toString(),
      collaboratorId: doc.collaboratorId.toString(),
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: ICollaborationDocument[]): Collaboration[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
