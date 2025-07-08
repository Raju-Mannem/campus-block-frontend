"use client";
import { useState, ChangeEvent } from "react";
import { updateCourse } from "@/lib/api/courses.client";
import { useApiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Course } from "@/types/course";
import Image from "next/image";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const STATUSES = ["Drafts", "Published"] as const;

export function EditCourseForm({ course }: { course: Course }) {
  const api = useApiClient();
  const [title, setTitle] = useState(course.title || "");
  const [instructorName, setInstructorName] = useState(course.instructorName || "");
  const [category, setCategory] = useState(course.category || "");
  const [level, setLevel] = useState<typeof LEVELS[number]>(
    (course.level as typeof LEVELS[number]) || "Beginner"
  );
  const [status, setStatus] = useState<typeof STATUSES[number]>(
    (course.status as typeof STATUSES[number]) || "Drafts"
  );
  const [description, setDescription] = useState(course.description || "");
  const [price, setPrice] = useState<number | "">(course.price ?? "");
  const [discount, setDiscount] = useState<number | "">(course.discount ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("instructorName", instructorName);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("status", status);
      formData.append("description", description);

      if (price !== "") formData.append("price", String(price));
      if (discount !== "") formData.append("discount", String(discount));
      if (image) formData.append("image", image);

      await updateCourse(api, course._id, formData);
      toast.success("Course updated");
      router.push("/admin");
    } catch {
      toast.error("Failed to update course");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
      encType="multipart/form-data"
      aria-label="Edit Course Form"
      autoComplete="off"
    >
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          className="w-full border p-2 rounded"
          placeholder="Course Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="instructorName" className="block font-medium mb-1">
          Instructor Name<span className="text-red-500">*</span>
        </label>
        <input
          id="instructorName"
          className="w-full border p-2 rounded"
          placeholder="Instructor Name"
          value={instructorName}
          onChange={e => setInstructorName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block font-medium mb-1">
          Category<span className="text-red-500">*</span>
        </label>
        <input
          id="category"
          className="w-full border p-2 rounded"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="level" className="block font-medium mb-1">
          Level<span className="text-red-500">*</span>
        </label>
        <select
          id="level"
          className="w-full border p-2 rounded"
          value={level}
          onChange={e => setLevel(e.target.value as typeof LEVELS[number])}
          required
        >
          {LEVELS.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block font-medium mb-1">
          Status<span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          className="w-full border p-2 rounded"
          value={status}
          onChange={e => setStatus(e.target.value as typeof STATUSES[number])}
          required
        >
          {STATUSES.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="w-full border p-2 rounded"
          placeholder="Course Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="price" className="block font-medium mb-1">
          Price (optional)
        </label>
        <input
          id="price"
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          min={0}
        />
      </div>

      <div>
        <label htmlFor="discount" className="block font-medium mb-1">
          Discount (%) (optional)
        </label>
        <input
          id="discount"
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={e => setDiscount(e.target.value === "" ? "" : Number(e.target.value))}
          min={0}
          max={100}
        />
      </div>

      <div>
        <label htmlFor="image" className="block font-medium mb-1">
          Course Image
        </label>
        <Image
                src={course.image || "/course-placeholder.jpg"}
                alt={course.title}
                loading="lazy"
                unoptimized
                width={100}
                height={100}
                className="w-full h-40 object-cover rounded mb-3"
              />
        <input
          id="image"
          className="w-full border p-2 rounded"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Course"}
      </Button>
    </form>
  );
}
