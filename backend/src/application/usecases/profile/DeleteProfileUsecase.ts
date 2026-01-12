import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "@/domain/repository/ICollaborationRepository";
import { IDocumentRepository } from "@/domain/repository/IDocumentRepository";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IDocumentRepository)
    private documentRepo: IDocumentRepository,
    @inject(TYPES.ICollaborationRepository)
    private collaborationRepo: ICollaborationRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    await this.userRepo.delete(id);
    const documents = await this.documentRepo.findByOwnerId(id);
    await this.documentRepo.deleteByOwnerId(id);
    for (const document of documents) {
      await this.collaborationRepo.deleteByDocumentId(document.id);
    }
  }
}
