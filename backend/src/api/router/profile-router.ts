import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { ProfileController } from "../controller/ProfileController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import { updateProfileSchema } from "../schema/profile-schema";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TYPES.ProfileController
);

// All profile routes require authorization
profileRouter.use(validateAuthorization);

profileRouter.get("/me", profileController.getProfile.bind(profileController));

profileRouter.patch(
  "/me",
  validateRequestBody(updateProfileSchema),
  profileController.updateProfile.bind(profileController)
);

profileRouter.delete(
  "/me",
  profileController.deleteProfile.bind(profileController)
);

export { profileRouter };
