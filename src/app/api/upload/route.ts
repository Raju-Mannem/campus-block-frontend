import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const s3 = new S3Client({ region: process.env.NEXT_PUBLIC_AWS_REGION });
const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

export async function POST(req: NextRequest) {
  const { filename, type } = await req.json();
  const key = `uploads/${Date.now()}-${filename}`;

  const presigned = await createPresignedPost(s3, {
    Bucket: bucket,
    Key: key,
    Conditions: [
      ["starts-with", "$Content-Type", ""],
      ["content-length-range", 0, 500 * 1024 * 1024], // 500MB
    ],
    Fields: {
      "Content-Type": type,
    },
    Expires: 600, // 10 minutes
  });

  return NextResponse.json({
    ...presigned,
    key,
    url: `${presigned.url}/${key}`,
  });
}
