import mongoose, { Schema, Document } from "mongoose";

export interface IDocsyDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  ownerId: mongoose.Types.ObjectId;
  currentContent: string;
  currentVersion: number;
  isDeleted: boolean;
  deletedAt: Date | null;
  isPrivate: boolean;
  lastViewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocsyDocument>(
  {
    title: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currentContent: { type: String, default: "" },
    currentVersion: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    isPrivate: { type: Boolean, default: true },
    lastViewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const DocumentModel = mongoose.model<IDocsyDocument>(
  "Document",
  DocumentSchema
);
