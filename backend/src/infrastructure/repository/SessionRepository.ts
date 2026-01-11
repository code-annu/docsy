import { injectable } from "inversify";
import { ISessionRepository } from "../../domain/repository/ISessionRepository";
import { Session, SessionCreate } from "../../domain/entities/session-entity";
import { SessionModel } from "../model/session-model";
import { SessionMapper } from "../mapper/session-mapper";
import mongoose from "mongoose";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class SessionRepository implements ISessionRepository {
  async create(session: SessionCreate): Promise<Session> {
    const doc = await SessionModel.create({
      userId: new mongoose.Types.ObjectId(session.userId),
      token: session.token,
      expiresAt: session.expiresAt,
    });
    return SessionMapper.toDomain(doc);
  }

  async delete(id: string): Promise<Session> {
    const doc = await SessionModel.findByIdAndDelete(id);
    if (!doc) {
      throw new NotFoundError(`Session with id ${id} not found`);
    }
    return SessionMapper.toDomain(doc);
  }

  async findById(id: string): Promise<Session | null> {
    const doc = await SessionModel.findById(id);
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<Session | null> {
    const doc = await SessionModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const doc = await SessionModel.findOne({ token });
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async deleteByUserId(userId: string): Promise<Session> {
    const doc = await SessionModel.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!doc) {
      throw new NotFoundError(`Session with userId ${userId} not found`);
    }
    return SessionMapper.toDomain(doc);
  }

  async deleteByToken(token: string): Promise<Session> {
    const doc = await SessionModel.findOneAndDelete({ token });
    if (!doc) {
      throw new NotFoundError(`Session with token not found`);
    }
    return SessionMapper.toDomain(doc);
  }
}
