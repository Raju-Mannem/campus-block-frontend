import { Course } from "@/types/course";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export function CourseCard({ course }: { course: Course }) { 
  return (
    <div className="bg-card rounded-lg shadow p-4 flex flex-col h-full">
      <Image
        src={course.image || "/course-placeholder.jpg"}
        alt={course.title}
        loading="lazy"
        unoptimized
        width={100}
        height={100}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg mb-1">title: {course.title}</h3>
      <p className="text-muted-foreground mb-3 line-clamp-3">
        Description: {course.description}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-primary text-base">
          Price: {course.price}₹
        </span>
        <Link href={`/courses/${course._id}`}>
          <Button size="sm">View</Button>
        </Link>
      </div>
    </div>
  );
}
