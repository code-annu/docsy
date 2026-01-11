import { AppError } from "./AppError";

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, { type: "NOT_FOUND_ERROR", code: 404 });
    }
}