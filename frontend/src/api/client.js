import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
export const backendBaseUrl = apiBaseUrl.replace(/\/api$/, "");
export const websocketUrl =
  import.meta.env.VITE_WS_URL || `${backendBaseUrl}/ws`;

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});
