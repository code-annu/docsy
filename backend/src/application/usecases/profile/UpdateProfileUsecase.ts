import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ProfileOutput, ProfileUpdateInput } from "../../dto/profile-dto";

@injectable()
export class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(
    id: string,
    updates: ProfileUpdateInput
  ): Promise<ProfileOutput> {
    const user = await this.userRepo.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const updatedUser = await this.userRepo.update(id, updates);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      fullname: updatedUser.fullname,
      avatarUrl: updatedUser.avatarUrl,
      about: updatedUser.about,
      isDeleted: updatedUser.isDeleted,
      deletedAt: updatedUser.deletedAt,
      isOnline: updatedUser.isOnline,
      lastActiveAt: updatedUser.lastActiveAt,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
