"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login"); // redirect if not logged in
      return;
    }
 
    router.replace(`/dashboard/${user.role}`);
  }, [user, router]);

  return null;
}
