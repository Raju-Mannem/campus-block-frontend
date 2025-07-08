import baseApi from "@/lib/api/client";
import type { UserInspectData } from "@/types/user";

export async function getUserWithCourses(userId: string): Promise<UserInspectData> {
  const res = await baseApi.get<UserInspectData>(`/admin/users/${userId}`);
  return res.data;
}

export async function assignCoursesToUser(userId: string, courseIds: string[]): Promise<void> {
  await baseApi.post(`/admin/users/${userId}/assign-courses`, { courseIds });
}

export async function removeUserCourse(userId: string, courseId: string): Promise<void> {
  await baseApi.delete(`/admin/users/${userId}/enrolled-courses/${courseId}`);
}