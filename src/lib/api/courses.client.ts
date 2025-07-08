// import { useApiClient } from "@/lib/api/client";
import { Course } from "@/types/course";
import { AxiosInstance } from "axios";

export async function createCourse(api: AxiosInstance, data: FormData | Partial<Course>): Promise<Course> {
  const res = await api.post<Course>(
    `/courses/`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
}

export async function createSection(api: AxiosInstance, courseId : string, data: FormData | Partial<Course>): Promise<Course> {
  const res = await api.post<Course>(
    `/courses/${courseId}/sections/`,
    data,
  );
  return res.data;
}

export async function updateCourse(api: AxiosInstance, courseId: string, data: Partial<Course> | FormData): Promise<Course> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const res = await api.put<Course>(
    `/courses/${courseId}`,
    data,
    isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined
  );
  return res.data;
}

export async function deleteCourseById(api: AxiosInstance, courseId: string): Promise<Course> {
  const res = await api.delete<Course>(`/courses/${courseId}`);
  return res.data;
}