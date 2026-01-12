import { inject, injectable } from "inversify";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { TYPES } from "@/config/types";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import {
  DocumentOutput,
  DocumentOwnerShipFilter,
} from "@/application/dto/document-dto";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { DocsyDocument } from "@/domain/entities/document-entity";

@injectable()
export class GetUserDocumentsUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private userRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    ownership: DocumentOwnerShipFilter
  ): Promise<DocumentOutput[]> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    let documents: DocsyDocument[] = [];

    if (ownership === DocumentOwnerShipFilter.MINE) {
      documents = await this.documentRepo.findByOwnerId(userId);
    } else if (ownership === DocumentOwnerShipFilter.OTHERS) {
      const collaborations = await this.collaborationRepo.findNotOwnedByUserId(
        userId
      );
      documents = await this.documentRepo.findByIds(
        collaborations.map((c) => c.documentId)
      );
    } else {
      const collaborations = await this.collaborationRepo.findByUserId(userId);
      documents = await this.documentRepo.findByIds(
        collaborations.map((c) => c.documentId)
      );
    }

    const documentsOutput: DocumentOutput[] = [];
    for (const document of documents) {
      const owner = await this.userRepo.findById(document.ownerId);
      if (owner && !owner.isDeleted) {
        documentsOutput.push({
          id: document.id,
          title: document.title,
          owner: owner,
          currentContent: document.currentContent,
          currentVersion: document.currentVersion,
          isDeleted: document.isDeleted,
          deletedAt: document.deletedAt,
          isPrivate: document.isPrivate,
          lastViewedAt: document.lastViewedAt,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt,
        });
      }
    }

    return documentsOutput;
  }
}
