import {
  CollaborationCreateInput,
  CollaborationOutput,
} from "@/application/dto/collaboration-dto";
import { TYPES } from "@/config/types";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateCollaborationUsecase {
  constructor(
    @inject(TYPES.ICollaborationRepository)
    private readonly collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IDocumentRepository)
    private readonly documentRepo: IDocumentRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(input: CollaborationCreateInput): Promise<CollaborationOutput> {
    const { senderId, documentId, collaboratorEmail, role } = input;

    const sender = await this.userRepo.findById(senderId);
    if (!sender || sender.isDeleted) {
      throw new NotFoundError("Sender not found");
    }

    const collaborator = await this.userRepo.findByEmail(collaboratorEmail);
    if (!collaborator || collaborator.isDeleted) {
      throw new NotFoundError("Collaborator not found");
    }

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }

    const senderCollaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        documentId,
        senderId
      );
    if (!senderCollaboration) {
      throw new ForbiddenError("Sender is not a collaborator of this document");
    }
    if (senderCollaboration.role === CollaborationRole.VIEWER) {
      throw new ForbiddenError(
        "Collaborator with viewer role cannot invite other collaborators"
      );
    }

    let collaboration = await this.collaborationRepo.findByDocumentIdAndUserId(
      documentId,
      collaborator.id
    );
    if (!collaboration) {
      collaboration = await this.collaborationRepo.create({
        documentId,
        collaboratorId: collaborator.id,
        role,
      });
    }
    return {
      id: collaboration.id,
      collaborator: collaborator,
      role: collaboration.role,
      createdAt: collaboration.createdAt,
      updatedAt: collaboration.updatedAt,
    };
  }
}
