import baseApi from "@/lib/api/client";
import {getServerApi} from "@/lib/api/serverApi"
import { Course, Section } from "@/types/course";
// import { AxiosInstance } from "axios";

export async function getCoursesForAdmin(): Promise<Course[]> {
  const res = await baseApi.get<Course[]>(`/courses`);
  return res.data;
}

export async function getCourseById(courseId: string): Promise<Course> {
    const api = await getServerApi();
  const res = await api.get<Course>(`/courses/${courseId}`);
  return res.data;
}

export async function getSectionById(courseId: string, sectionId: string): Promise<Section> {
  const api = await getServerApi();
  console.log(courseId);
  console.log(sectionId);
  const res = await api.get<Section>(`/courses/${courseId}/sections/${sectionId}/`);
  return res.data;
}

export async function deleteSectionById(courseId: string, sectionId: string): Promise<Course> {
  const api = await getServerApi();
  const res = await api.delete<Course>(`/courses/${courseId}/sections/${sectionId}`);
  return res.data;
}