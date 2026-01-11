export interface ProfileUpdateInput {
  fullname?: string;
  avatarUrl?: string;
  about?: string;
}

export interface ProfileOutput {
  readonly id: string;
  readonly email: string;
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
