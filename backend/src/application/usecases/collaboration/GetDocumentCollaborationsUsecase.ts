import { CollaborationOutput } from "@/application/dto/collaboration-dto";
import { TYPES } from "@/config/types";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetDocumentCollaborationsUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IDocumentRepository)
    private readonly documentRepo: IDocumentRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    documentId: string
  ): Promise<CollaborationOutput[]> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    const userCollaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        documentId,
        userId
      );
    if (!userCollaboration) {
      throw new ForbiddenError("User is not a collaborator of this document");
    }
    if (userCollaboration.role === CollaborationRole.VIEWER) {
      throw new ForbiddenError(
        "Collaborator with viewer role cannot get document collaborations"
      );
    }

    const collaborations = await this.collaborationRepo.findByDocumentId(
      documentId
    );

    const collaborationsOutput: CollaborationOutput[] = [];

    for (const collaboration of collaborations) {
      const collaborator = await this.userRepo.findById(
        collaboration.collaboratorId
      );
      if (collaborator && !collaborator.isDeleted) {
        collaborationsOutput.push({
          id: collaboration.id,
          collaborator: collaborator,
          role: collaboration.role,
          createdAt: collaboration.createdAt,
          updatedAt: collaboration.updatedAt,
        });
      }
    }

    return collaborationsOutput;
  }
}
