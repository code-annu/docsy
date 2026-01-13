import { AxiosError } from "axios";

export interface DocsyError {
  code: number;
  error: {
    type: string;
    message: string;
  };
  status: string;
}

export const mapToCustomError = (err: any): DocsyError => {
  console.log(err);
  if (err instanceof AxiosError) {
    const errorData = err.response?.data as DocsyError;
    return errorData;
  } else {
    return {
      code: 500,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
      status: "Internal Server Error",
    };
  }
};
