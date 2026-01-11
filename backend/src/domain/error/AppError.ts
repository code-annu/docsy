import { ErrorType } from "./ErrorType";

export class AppError extends Error {
    readonly errorType: ErrorType

    constructor(message: string, errorType: ErrorType) {
        super(message);
        this.errorType = errorType;
    }
}