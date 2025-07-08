import { CreateSectionForm } from "@/components/admin/CreateSectionForm";

export default async function CreateSectionPage({ params }: { params: { courseId: string } }) {
const { courseId } = await params;
  return (
    <main className="@container flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-6">Create New Section</h2>
      <CreateSectionForm courseId={courseId}/>
    </main>
  );
}
