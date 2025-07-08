import { AdminTabs } from "@/components/admin/AdminTabs";
import { getCoursesForAdmin } from "@/lib/api/courses";

export default async function AdminDashboardPage() {
  const courses = await getCoursesForAdmin();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminTabs initialCourses={courses} />
    </main>
  );
}
