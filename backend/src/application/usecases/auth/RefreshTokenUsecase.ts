import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { AuthOutput } from "../../dto/auth-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { generateTokens } from "../../../util/jwt-util";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";

@injectable()
export class RefreshTokenUsecase {
  constructor(
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(token: string): Promise<AuthOutput> {
    const session = await this.sessionRepo.findByToken(token);
    if (!session) {
      throw new NotFoundError("Session not found");
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedError("Session expired");
    }

    const user = await this.userRepo.findById(session.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.sessionRepo.delete(session.id);

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const newSession = await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { session: newSession, user, accessToken };
  }
}
