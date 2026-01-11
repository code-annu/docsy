import { AppError } from "./AppError";

export class DatabaseError extends AppError {
    constructor(message: string) {
        super(message, { type: "DATABASE_ERROR", code: 500 });
    }
}