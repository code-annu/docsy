import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { SignupInput, AuthOutput } from "../../dto/auth-dto";
import { ConflictError } from "../../../domain/error/ConflictError";
import * as bcrypt from "bcrypt";
import { generateTokens } from "../../../util/jwt-util";

@injectable()
export class SignupUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository
  ) {}

  async execute(input: SignupInput): Promise<AuthOutput> {
    const existingUser = await this.userRepo.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictError(`Email ${input.email} is already exists`);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.userRepo.create({
      email: input.email,
      passwordHash,
      fullname: input.fullname,
      avatarUrl: input.avatarUrl,
      about: input.about,
    });

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const session = await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return { session, user, accessToken };
  }
}
