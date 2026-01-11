export interface User {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly fullname: string;
  readonly avatarUrl: string | null;
  readonly about: string | null;
  readonly isDeleted: boolean;
  readonly deletedAt: Date | null;
  readonly isOnline: boolean;
  readonly lastActiveAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserCreate {
  email: string;
  passwordHash: string;
  fullname: string;
  avatarUrl?: string;
  about?: string;
}

export interface UserUpdate {
  fullname?: string;
  avatarUrl?: string;
  about?: string;
}
