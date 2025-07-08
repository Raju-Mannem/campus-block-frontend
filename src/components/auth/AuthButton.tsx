"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function AuthButton() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  return session?.user ? (
    <Button variant="outline" onClick={() => signOut()}>
      Sign out ({session.user.name})
    </Button>
  ) : (
    <Button onClick={() => signIn()}>Sign in</Button>
  );
}
