import {
  CollaborationUpdateInput,
  CollaborationOutput,
} from "@/application/dto/collaboration-dto";
import { inject, injectable } from "inversify";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { TYPES } from "@/config/types";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { UnprocessableError } from "@/domain/error/UnprocessableError";

@injectable()
export class UpdateCollaborationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IDocumentRepository)
    private readonly documentRepo: IDocumentRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(input: CollaborationUpdateInput): Promise<CollaborationOutput> {
    const { userId, collaborationId, role } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const collaboration = await this.collaborationRepo.findById(
      collaborationId
    );
    if (!collaboration) {
      throw new NotFoundError("Collaboration not found");
    }

    const document = await this.documentRepo.findById(collaboration.documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    const userCollaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        document.id,
        userId
      );
    if (!userCollaboration) {
      throw new ForbiddenError("User is not a collaborator of this document");
    }
    if (userCollaboration.role === CollaborationRole.VIEWER) {
      throw new ForbiddenError(
        "Collaborator with viewer role cannot update other collaborators"
      );
    }

    if (collaboration.role === CollaborationRole.OWNER) {
      throw new UnprocessableError("Owner's collaboration cannot be updated");
    }

    if (role === CollaborationRole.OWNER) {
      throw new UnprocessableError("Role cannot be updated to owner");
    }

    const updatedCollaboration = await this.collaborationRepo.update(
      collaborationId,
      { role }
    );

    return {
      id: updatedCollaboration.id,
      collaborator: user,
      role: updatedCollaboration.role,
      createdAt: updatedCollaboration.createdAt,
      updatedAt: updatedCollaboration.updatedAt,
    };
  }
}
