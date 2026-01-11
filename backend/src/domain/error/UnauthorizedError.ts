import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, { type: "UNAUTHORIZED_ERROR", code: 401 });
    }
}