import { deleteRequest } from "../../../services/api/delete-client";
import { getRequest } from "../../../services/api/get-client";
import { patchRequest } from "../../../services/api/patch-client";
import { postRequest } from "../../../services/api/post-client";
import type {
  Collaboration,
  CollaborationCreateRequest,
  CollaborationResponse,
  CollaborationsResponse,
  CollaborationUpdateRequest,
} from "./types";

export abstract class CollaborationApi {
  public static async getCollaborations(
    documentId: string
  ): Promise<Collaboration[]> {
    const response = await getRequest<CollaborationsResponse>(
      `/documents/${documentId}/collaborations`
    );
    return response.data;
  }

  public static async createCollaboration(
    documentId: string,
    collaboration: CollaborationCreateRequest
  ): Promise<Collaboration> {
    const response = await postRequest<CollaborationResponse>(
      `/documents/${documentId}/collaborations`,
      collaboration
    );
    return response.data;
  }

  public static async updateCollaboration(
    collaboration: CollaborationUpdateRequest
  ): Promise<Collaboration> {
    const response = await patchRequest<CollaborationResponse>(
      `/collaborations/${collaboration.id}`,
      { role: collaboration.role }
    );
    return response.data;
  }

  public static async deleteCollaboration(
    collaborationId: string
  ): Promise<void> {
    await deleteRequest(`/collaborations/${collaborationId}`);
  }
}
