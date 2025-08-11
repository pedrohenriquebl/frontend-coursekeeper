import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { requestInterceptor } from './interceptors/request';

const BASE_URL = "http://localhost:3000";

export function isAxiosError(error: unknown): error is AxiosError<{ message: string }> {
  return axios.isAxiosError(error);
}

export const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

requestInterceptor(apiInstance);