import {
  DocumentCreateInput,
  DocumentOutput,
} from "@/application/dto/document-dto";
import { TYPES } from "@/config/types";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateDocumentUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private readonly documentRepo: IDocumentRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(input: DocumentCreateInput): Promise<DocumentOutput> {
    const { userId, title, currentContent } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) throw new NotFoundError("User not found");

    const document = await this.documentRepo.create({
      title,
      currentContent,
      ownerId: userId,
    });

    await this.collaborationRepo.create({
      documentId: document.id,
      collaboratorId: userId,
      role: CollaborationRole.OWNER,
    });

    return {
      id: document.id,
      title: document.title,
      owner: user,
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
