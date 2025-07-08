"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { assignCoursesToUser, removeUserCourse } from "@/lib/api/users";
import type { UserInspectData } from "@/types/user";
import { toast } from "sonner";


export function UserInspectPanel({ user }: { user: UserInspectData}) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState(user.enrolledCourses);

  const handleAssign = async () => {
    try {
      await assignCoursesToUser(user._id, selectedCourses);
      toast.success("Courses assigned");
    } catch {
      toast.error("Failed to assign courses");
    }
  };

  const handleRemove = async (courseId: string) => {
    try {
      await removeUserCourse(user._id, courseId);
      setEnrolled((prev) => prev.filter((c) => c._id !== courseId));
      toast.success("Course removed");
    } catch {
      toast.success("Failed to remove course");
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Enrolled Courses</h3>
      <ul className="mb-4">
        {enrolled.map((course) => (
          <li key={course._id} className="flex justify-between items-center mb-2">
            <span>
              {course.title} - Progress: {course.progress}%
            </span>
            <Button size="sm" variant="default" onClick={() => handleRemove(course._id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold mb-2">Assign New Courses</h3>
      <select
        multiple
        className="w-full mb-2"
        value={selectedCourses}
        onChange={e =>
          setSelectedCourses(
            Array.from(e.target.selectedOptions, option => option.value)
          )
        }
      >
        {user.allCourses
          .filter(c => !enrolled.some(ec => ec._id === c._id))
          .map(course => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
      </select>
      <Button onClick={handleAssign} disabled={selectedCourses.length === 0}>
        Assign Selected Courses
      </Button>
    </div>
  );
}
