import axiosInstance from "../../../services/client";
import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  SignupCredentials,
} from "./types";

export abstract class AuthApi {
  public static async signup(
    credentials: SignupCredentials
  ): Promise<AuthUser> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      credentials
    );
    return response.data.data;
  }

  public static async login(credentials: LoginCredentials): Promise<AuthUser> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data.data;
  }

  public static async refreshToken(token: string): Promise<AuthUser> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/refresh-token",
      { token }
    );
    return response.data.data;
  }
}
