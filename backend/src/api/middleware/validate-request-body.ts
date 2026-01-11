import { NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { Request, Response } from "express";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { DatabaseError } from "../../domain/error/DatabaseError";

export const validateRequestBody =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        throw new BadRequestError(error.issues[0].message);
      }
      throw new DatabaseError("Internal server error");
    }
  };
