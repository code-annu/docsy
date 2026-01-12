import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { CollaborationController } from "../controller/CollaborationController";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import { updateCollaborationSchema } from "../schema/collaboration-schema";

const collaborationRouter = Router();

const collaborationController = container.get<CollaborationController>(
  TYPES.CollaborationController
);

// Update collaboration
collaborationRouter.patch(
  "/:collaborationId",
  validateAuthorization,
  validateRequestBody(updateCollaborationSchema),
  collaborationController.updateCollaboration.bind(collaborationController)
);

// Delete collaboration
collaborationRouter.delete(
  "/:collaborationId",
  validateAuthorization,
  collaborationController.deleteCollaboration.bind(collaborationController)
);

export { collaborationRouter };
