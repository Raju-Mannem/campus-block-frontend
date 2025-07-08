export async function getSignedVideoUrl(courseId: string, sectionId: string) {
    // Call your backend API to get a signed CloudFront URL for DASH playback
    const res = await fetch(`https://localhost:8001/api/v1/courses/${courseId}/sections/${sectionId}/signed-url`);
    const data = await res.json();
    return data.url as string;
  }
  