import { TYPES } from "@/config/types";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteDocumentUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private readonly documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(userId: string, documentId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) throw new NotFoundError("User not found");

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    if (document.ownerId !== userId) {
      throw new ForbiddenError("Only owner can delete document");
    }

    await this.documentRepo.delete(documentId);
    await this.collaborationRepo.deleteByDocumentId(documentId);
  }
}
