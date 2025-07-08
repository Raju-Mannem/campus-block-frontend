"use client";
import Uppy, { type UppyFile } from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import AwsS3 from "@uppy/aws-s3";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

interface UploadMeta {
  [key: string]: string;
  uploadedBy: string;
  uploadType: string;
}

interface UppyUploaderProps {
  onCompleteAction: (fileUrl: string, meta: UploadMeta) => void;
  allowedFileTypes?: string[];
  maxFileSizeMB?: number;
}

type UploadBody = { [key: string]: string };

export default function UppyUploader({
  onCompleteAction,
  allowedFileTypes = ["video/*", "application/pdf"],
  maxFileSizeMB = 500,
}: UppyUploaderProps) {
  const uppyRef = useRef<Uppy<UploadMeta, UploadBody> | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uppy = new Uppy<UploadMeta, UploadBody>({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes,
        maxFileSize: maxFileSizeMB * 1024 * 1024,
      },
      autoProceed: false,
      meta: {
        uploadedBy: "user@example.com",
        uploadType: "course-media",
      },
    })
      .use(Dashboard, {
        inline: true,
        target: "#uppy-dashboard",
        showProgressDetails: true,
        proudlyDisplayPoweredByUppy: false,
        note: `Max file size: ${maxFileSizeMB}MB`,
      })
      .use(AwsS3, {
        endpoint: "http://localhost:3000/api/upload",
      });

    uppy.on("upload-progress", (_file, progressObj) => {
      setProgress(Math.round((progressObj.bytesUploaded / (progressObj.bytesTotal || 1)) * 100));
    });

    uppy.on("complete", (result) => {
      const file = result.successful![0] as UppyFile<UploadMeta, UploadBody>;
      if (file?.uploadURL) {
        toast.success("Upload complete!", { description: file.name });
        onCompleteAction(file.uploadURL, file.meta);
      }
    });

    uppy.on("error", (err) => {
      toast.error("Upload failed", { description: err.message });
    });

    uppyRef.current = uppy;
    return () => {
      // @ts-expect-error: close() is missing from types but exists at runtime
      uppy.close();
    };
  }, [onCompleteAction, allowedFileTypes, maxFileSizeMB]);

  const handleCancel = () => {
    uppyRef.current?.cancelAll();
    setProgress(0);
    toast.success("Upload cancelled");
  };

  const handleRemove = () => {
    // @ts-expect-error: reset() is missing from types but exists at runtime
    uppyRef.current?.reset();
    setProgress(0);
    toast.success("File removed");
  };

  return (
    <div className="w-full">
      <div id="uppy-dashboard" />
      <div className="flex items-center gap-4 mt-4">
        <progress className="w-full h-2" value={progress} max={100} />
        <button
          type="button"
          className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-sm px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
