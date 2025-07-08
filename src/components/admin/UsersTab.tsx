"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import Link from "next/link";
import type { User } from "@/types/user";

export function UsersTab() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/users`);
    setUsers(res.data);
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Load Users"}
      </Button>
      {users && (
        <table className="w-full border text-sm mt-4">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <Link href={`/admin/users/${user._id}`}>
                    <Button size="sm" variant="outline">Inspect</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
