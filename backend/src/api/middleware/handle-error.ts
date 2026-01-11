import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/error/AppError";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.errorType.code).json({
      status: "error",
      code: error.errorType.code,
      error: {
        type: error.errorType.type,
        message: error.message,
      },
    });
  }
  res.status(500).json({
    status: "error",
    code: 500,
    error: { type: "DATABASE_ERROR", message: error.message },
  });
};
