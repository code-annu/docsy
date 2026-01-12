import { TYPES } from "@/config/types";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { UnprocessableError } from "@/domain/error/UnprocessableError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteCollaborationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(userId: string, collaborationId: string): Promise<void> {
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

    if (collaboration.role === CollaborationRole.OWNER) {
      throw new UnprocessableError("Owner's collaboration cannot be deleted");
    }

    const userCollaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        collaboration.documentId,
        userId
      );
    if (!userCollaboration) {
      throw new ForbiddenError("User is not a collaborator of this document");
    }
    if (userCollaboration.role === CollaborationRole.VIEWER) {
      throw new ForbiddenError("Viewer cannot delete collaboration");
    }

    await this.collaborationRepo.delete(collaborationId);
  }
}
