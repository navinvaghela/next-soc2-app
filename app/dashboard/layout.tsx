"use client"

import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user); 
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const router = useRouter();
  
  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      router.replace("/auth/login");
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated) return <div className="p-6">Loading...</div>;
  
  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
