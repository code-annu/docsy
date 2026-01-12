import { CollaborationOutput } from "@/application/dto/collaboration-dto";

export abstract class CollaborationResponse {
  public static toDetail(
    collaborationOutput: CollaborationOutput,
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: {
        id: collaborationOutput.id,
        collaborator: {
          id: collaborationOutput.collaborator.id,
          email: collaborationOutput.collaborator.email,
          fullname: collaborationOutput.collaborator.fullname,
          avatarUrl: collaborationOutput.collaborator.avatarUrl,
        },
        role: collaborationOutput.role,
        createdAt: collaborationOutput.createdAt,
        updatedAt: collaborationOutput.updatedAt,
      },
    };
  }

  public static toList(
    collaborationOutput: CollaborationOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: collaborationOutput.map((collaborationOutput) => {
        return {
          id: collaborationOutput.id,
          collaborator: {
            id: collaborationOutput.collaborator.id,
            email: collaborationOutput.collaborator.email,
            fullname: collaborationOutput.collaborator.fullname,
            avatarUrl: collaborationOutput.collaborator.avatarUrl,
          },
          role: collaborationOutput.role,
          createdAt: collaborationOutput.createdAt,
          updatedAt: collaborationOutput.updatedAt,
        };
      }),
    };
  }
}
