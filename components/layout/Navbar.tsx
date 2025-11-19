// components/layout/Navbar.tsx
"use client";

import SearchBox from "@/components/common/SearchBox";
import AvatarMenu from "@/components/common/AvatarMenu";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function Navbar() {
  const { signOut, isSignedIn } = useClerk();

  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = "role=; Max-Age=0; path=/";
    await fetch("/api/logout");          
    if (isSignedIn) {
       await signOut();
    }
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-sm">
      <SearchBox />
      <div className="flex items-center gap-4">
        <AvatarMenu />
        <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">
          Logout
        </button>
      </div>
    </header>
  );
}
