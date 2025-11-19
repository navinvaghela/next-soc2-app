"use client"

import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-20">
        <SignIn
          path="/auth/sign-in"
          routing="path"
          signUpUrl="/auth/sign-up"
        />
        <Link
          href="/auth/login"
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login with Email
        </Link>
    </div>
  );
}
