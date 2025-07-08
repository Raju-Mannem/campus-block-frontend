import { CreateCourseForm } from "@/components/admin/CreateCourseForm";

export default function CreateCoursePage() {
  return (
    <main className="@container flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
      <CreateCourseForm />
    </main>
  );
}
