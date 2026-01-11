export interface Session {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface SessionCreate {
    userId: string;
    token: string;
    expiresAt: Date;
}

