"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSignup } from "@/hooks/useAuth";

type SignupFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "employer" | "auditor" | "contractor" | string;
};

export default function SignupForm() {
  const params = useSearchParams();
  const invitedEmail = params.get("email") || "";
  const invitedRole = params.get("role") || "";
  const invitedToken = params.get("token") || "";

  const router = useRouter();
  const signup = useSignup();

  const { register, handleSubmit } = useForm<SignupFormType>({
    defaultValues: {
      email: invitedEmail,
      role: invitedRole,
    },
  });

  const onSubmit = (data: SignupFormType) => {
    signup.mutate(
      { ...data, token: invitedToken },
      {
        onSuccess: () => router.push("/auth/login"),
        onError: (err: any) => alert(err.message),
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-lg w-[420px] space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          {...register("name")}
          type="text"
          placeholder="Full Name"
          required
          className="w-full border px-3 py-2 rounded"
        />

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

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          {...register("role")}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="employer">Employer</option>
          <option value="auditor">Auditor</option>
          <option value="contractor">Contractor</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Register
        </button>

        <p className="text-sm text-center text-gray-500 flex gap-2 ">
          Already have an account?{" "}
          
          <div className="flex items-center flex-col gap-4 justify-center">
            <Link
          href="/auth/login"
          className="px-2 py-1 text-blue-500 rounded hover:bg-blue-700"
        >
          Login with Email
        </Link>
        <Link
          href="/auth/sign-in"
          className="px-2 py-1 text-gree-500 rounded hover:bg-green-700"
        >
          Login with Google
        </Link>
        
        </div>
        </p>
      </form>
    </div>
  );
}
