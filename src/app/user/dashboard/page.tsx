import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Link href="/courses/create">
        <Button>Create New Course</Button>
      </Link>
    </div>
  );
}
