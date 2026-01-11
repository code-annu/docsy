import { Router } from "express";
import { container } from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { AuthController } from "../controller/AuthController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  signupSchema,
  loginSchema,
  refreshTokenSchema,
} from "../schema/auth-schema";

const authRouter = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signup.bind(authController)
);
authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login.bind(authController)
);
authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

export { authRouter };
