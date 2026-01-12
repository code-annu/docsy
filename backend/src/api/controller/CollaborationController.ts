import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CreateCollaborationUsecase } from "../../application/usecases/collaboration/CreateCollaborationUsecase";
import { GetDocumentCollaborationsUsecase } from "../../application/usecases/collaboration/GetDocumentCollaborationsUsecase";
import { UpdateCollaborationUsecase } from "../../application/usecases/collaboration/UpdateCollaborationUsecase";
import { DeleteCollaborationUsecase } from "../../application/usecases/collaboration/DeleteCollaborationUsecase";
import { CollaborationResponse } from "../response/CollaborationResponse";
import { AuthRequest } from "../middleware/validate-authorization";

@injectable()
export class CollaborationController {
  constructor(
    @inject(TYPES.CreateCollaborationUseCase)
    private readonly createCollaborationUsecase: CreateCollaborationUsecase,
    @inject(TYPES.GetDocumentCollaborationsUseCase)
    private readonly getDocumentCollaborationsUsecase: GetDocumentCollaborationsUsecase,
    @inject(TYPES.UpdateCollaborationUseCase)
    private readonly updateCollaborationUsecase: UpdateCollaborationUsecase,
    @inject(TYPES.DeleteCollaborationUseCase)
    private readonly deleteCollaborationUsecase: DeleteCollaborationUsecase
  ) {}

  async createCollaboration(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const senderId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      const result = await this.createCollaborationUsecase.execute({
        senderId,
        documentId,
        collaboratorEmail: req.body.collaboratorEmail,
        role: req.body.role,
      });
      const response = CollaborationResponse.toDetail(
        result,
        "Collaboration created successfully",
        201
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDocumentCollaborations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      const result = await this.getDocumentCollaborationsUsecase.execute(
        userId,
        documentId
      );
      const response = CollaborationResponse.toList(
        result,
        "Collaborations retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCollaboration(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const collaborationId = req.params.collaborationId as string;
      const result = await this.updateCollaborationUsecase.execute({
        userId,
        collaborationId,
        role: req.body.role,
      });
      const response = CollaborationResponse.toDetail(
        result,
        "Collaboration updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteCollaboration(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const collaborationId = req.params.collaborationId as string;
      await this.deleteCollaborationUsecase.execute(userId, collaborationId);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Collaboration deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
