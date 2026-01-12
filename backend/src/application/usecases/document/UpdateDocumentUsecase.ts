import {
  DocumentOutput,
  DocumentUpdateInput,
} from "@/application/dto/document-dto";
import { inject, injectable } from "inversify";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { TYPES } from "@/config/types";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";

@injectable()
export class UpdateDocumentUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private userRepo: IUserRepository
  ) {}

  async execute(updateInput: DocumentUpdateInput): Promise<DocumentOutput> {
    const { userId, documentId, title, currentContent } = updateInput;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    const collaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        documentId,
        userId
      );
    if (!collaboration) {
      throw new ForbiddenError("User is not a collaborator");
    }

    if (collaboration.role === CollaborationRole.VIEWER) {
      throw new ForbiddenError("User is not allowed to update document");
    }

    const updatedDocument = await this.documentRepo.update(documentId, {
      title,
      currentContent,
    });

    const owner = await this.userRepo.findById(updatedDocument.ownerId);
    if (!owner || owner.isDeleted) {
      throw new NotFoundError("Owner not found");
    }

    return {
      id: updatedDocument.id,
      title: updatedDocument.title,
      owner: owner,
      currentContent: updatedDocument.currentContent,
      currentVersion: updatedDocument.currentVersion,
      isDeleted: updatedDocument.isDeleted,
      deletedAt: updatedDocument.deletedAt,
      isPrivate: updatedDocument.isPrivate,
      lastViewedAt: updatedDocument.lastViewedAt,
      createdAt: updatedDocument.createdAt,
      updatedAt: updatedDocument.updatedAt,
    };
  }
}
