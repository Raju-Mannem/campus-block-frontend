import axios, { AxiosInstance } from "axios";
import { useSession } from "next-auth/react";

export const baseApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useApiClient(): AxiosInstance {
  const { data: session } = useSession();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (session?.customJwt && config.headers) {
      config.headers['Authorization'] = `Bearer ${session.customJwt}`;
    }
    return config;
  });

  return api;
}

export default baseApi;
