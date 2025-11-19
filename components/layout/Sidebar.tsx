// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useUser } from "@clerk/nextjs";

const menuConfig: Record<string, { label: string; href: string }[]> = {
  admin: [
    { label: "Overview", href: "/dashboard/admin" },
    { label: "Users", href: "/dashboard/admin/users" },
  ],
  employer: [
    { label: "Overview", href: "/dashboard/employer" },
    { label: "Policy", href: "/dashboard/employer/policy" },
  ],
  auditor: [{ label: "Overview", href: "/dashboard/auditor" }],
  contractor: [{ label: "Overview", href: "/dashboard/contractor" }],
};

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  
  let role = user?.role || 'employer'
  
  const menus = menuConfig[role];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <div className="mb-6">
        <h2 className="text-lg font-bold capitalize">{user.role} panel</h2>
        <p className="text-sm text-gray-300 mt-1">{user.name}</p>
      </div>

      <nav className="space-y-2">
        {menus.map((m) => (
          <Link key={m.href} href={m.href}>
            <div className="px-3 py-2 rounded hover:bg-gray-700">{m.label}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
