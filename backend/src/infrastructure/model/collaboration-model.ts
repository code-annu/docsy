import mongoose, { Schema, Document } from "mongoose";
import { CollaborationRole } from "../../domain/entities/collaboration-entity";

export interface ICollaborationDocument extends Document {
  _id: mongoose.Types.ObjectId;
  documentId: mongoose.Types.ObjectId;
  collaboratorId: mongoose.Types.ObjectId;
  role: CollaborationRole;
  createdAt: Date;
  updatedAt: Date;
}

const CollaborationSchema = new Schema<ICollaborationDocument>(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    collaboratorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(CollaborationRole),
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure unique collaboration per document-user pair
CollaborationSchema.index(
  { documentId: 1, collaboratorId: 1 },
  { unique: true }
);

export const CollaborationModel = mongoose.model<ICollaborationDocument>(
  "Collaboration",
  CollaborationSchema
);
