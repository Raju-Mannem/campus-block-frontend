import { HeroSection } from "@/components/HeroSection";
import { CourseCard } from "@/components/CourseCard";
import axios from "axios";
import type { Course } from "@/types/course";

export default async function Home() {
  const res = await axios.get<Course[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/courses`
  );
  const courses = res.data;
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <section className="container mx-auto px-2 sm:px-4 py-10 sm:py-16 flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Featured Courses
        </h2>
        <article className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course._id} course={course} />)
          ) : (
            <div className="flex justify-center items-center mt-10 w-full bg-blue-200">
              <strong className="text-red-400">No Courses Found</strong>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
