import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { LoginInput, AuthOutput } from "../../dto/auth-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import * as bcrypt from "bcrypt";
import { generateTokens } from "../../../util/jwt-util";

@injectable()
export class LoginUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository
  ) {}

  async execute(input: LoginInput): Promise<AuthOutput> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const matched = await bcrypt.compare(input.password, user.passwordHash);
    if (!matched) {
      throw new UnauthorizedError("Invalid password");
    }

    await this.sessionRepo.deleteByUserId(user.id);

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const session = await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { session, user, accessToken };
  }
}
