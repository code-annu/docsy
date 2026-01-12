import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { CreateDocumentUsecase } from "../../application/usecases/document/CreateDocumentUsecase";
import { GetDocumentUsecase } from "../../application/usecases/document/GetDocumentUsecase";
import { UpdateDocumentUsecase } from "../../application/usecases/document/UpdateDocumentUsecase";
import { DeleteDocumentUsecase } from "../../application/usecases/document/DeleteDocumentUsecase";
import { GetUserDocumentsUsecase } from "../../application/usecases/document/GetUserDocumentsUsecase";
import { TransferDocumentOwnershipUsecase } from "../../application/usecases/document/TransferDocumentOwnershipUsecase";
import { DocumentResponse } from "../response/DocumentResponse";
import { AuthRequest } from "../middleware/validate-authorization";
import { DocumentOwnerShipFilter } from "../../application/dto/document-dto";

@injectable()
export class DocumentController {
  constructor(
    @inject(TYPES.CreateDocumentUseCase)
    private readonly createDocumentUsecase: CreateDocumentUsecase,
    @inject(TYPES.GetDocumentUseCase)
    private readonly getDocumentUsecase: GetDocumentUsecase,
    @inject(TYPES.UpdateDocumentUseCase)
    private readonly updateDocumentUsecase: UpdateDocumentUsecase,
    @inject(TYPES.DeleteDocumentUseCase)
    private readonly deleteDocumentUsecase: DeleteDocumentUsecase,
    @inject(TYPES.GetUserDocumentsUseCase)
    private readonly getUserDocumentsUsecase: GetUserDocumentsUsecase,
    @inject(TYPES.TransferDocumentOwnershipUseCase)
    private readonly transferDocumentOwnershipUsecase: TransferDocumentOwnershipUsecase
  ) {}

  async createDocument(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const result = await this.createDocumentUsecase.execute({
        userId,
        title: req.body.title,
        currentContent: req.body.currentContent,
      });
      const response = DocumentResponse.toDetail(
        result,
        "Document created successfully",
        201
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDocument(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      const result = await this.getDocumentUsecase.execute(userId, documentId);
      const response = DocumentResponse.toDetail(
        result,
        "Document retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateDocument(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      const result = await this.updateDocumentUsecase.execute({
        userId,
        documentId,
        title: req.body.title,
        currentContent: req.body.currentContent,
      });
      const response = DocumentResponse.toDetail(
        result,
        "Document updated successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteDocument(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      await this.deleteDocumentUsecase.execute(userId, documentId);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Document deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserDocuments(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.auth!.userId;
      const ownership =
        (req.query.ownership as DocumentOwnerShipFilter) ||
        DocumentOwnerShipFilter.ANY;
      const result = await this.getUserDocumentsUsecase.execute(
        userId,
        ownership
      );
      const response = DocumentResponse.toList(
        result,
        "Documents retrieved successfully",
        200
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async transferOwnership(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentOwnerId = req.auth!.userId;
      const documentId = req.params.documentId as string;
      const newOwnerEmail = req.body.newOwnerEmail;
      await this.transferDocumentOwnershipUsecase.execute({
        currentOwnerId,
        documentId,
        newOwnerEmail,
      });
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Document ownership transferred successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
