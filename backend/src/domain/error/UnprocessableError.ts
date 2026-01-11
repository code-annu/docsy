import { AppError } from "./AppError";

export class UnprocessableError extends AppError {
  constructor(message: string) {
    super(message, { type: "UNPROCESSABLE_ENTITY", code: 422 });
  }
}
