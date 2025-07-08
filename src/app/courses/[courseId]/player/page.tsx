"use client";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/video/VideoPlayer";

export default function PlayerPage({ params }: { params: { courseId: string } }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Fetch signed DASH manifest URL from backend
    fetch(`https://localhost:8001/api/v1/courses/${params.courseId}/signed-url`)
      .then(res => res.json())
      .then(data => setSrc(data.url));
  }, [params.courseId]);

  if (!src) return <div>Loading video...</div>;
  return <VideoPlayer src={src} />;
}
