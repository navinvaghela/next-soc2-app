"use client";

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const login = useLogin();

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user])  

  const onSubmit = (data: any) => {
    login.mutate(data, {
      onSuccess: (res) => {
        router.push(`/dashboard/${res.user.role}`);
      },
      onError: (err: any) => alert(err.message),
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-lg w-[420px] space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          disabled={login.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {login.isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 underline">
            Register here
          </a>
        </p>
        <div className=" flex items-center flex-col gap-4 justify-center">
        <Link
          href="/auth/sign-in"
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login with Google
        </Link>
        </div>
      </form>
    </div>
  );
}
