export interface DocumentResponse {
  status: string;
  message: string;
  code: string;
  data: Document;
}

export interface DocumentsResponse {
  status: string;
  message: string;
  code: string;
  data: DocumentSummary[];
}

export interface Document {
  id: string;
  title: string;
  currentContent: string;
  owner: {
    id: string;
    fullname: string;
    email: string;
    avatarUrl: string | null;
  };
  currentVersion: number;
  isPrivate: boolean;
  lastViewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentSummary {
  id: string;
  title: string;
  owner: {
    id: string;
    fullname: string;
    email: string;
    avatarUrl: string | null;
  };
  currentVersion: number;
  isPrivate: boolean;
  lastViewedAt: Date;
}

export interface DocumentCreateRequest {
  title: string;
  currentContent: string;
}

export interface DocumentUpdateRequest extends Partial<DocumentCreateRequest> {
  id: string;
}

export interface TransferDocumentOwnershipRequest {
  documentId: string;
  newOwnerEmail: string;
}
