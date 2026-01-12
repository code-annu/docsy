import { DocumentTransferOwnershipInput } from "@/application/dto/document-dto";
import { TYPES } from "@/config/types";
import { CollaborationRole } from "@/domain/entities/collaboration-entity";
import { DocsyDocument } from "@/domain/entities/document-entity";
import { ForbiddenError } from "@/domain/error/ForbiddenError";
import { NotFoundError } from "@/domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class TransferDocumentOwnershipUsecase {
  constructor(
    @inject(TYPES.IDocumentRepository)
    private documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepo: ICollaborationRepository,
    @inject(TYPES.IUserRepository)
    private userRepo: IUserRepository
  ) {}

  async execute(input: DocumentTransferOwnershipInput): Promise<DocsyDocument> {
    const { newOwnerEmail, currentOwnerId, documentId } = input;

    const currentOwner = await this.userRepo.findById(currentOwnerId);
    if (!currentOwner || currentOwner.isDeleted) {
      throw new NotFoundError("User as current owner not found");
    }

    const newOwner = await this.userRepo.findByEmail(newOwnerEmail);
    if (!newOwner || newOwner.isDeleted) {
      throw new NotFoundError("User as new owner not found");
    }

    const document = await this.documentRepo.findById(documentId);
    if (!document || document.isDeleted) {
      throw new NotFoundError("Document not found");
    }
    if (document.ownerId !== currentOwnerId) {
      throw new ForbiddenError(
        "Only document's current owner can transfer ownership"
      );
    }

    const newOwnerCollaboration =
      await this.collaborationRepo.findByDocumentIdAndUserId(
        documentId,
        newOwner.id
      );
    if (!newOwnerCollaboration) {
      throw new NotFoundError(
        "User as new owner needs to be a collaborator to become owner"
      );
    }

    const updatedDocument = await this.documentRepo.update(documentId, {
      ownerId: newOwner.id,
    });

    await this.collaborationRepo.updateByDocumentIdAndUserId(
      documentId,
      newOwner.id,
      { role: CollaborationRole.OWNER }
    );

    await this.collaborationRepo.updateByDocumentIdAndUserId(
      documentId,
      currentOwnerId,
      { role: CollaborationRole.EDITOR }
    );

    return updatedDocument;
  }
}
