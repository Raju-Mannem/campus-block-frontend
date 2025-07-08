"use client";
import UppyUploader from "@/components/upload/UppyUploader";

export default function UploadPage() {
  const handleUploadComplete = (fileUrl: string, meta: { [key: string]: string }) => {
    alert(`File uploaded: ${fileUrl}\nMeta: ${JSON.stringify(meta)}`);
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Upload Video or PDF</h2>
      <UppyUploader onCompleteAction={handleUploadComplete} />
    </div>
  );
}
