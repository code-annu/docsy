import { deleteRequest } from "../../../services/api/delete-client";
import { getRequest } from "../../../services/api/get-client";
import { patchRequest } from "../../../services/api/patch-client";
import { postRequest } from "../../../services/api/post-client";
import type {
  Document,
  DocumentCreateRequest,
  DocumentResponse,
  DocumentsResponse,
  DocumentSummary,
  DocumentUpdateRequest,
  TransferDocumentOwnershipRequest,
} from "./types";

export abstract class DocumentApi {
  public static async getDocuments(): Promise<DocumentSummary[]> {
    const response = await getRequest<DocumentsResponse>("/documents");
    return response.data;
  }

  public static async createDocument(
    document: DocumentCreateRequest
  ): Promise<Document> {
    const response = await postRequest<DocumentResponse>(
      "/documents",
      document
    );
    return response.data;
  }

  public static async updateDocument(
    document: DocumentUpdateRequest
  ): Promise<Document> {
    const response = await patchRequest<DocumentResponse>(
      `/documents/${document.id}`,
      document
    );
    return response.data;
  }

  public static async deleteDocument(id: string): Promise<void> {
    await deleteRequest(`/documents/${id}`);
  }

  public static async getDocument(id: string): Promise<Document> {
    const response = await getRequest<DocumentResponse>(`/documents/${id}`);
    return response.data;
  }

  public static async transferOwnership(
    data: TransferDocumentOwnershipRequest
  ): Promise<Document> {
    const response = await patchRequest<DocumentResponse>(
      `/documents/${data.documentId}/transfer-ownership`,
      data.newOwnerEmail
    );
    return response.data;
  }
}
