export interface AuthResponse {
  status: string;
  message: string;
  code: number;
  data: AuthUser;
}

export interface AuthUser {
  user: { id: string; email: string; avatarUrl: string; joinedAt: Date };
  accessToken: string;
  refreshToken: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullname: string;
  avatarUrl?: string;
  about?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
