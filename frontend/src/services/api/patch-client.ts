import axiosInstance, { API_BASE_URL } from "../client";

export async function patchRequest<T>(endpoint: string, body?: unknown) {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}${endpoint}`,
    body,
    { method: "PATCH" }
  );
  return response.data as T;
}
