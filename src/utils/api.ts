import axios from "axios";

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const api_image_url = import.meta.env.VITE_API_IMAGE_URL;

export const api = axios.create({
  baseURL: backend_url,
  withCredentials: true,
});
