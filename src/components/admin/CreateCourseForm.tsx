"use client";
import { useState, ChangeEvent } from "react";
import { useApiClient } from "@/lib/api/client";
import { createCourse } from "@/lib/api/courses.client";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const STATUSES = ["Drafts", "Published"] as const;

export function CreateCourseForm() {
  const api = useApiClient();
  const [title, setTitle] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState<typeof LEVELS[number]>("Beginner");
  const [status, setStatus] = useState<typeof STATUSES[number]>("Drafts");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
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
      formData.append("sections", JSON.stringify([])); // Start with empty sections

      if (price !== "") formData.append("price", String(price));
      if (discount !== "") formData.append("discount", String(discount));
      if (image) formData.append("image", image);

      await createCourse(api, formData);
      toast.success("Course created");
      router.push("/admin");
    } catch (err) {
      toast.error(`${err as string} Failed to create course`);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
      encType="multipart/form-data"
      aria-label="Create Course Form"
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
        <input
          id="image"
          className="w-full border p-2 rounded"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Course"}
      </Button>
    </form>
  );
}
