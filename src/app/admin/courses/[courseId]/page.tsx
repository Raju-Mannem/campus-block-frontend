import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getCourseById } from "@/lib/api/courses";
import Link from "next/link";
import Image from "next/image";
import { deleteSection } from "@/lib/server-actions/deleteSection";
import { Section } from "@/types/course"

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const course = await getCourseById(courseId);
  if (!course) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold mb-4">Title: {course.title}</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-6">
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            width={320}
            height={180}
            className="rounded border object-cover"
          />
        )}
        <div>
          <p className="mb-2"><span className="font-semibold">Instructor:</span> {course.instructorName}</p>
          <p className="mb-2"><span className="font-semibold">Category:</span> {course.category}</p>
          <p className="mb-2"><span className="font-semibold">Level:</span> {course.level}</p>
          <p className="mb-2"><span className="font-semibold">Status:</span> {course.status}</p>
          <p className="mb-2"><span className="font-semibold">Price:</span> {course.price ? `₹${course.price}` : "Free"}</p>
          {course.discount !== undefined && (
            <p className="mb-2"><span className="font-semibold">Discount:</span> {course.discount}%</p>
          )}
          <p className="mb-2"><span className="font-semibold">Enrollments:</span> {course.enrollments?.length ?? 0}</p>
        </div>
      </div>
      <p className="mb-6">{course.description}</p>

      <div className="flex gap-4 mb-6">
        <Link href={`/courses/${course._id}/`}>
          <Button>Enrollments</Button>
        </Link>
        <Link href={`/admin/courses/${course._id}/sections/create`}>
          <Button variant="outline">Create Section</Button>
        </Link>
      </div>

      <h3 className="text-xl font-bold mb-2">Sections</h3>
      {course.sections && course.sections.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-50 text-left">Title</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Description</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Type</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Content</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Video Status</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Video Error</th>
                <th className="py-2 px-4 bg-gray-50 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {course.sections.map((section: Section) => (
                <tr key={section._id} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{section.sectionTitle}</td>
                  <td className="py-2 px-4">{section.sectionDescription}</td>
                  <td className="py-2 px-4">{section.type}</td>
                  <td className="py-2 px-4 break-all">{section.content}</td>
                  <td className="py-2 px-4">{section.videoStatus ?? "-"}</td>
                  <td className="py-2 px-4 text-red-500">{section.videoError ?? "-"}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col gap-2 md:flex-row">
                      <Link href={`/admin/courses/${course._id}/sections/${section._id}`}>
                        <Button size="sm" variant="default">View</Button>
                      </Link>
                      <Link href={`/admin/courses/${course._id}/sections/${section._id}/edit`}>
                        <Button size="sm" variant="outline">Edit</Button>
                      </Link>
                      {/* Delete as a form POST using a server action */}
                      <form
                        action={deleteSection}
                        method="POST"
                        // onSubmit={e => {
                        //   if (!confirm("Are you sure you want to delete this section?")) e.preventDefault();
                        // }}
                        className="inline"
                      >
                        <input type="hidden" name="courseId" value={course._id} />
                        <input type="hidden" name="sectionId" value={section._id} />
                        <Button size="sm" variant="ghost" type="submit">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No sections yet. Click &quot;Create Section&quot; to add one.</p>
      )}
    </div>
  );
}
