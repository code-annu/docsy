import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, { type: "FORBIDDEN_ERROR", code: 403 });
    }
}