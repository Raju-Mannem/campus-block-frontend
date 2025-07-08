// import { getServerSession } from "next-auth/next";
import axios, { AxiosInstance } from "axios";
import { auth } from "@/auth"; 

export async function getServerApi(): Promise<AxiosInstance> {
  const session = await auth();

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


