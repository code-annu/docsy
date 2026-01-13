export class StorageUtil {
  static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static saveAccessToken(accessToken: string) {
    return localStorage.setItem("accessToken", accessToken);
  }

  static saveRefreshToken(token: string) {
    return localStorage.setItem("refreshToken", token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static clearTokens() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
}
