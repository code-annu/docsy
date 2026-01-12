import { DocumentOutput } from "@/application/dto/document-dto";

export abstract class DocumentResponse {
  public static toDetail(
    documentOutput: DocumentOutput,
    message: string,
    code: number
  ) {
    const { owner } = documentOutput;
    return {
      status: "success",
      code,
      message,
      data: {
        id: documentOutput.id,
        title: documentOutput.title,
        owner: {
          id: owner.id,
          email: owner.email,
          fullname: owner.fullname,
          avatarUrl: owner.avatarUrl,
        },
        currentContent: documentOutput.currentContent,
        currentVersion: documentOutput.currentVersion,
        isPrivate: documentOutput.isPrivate,
        lastViewedAt: documentOutput.lastViewedAt,
        createdAt: documentOutput.createdAt,
        updatedAt: documentOutput.updatedAt,
      },
    };
  }

  public static toList(
    documentOutput: DocumentOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      code,
      message,
      data: documentOutput.map((documentOutput) => {
        const { owner } = documentOutput;
        return {
          id: documentOutput.id,
          title: documentOutput.title,
          owner: {
            id: owner.id,
            email: owner.email,
            fullname: owner.fullname,
            avatarUrl: owner.avatarUrl,
          },
          currentVersion: documentOutput.currentVersion,
          isPrivate: documentOutput.isPrivate,
          lastViewedAt: documentOutput.lastViewedAt,
        };
      }),
    };
  }
}
