import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    customJwt?: string;
    user: {
      id: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    customJwt: string;
    id: string;
    role: "user" | "admin";
    email: string;
  }
}
