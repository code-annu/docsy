import { ProfileOutput } from "../../application/dto/profile-dto";

export abstract class ProfileResponse {
  public static toDetail(
    profile: ProfileOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: {
        id: profile.id,
        username: profile.email,
        fullname: profile.fullname,
        avatarUrl: profile.avatarUrl,
        about: profile.about,
        isOnline: profile.isOnline,
        lastActiveAt: profile.lastActiveAt,
        joinedAt: profile.createdAt,
      },
    };
  }

  public static toList(
    profiles: ProfileOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: profiles.map((profile) => ({
        id: profile.id,
        username: profile.email,
        avatarUrl: profile.avatarUrl,
      })),
    };
  }
}
