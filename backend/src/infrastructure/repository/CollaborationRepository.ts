import { injectable } from "inversify";
import { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";
import {
  Collaboration,
  CollaborationCreate,
  CollaborationRole,
  CollaborationUpdate,
} from "../../domain/entities/collaboration-entity";
import { CollaborationModel } from "../model/collaboration-model";
import { CollaborationMapper } from "../mapper/collaboration-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class CollaborationRepository implements ICollaborationRepository {
  async create(collaboration: CollaborationCreate): Promise<Collaboration> {
    const doc = await CollaborationModel.create({
      documentId: collaboration.documentId,
      collaboratorId: collaboration.collaboratorId,
      role: collaboration.role,
    });
    return CollaborationMapper.toDomain(doc);
  }

  async findById(id: string): Promise<Collaboration | null> {
    const doc = await CollaborationModel.findById(id);
    return doc ? CollaborationMapper.toDomain(doc) : null;
  }

  async update(
    id: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration> {
    const doc = await CollaborationModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!doc) {
      throw new NotFoundError(`Collaboration with id ${id} not found`);
    }
    return CollaborationMapper.toDomain(doc);
  }

  async updateByDocumentIdAndUserId(
    documentId: string,
    userId: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration> {
    const doc = await CollaborationModel.findOneAndUpdate(
      { documentId, collaboratorId: userId },
      updates,
      { new: true }
    );
    if (!doc) {
      throw new NotFoundError(
        `Collaboration for document ${documentId} and user ${userId} not found`
      );
    }
    return CollaborationMapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    const result = await CollaborationModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundError(`Collaboration with id ${id} not found`);
    }
  }

  async deleteByDocumentId(documentId: string): Promise<void> {
    await CollaborationModel.deleteMany({ documentId });
  }

  async deleteOwnedByUserId(userId: string): Promise<void> {
    await CollaborationModel.deleteMany({
      collaboratorId: userId,
      role: CollaborationRole.OWNER,
    });
  }

  async findByUserId(userId: string): Promise<Collaboration[]> {
    const docs = await CollaborationModel.find({ collaboratorId: userId });
    return CollaborationMapper.toDomainList(docs);
  }

  async findNotOwnedByUserId(userId: string): Promise<Collaboration[]> {
    const docs = await CollaborationModel.find({
      collaboratorId: userId,
      role: { $ne: CollaborationRole.OWNER },
    });
    return CollaborationMapper.toDomainList(docs);
  }

  async findByDocumentId(documentId: string): Promise<Collaboration[]> {
    const docs = await CollaborationModel.find({ documentId });
    return CollaborationMapper.toDomainList(docs);
  }

  async findByDocumentIdAndUserId(
    documentId: string,
    userId: string
  ): Promise<Collaboration | null> {
    const doc = await CollaborationModel.findOne({
      documentId,
      collaboratorId: userId,
    });
    return doc ? CollaborationMapper.toDomain(doc) : null;
  }
}
