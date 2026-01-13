import axiosInstance from "../client";

export async function postRequest<T>(endpoint: string, body?: unknown) {
  const response = await axiosInstance.post(`${endpoint}`, body, {
    method: "POST",
  });

  return response.data as T;
}
