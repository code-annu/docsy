import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { DocumentController } from "../controller/DocumentController";
import { CollaborationController } from "../controller/CollaborationController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import {
  createDocumentSchema,
  updateDocumentSchema,
  transferOwnershipSchema,
} from "../schema/document-schema";
import { createCollaborationSchema } from "../schema/collaboration-schema";

const documentRouter = Router();

const documentController = container.get<DocumentController>(
  TYPES.DocumentController
);
const collaborationController = container.get<CollaborationController>(
  TYPES.CollaborationController
);

// Document CRUD endpoints
documentRouter.post(
  "/",
  validateAuthorization,
  validateRequestBody(createDocumentSchema),
  documentController.createDocument.bind(documentController)
);

documentRouter.get(
  "/",
  validateAuthorization,
  documentController.getUserDocuments.bind(documentController)
);

documentRouter.get(
  "/:documentId",
  validateAuthorization,
  documentController.getDocument.bind(documentController)
);

documentRouter.patch(
  "/:documentId",
  validateAuthorization,
  validateRequestBody(updateDocumentSchema),
  documentController.updateDocument.bind(documentController)
);

documentRouter.delete(
  "/:documentId",
  validateAuthorization,
  documentController.deleteDocument.bind(documentController)
);

// Transfer ownership endpoint
documentRouter.patch(
  "/:documentId/transfer-ownership",
  validateAuthorization,
  validateRequestBody(transferOwnershipSchema),
  documentController.transferOwnership.bind(documentController)
);

// Document collaborations endpoints
documentRouter.get(
  "/:documentId/collaborations",
  validateAuthorization,
  collaborationController.getDocumentCollaborations.bind(
    collaborationController
  )
);

documentRouter.post(
  "/:documentId/collaborations",
  validateAuthorization,
  validateRequestBody(createCollaborationSchema),
  collaborationController.createCollaboration.bind(collaborationController)
);

export { documentRouter };
