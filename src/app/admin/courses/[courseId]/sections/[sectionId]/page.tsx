import { notFound } from "next/navigation";
import { getSectionById } from "@/lib/api/courses";

export default async function SectionDetailPage({
  params,
}: {
  params: { courseId: string, sectionId: string };
}) {
  const {courseId, sectionId } = await params
  const section = await getSectionById(courseId, sectionId);
  if (!section) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold mb-6">{section.sectionTitle}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <tbody>
            <TableRow label="Section Description" value={section.sectionDescription} />
            <TableRow label="Type" value={section.type} />
            <TableRow label="Content" value={section.content} />
            {section.videoStatus && (
              <TableRow label="Video Status" value={section.videoStatus} />
            )}
            {section.videoMetadata && (
              <>
                <TableRow label="Duration" value={section.videoMetadata.duration} />
                <TableRow label="Format" value={section.videoMetadata.format} />
                <TableRow label="Height" value={section.videoMetadata.height} />
                <TableRow label="Width" value={section.videoMetadata.width} />
              </>
            )}
            {section.videoError && (
              <TableRow label="Video Error" value={section.videoError} />
            )}
            {section.videoManifestKey && (
              <TableRow label="Manifest Key" value={section.videoManifestKey} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 px-4 font-semibold bg-gray-50 w-44">{label}</td>
      <td className="py-3 px-4 break-all">{value ?? "-"}</td>
    </tr>
  );
}
