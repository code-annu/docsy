import { DocumentOutput } from "@/application/dto/document-dto";
import { TYPES } from "@/config/types";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetDocumentUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private userRepo: IUserRepository
  ) {}

  async execute(userId: string, documentId: string): Promise<DocumentOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    const documentOwner = await this.userRepo.findById(document.ownerId);
    if (!documentOwner || documentOwner.isDeleted) {
      throw new NotFoundError("Document owner not found");
    }

    const collaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        documentId,
        userId
      );

    if (!collaboration) {
      throw new ForbiddenError("User is not a collaborator");
    }

    return {
      id: document.id,
      title: document.title,
      owner: documentOwner,
      currentContent: document.currentContent,
      currentVersion: document.currentVersion,
      isDeleted: document.isDeleted,
      deletedAt: document.deletedAt,
      isPrivate: document.isPrivate,
      lastViewedAt: document.lastViewedAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
