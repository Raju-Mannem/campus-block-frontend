import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getCourseById } from "@/lib/api/courses";
import Link from "next/link";
import Image from "next/image";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = await params.courseId;
  const course = await getCourseById(courseId);
  if (!course) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
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
        <Link href={`/courses/${course._id}/player`}>
          <Button>Start Learning</Button>
        </Link>
        <Link href={`/admin/courses/${course._id}/section/create`}>
          <Button variant="outline">Create Section</Button>
        </Link>
      </div>

      <h3 className="text-xl font-bold mb-2">Sections</h3>
      {course.sections && course.sections.length > 0 ? (
        <ul className="divide-y">
          {course.sections.map((section, idx) => (
            <li key={section._id || idx} className="py-4">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <div className="flex-1">
                  <div className="font-semibold">{section.sectionTitle}</div>
                  <div className="text-sm text-gray-600 mb-1">{section.sectionDescription}</div>
                  <div className="text-xs mb-1">
                    <span className="font-medium">Type:</span> {section.type}
                  </div>
                  <div className="text-xs mb-1">
                    <span className="font-medium">Content:</span> {section.content}
                  </div>
                  {/* Only show these if present */}
                  {section.videoStatus && (
                    <div className="text-xs">
                      <span className="font-medium">Video Status:</span> {section.videoStatus}
                    </div>
                  )}
                  {section.videoError && (
                    <div className="text-xs text-red-500">
                      <span className="font-medium">Video Error:</span> {section.videoError}
                    </div>
                  )}
                  {section.videoManifestKey && (
                    <div className="text-xs">
                      <span className="font-medium">Manifest Key:</span> {section.videoManifestKey}
                    </div>
                  )}
                  {section.videoMetadata && (
                    <div className="text-xs">
                      <span className="font-medium">Video Metadata:</span>{" "}
                      {`Duration: ${section.videoMetadata.duration}s, Size: ${section.videoMetadata.width}x${section.videoMetadata.height}, Format: ${section.videoMetadata.format}`}
                    </div>
                  )}
                </div>
                {/* Optionally, add Edit/Delete buttons here */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No sections yet. Click &quot; Create Section&quot; to add one.</p>
      )}
    </div>
  );
}
