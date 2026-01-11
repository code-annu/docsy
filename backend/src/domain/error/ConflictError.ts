import { AppError } from "./AppError";

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, { type: "CONFLICT_ERROR", code: 409 });
    }
}