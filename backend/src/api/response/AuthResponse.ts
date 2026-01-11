import { AuthOutput } from "../../application/dto/auth-dto";

export abstract class AuthResponse {
  public static toResponse(
    authOutput: AuthOutput,
    message: string,
    code: number
  ): AuthResponse {
    return {
      status: "success",
      message,
      code,
      data: {
        user: {
          id: authOutput.user.id,
          email: authOutput.user.email,
          avatarUrl: authOutput.user.avatarUrl,
          joinedAt: authOutput.user.createdAt,
        },
        refreshToken: authOutput.session.token,
        accessToken: authOutput.accessToken,
      },
    };
  }
}
