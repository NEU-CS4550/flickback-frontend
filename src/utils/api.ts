import axios from "axios";
import { getToken } from "./token";

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const api_image_url = import.meta.env.VITE_API_IMAGE_URL;

export const api = axios.create({
  baseURL: backend_url,
  withCredentials: true,
});

// inject token into every request as auth header
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token != "") config.headers.Authorization = "Bearer " + getToken();
  return config;
});
