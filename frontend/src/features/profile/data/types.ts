export interface ProfileResponse {
  status: string;
  code: number;
  message: string;
  data: Profile;
}

export interface Profile {
  id: string;
  fullname: string;
  email: string;
  avatarUrl: string | null;
  about: string | null;
  isOnline: boolean;
  lastActiveAt: Date;
  joinedAt: Date;
}

export interface ProfileUpdateRequest {
  fullname?: string;
  avatarUrl?: string | null;
  about?: string | null;
}
