import { UserInspectPanel } from "@/components/admin/UserInspectPanel";
import { getUserWithCourses } from "@/lib/api/users";

export default async function UserInspectPage({ params }: { params: { userId: string } }) {
  const user = await getUserWithCourses(params.userId);
  return (
    <main className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Inspect User</h2>
      <UserInspectPanel user={user} />
    </main>
  );
}
