"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "sonner";
import type { Course } from "@/types/course";
import { useApiClient } from "@/lib/api/client";
import {deleteCourseById} from "@/lib/api/courses.client"

export function CoursesTab({ initialCourses }: { initialCourses: Course[] }) {
  const api = useApiClient();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    setLoading(id);
    try {
      await deleteCourseById(api,id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete course");
    }
    setLoading(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/courses/create">
          <Button>Create New Course</Button>
        </Link>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-t">
              <td className="p-2">{course.title}</td>
              <td className="p-2">{course.category}</td>
              <td className="p-2">₹{course.price}</td>
              <td className="p-2">{course.status}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/admin/courses/${course._id}/`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
                <Link href={`/admin/courses/${course._id}/edit`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleDelete(course._id)}
                  disabled={loading === course._id}
                >
                  {loading === course._id ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}