import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, { type: "BAD_REQUEST_ERROR", code: 400 });
    }
}
