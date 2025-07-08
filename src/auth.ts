import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/auth/mongoClient";
import { SignJWT } from "jose";
import type {JWTPayload} from "jose"

type MongoUserDoc = {
  _id: string;
  role?: "user" | "admin";
  coursesEnrolled?: string[];
  name?: string;
  email?: string;
  image?: string;
};

async function createCustomJWT(payload: object, secret: string) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));
}


export const authOptions : NextAuthConfig = {
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  events: {
    async createUser({ user }) {
      const client = await clientPromise;
      const db = client.db();
      await db.collection<MongoUserDoc>("users").updateOne(
        { _id: user.id },
        { $set: { role: "user", coursesEnrolled: [] } },
        { upsert: true }
      );
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      token.customJwt = await createCustomJWT(
        {
          id: token.id,
          email: token.email,
          role: token.role,
        },
        process.env.AUTH_SECRET!
      );
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
      };
      session.customJwt = token.customJwt;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);