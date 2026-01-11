import { User } from "../../domain/entities/user-entity";
import { IUserDocument } from "../model/user-model";

export class UserMapper {
  static toDomain(doc: IUserDocument): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      fullname: doc.fullname,
      avatarUrl: doc.avatarUrl,
      about: doc.about,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      isOnline: doc.isOnline,
      lastActiveAt: doc.lastActiveAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: IUserDocument[]): User[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
