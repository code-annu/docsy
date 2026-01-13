export const API_BASE_URL = "http://localhost:3000/api";

import axios from "axios";
import { StorageUtil } from "../util/StorageUtil";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = StorageUtil.getAccessToken(); // Retrieve from storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
