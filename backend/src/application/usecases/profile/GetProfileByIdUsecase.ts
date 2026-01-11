import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class GetProfileByIdUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(id: string): Promise<ProfileOutput> {
    const user = await this.userRepo.findById(id);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    return {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      avatarUrl: user.avatarUrl,
      about: user.about,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
      isOnline: user.isOnline,
      lastActiveAt: user.lastActiveAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
