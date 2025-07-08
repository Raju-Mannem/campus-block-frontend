"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.replace("/admin/");
      } else {
        router.replace("/user/dashboard");
      }
    }
  }, [status, session, router]);
  return (
    <section className="flex items-center justify-center bg-gray-50 px-4 min-h-[80vh]">
      <article className="max-w-sm w-full bg-white shadow-md rounded-lg px-6 py-12 space-y-8">
        <h2 className="text-2xl font-bold text-center text-white w-full bg-indigo-800 py-2 rounded">Login</h2>
        <button
          onClick={() => signIn("google",  { redirectTo: '/admin/' })}
          className="flex justify-center items-center gap-4 w-full h-full py-4 text-slate-600 font-semibold shadow-md hover:bg-slate-400 hover:shadow-xl rounded transition duration-200"
        >
          <aside>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-3 sm:size-6" strokeWidth={1.5}>
              <path
                fill="#EA4335"
                d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65l4.03 3.11Z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3l-3.79-2.99Z"
              />
              <path
                fill="#4A90E2"
                d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.93 11.93 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33l4.04-3.06Z"
              />
            </svg>
          </aside>
          Login with Google
        </button>
        <button
          onClick={() => signIn("microsoft-entra-id", { redirectTo: '/admin/' })}
          className="flex justify-center items-center gap-4 w-full h-full py-4 text-slate-600 font-semibold shadow-md hover:bg-slate-400 hover:shadow-xl rounded transition duration-200"
        >
          <aside>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.2 47.3" className="size-3 sm:size-6" strokeWidth={1.5}>
              <path
                fill="#0072c6"
                d="M32.4 0 14.9 15.1 0 42h13.4zm2.3 3.5-7.5 21 14.3 18-27.7 4.8h45.4z"
              />
            </svg>
          </aside>
          Login with Microsoft
        </button>
      </article>
    </section>
  );
}
