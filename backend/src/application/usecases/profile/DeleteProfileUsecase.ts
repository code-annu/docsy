import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    await this.userRepo.delete(id);
  }
}
