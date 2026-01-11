import { Session, SessionCreate } from "../entities/session-entity";

export interface ISessionRepository {
  create(session: SessionCreate): Promise<Session>;
  delete(id: string): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  findByUserId(userId: string): Promise<Session | null>;
  findByToken(token: string): Promise<Session | null>;
  deleteByUserId(userId: string): Promise<Session>;
  deleteByToken(token: string): Promise<Session>;
}
