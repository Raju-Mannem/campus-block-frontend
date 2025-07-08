"use server";

import { deleteSectionById } from "@/lib/api/courses";
import { revalidatePath } from "next/cache";

export async function deleteSection(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const sectionId = formData.get("sectionId") as string;
  if (!courseId || !sectionId) return;
  await deleteSectionById(courseId, sectionId);
  revalidatePath(`/admin/courses/${courseId}`);
}
