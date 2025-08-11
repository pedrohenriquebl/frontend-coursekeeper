import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const PUBLIC_ENDPOINTS = ["/users/login", "/users/register"];

export const requestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const isPublicEndpoint = PUBLIC_ENDPOINTS.some(
        (endpoint) =>
          config.url?.endsWith(endpoint) || config.url?.includes(endpoint)
      );

      if (isPublicEndpoint) {
        return config;
      }

      const token = sessionStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error: ", error);
      return Promise.reject(error);
    }
  );
};
