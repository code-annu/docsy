import axiosInstance from "../client";

export async function getRequest<T>(endpoint: string, params?: any) {
  const response = await axiosInstance.get(`${endpoint}`, {
    method: "GET",
    params,
  });

  return response.data as T;
}
