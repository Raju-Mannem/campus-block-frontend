import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  CompletedPart,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.NEXT_PUBLIC_AWS_REGION });
const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

export interface PresignedPart {
  partNumber: number;
  presignedUrl: string;
}

export interface MultipartUploadData {
  uploadId: string;
  parts: PresignedPart[];
}

/**
 * Create a multipart upload and generate presigned URLs for each part.
 * @param key - The S3 object key (filename)
 * @param partCount - Number of parts to upload (Uppy determines this)
 * @returns uploadId and presigned URLs for each part
 */
export async function createS3MultipartUpload(
  key: string,
  partCount: number = 5
): Promise<MultipartUploadData> {
  // 1. Create multipart upload
  const createCommand = new CreateMultipartUploadCommand({
    Bucket: bucketName,
    Key: key,
  });
  const createResponse = await s3.send(createCommand);
  if (!createResponse.UploadId) {
    throw new Error("Failed to create multipart upload");
  }
  const uploadId = createResponse.UploadId;

  // 2. Generate presigned URLs for each part
  const presignedUrls: PresignedPart[] = [];
  for (let partNumber = 1; partNumber <= partCount; partNumber++) {
    const uploadPartCommand = new UploadPartCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });
    const presignedUrl = await getSignedUrl(s3, uploadPartCommand, { expiresIn: 3600 });
    presignedUrls.push({ partNumber, presignedUrl });
  }

  return {
    uploadId,
    parts: presignedUrls,
  };
}

/**
 * Complete a multipart upload.
 * @param key - S3 object key
 * @param uploadId - Upload session ID
 * @param completedParts - List of parts with PartNumber and ETag
 */
export async function completeS3MultipartUpload(
  key: string,
  uploadId: string,
  completedParts: CompletedPart[]
): Promise<void> {
  const completeCommand = new CompleteMultipartUploadCommand({
    Bucket: bucketName,
    Key: key,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: completedParts.sort((a, b) => (a.PartNumber! - b.PartNumber!)),
    },
  });

  await s3.send(completeCommand);
}

/**
 * Abort a multipart upload session.
 * @param key - S3 object key
 * @param uploadId - Upload session ID to cancel
 */
export async function abortS3MultipartUpload(
  key: string,
  uploadId: string
): Promise<void> {
  const abortCommand = new AbortMultipartUploadCommand({
    Bucket: bucketName,
    Key: key,
    UploadId: uploadId,
  });

  await s3.send(abortCommand);
}

