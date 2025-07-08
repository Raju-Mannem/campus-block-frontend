"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoursesTab } from "./CoursesTab";
import { UsersTab } from "./UsersTab";
import { TransactionsTab } from "./TransactionsTab";
import type { Course } from "@/types/course";

export function AdminTabs({ initialCourses }: { initialCourses: Course[] }) {
  const [tab, setTab] = useState("courses");

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <CoursesTab initialCourses={initialCourses} />
      </TabsContent>
      <TabsContent value="users">
        <UsersTab />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab />
      </TabsContent>
    </Tabs>
  );
}
