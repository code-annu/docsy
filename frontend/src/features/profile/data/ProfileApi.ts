import { deleteRequest } from "../../../services/api/delete-client";
import { getRequest } from "../../../services/api/get-client";
import { patchRequest } from "../../../services/api/patch-client";
import type { Profile, ProfileResponse, ProfileUpdateRequest } from "./types";

export abstract class ProfileApi {
  public static async getProfile(): Promise<Profile> {
    const response = await getRequest<ProfileResponse>("/profile/me");
    return response.data;
  }

  public static async updateProfile(
    profile: ProfileUpdateRequest
  ): Promise<Profile> {
    const response = await patchRequest<ProfileResponse>(
      "/profile/me",
      profile
    );
    return response.data;
  }

  public static async deleteProfile(): Promise<void> {
    await deleteRequest("/profile/me");
  }
}
