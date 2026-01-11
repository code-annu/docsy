import { NextFunction, Request, Response } from "express";
import { JWTPayload, verifyAccessToken } from "../../util/jwt-util";
import { UnauthorizedError } from "../../domain/error/UnauthorizedError";

export interface AuthRequest extends Request {
  auth?: JWTPayload;
}

export function validateAuthorization(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing Authorization header");
  }
  const token = authHeader.substring("Bearer ".length);
  let payload: JWTPayload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
  req.auth = payload;
  next();
}
