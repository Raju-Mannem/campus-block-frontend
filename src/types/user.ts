export interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role?: "admin" | "user";
    coursesEnrolled: Array<string>;
  }

export interface UserInspectData {
  _id: string;
  name: string;
  email: string;
  enrolledCourses: Array<{
    _id: string;
    title: string;
    progress: number;
  }>;
  allCourses: Array<{
    _id: string;
    title: string;
  }>;
}
