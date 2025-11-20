"use client"

import { SignUp } from "@clerk/nextjs"
import Link from "next/link"

export default function SignUpPage() {
  
    return (<div className="flex items-center justify-center h-screen flex-col gap-20">
        <SignUp
          path="/auth/sign-up"
          routing="path"
          signInUrl="/auth/sign-in"
        />
        <Link
          href="/auth/signup"
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Register manually? 
        </Link>
    </div>)
  }

