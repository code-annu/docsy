// export enum ErrorType {
//   CONFLICT_ERROR = 409,
//   UNAUTHORIZED_ERROR = 401,
//   NOT_FOUND_ERROR = 404,
//   FORBIDDEN_ERROR = 403,
//   BAD_REQUEST_ERROR = 400,
//   INTERNAL_SERVER_ERROR = 500,
//   UNPROCESSABLE_ENTITY = 422,
// }


export interface ErrorType {
  type: string;
  code: number
}