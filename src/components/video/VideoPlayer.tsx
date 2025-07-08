"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      sources: [{ src, type: "application/dash+xml" }],
    });
    return () => player.dispose();
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
