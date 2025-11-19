"use client";

import Link from "next/link"
import image from "@/public/Data_security.jpg"
import { useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function home() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(`/dashboard/${user.role}`);
    }    
  }, [user, router]);

  return (
    <div className="flex h-screen ">
      <div className="w-1/2bg-gray-100 flex flex-col items-center justify-center">
        <img src={image.src} className="w-screen h-screen"/>
      </div>
      <div className="w-1/2 flex items-center gap-4 justify-center">
        <div className="w-100 h-100  transform -translate-x-1 -translate-y-1 flex items-center flex-col gap-4 justify-center">
            <Link href="/auth/sign-in" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login with Google
            </Link>
            <Link href="/auth/login" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-blue-700">
            Login with Email
            </Link>
        </div>
      </div>
    </div>
  );
}
