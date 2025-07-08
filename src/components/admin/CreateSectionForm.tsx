"use client";
import { useState } from "react";
import { useApiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {createSection} from "@/lib/api/courses.client";

const SECTION_TYPES = ["Text", "Quiz", "Video", "Pdf"] as const;

export function CreateSectionForm({ courseId }: { courseId: string }) {
  const api = useApiClient();
  const router = useRouter();
  const content=" ";
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [type, setType] = useState<typeof SECTION_TYPES[number]>("Text");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
            formData.append("sectionTitle", sectionTitle);
            formData.append("sectionDescription", sectionDescription);
            formData.append("type", type);
            formData.append("content", content);
      // TODO: Replace with your actual API call for section creation
      
      await createSection(api,courseId, formData);

      toast.success("Section created!");
      router.push(`/admin/courses/${courseId}`);

    } catch (err) {
      toast.error(`${err as string} Failed to create section`);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
      aria-label="Create Section Form"
      autoComplete="off"
    >
      <div>
        <label htmlFor="sectionTitle" className="block font-medium mb-1">
          Section Title<span className="text-red-500">*</span>
        </label>
        <input
          id="sectionTitle"
          className="w-full border p-2 rounded"
          placeholder="Section Title"
          value={sectionTitle}
          onChange={e => setSectionTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="sectionDescription" className="block font-medium mb-1">
          Section Description
        </label>
        <textarea
          id="sectionDescription"
          className="w-full border p-2 rounded"
          placeholder="Section Description"
          value={sectionDescription}
          onChange={e => setSectionDescription(e.target.value)}
          rows={2}
        />
      </div>

      <div>
        <label htmlFor="type" className="block font-medium mb-1">
          Section Type<span className="text-red-500">*</span>
        </label>
        <select
          id="type"
          className="w-full border p-2 rounded"
          value={type}
          onChange={e => {
            setType(e.target.value as typeof SECTION_TYPES[number]);
          }}
          required
        >
          {SECTION_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={loading || !sectionTitle || !type}>
        {loading ? "Creating..." : "Create Section"}
      </Button>
    </form>
  );
}
