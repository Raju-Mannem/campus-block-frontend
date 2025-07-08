import { EditCourseForm } from "@/components/admin/EditCourseForm";
import { getCourseById } from "@/lib/api/courses";

export async function EditCoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  return (
    <main className="@container flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
      <EditCourseForm course={course} />
    </main>
  );
}
