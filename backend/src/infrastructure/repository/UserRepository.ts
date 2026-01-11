import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import {
  User,
  UserCreate,
  UserUpdate,
} from "../../domain/entities/user-entity";
import { UserModel } from "../model/user-model";
import { UserMapper } from "../mapper/user-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: UserCreate): Promise<User> {
    const doc = await UserModel.create({
      email: user.email,
      passwordHash: user.passwordHash,
      fullname: user.fullname,
      avatarUrl: user.avatarUrl ?? null,
      about: user.about ?? null,
    });
    return UserMapper.toDomain(doc);
  }

  async update(id: string, updates: UserUpdate): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!doc) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(doc);
  }

  async delete(id: string): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!doc) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(doc);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const docs = await UserModel.find({ _id: { $in: ids } });
    return UserMapper.toDomainList(docs);
  }
}
