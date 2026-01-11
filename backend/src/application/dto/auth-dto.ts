import { Session } from "../../domain/entities/session-entity";
import { User } from "../../domain/entities/user-entity";

export interface SignupInput {
  email: string;
  password: string;
  fullname: string;
  avatarUrl?: string;
  about?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthOutput {
  session: Session;
  user: User;
  accessToken: string;
}
