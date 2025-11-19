"use client";

import { ReactNode, useEffect, useId } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useSetUserRole } from "@/hooks/useUsers";


type RootProviderProps = {
  children: ReactNode;
};

export default function RootProvider({ children }: RootProviderProps) {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const setUserRole = useSetUserRole();


  const role = 'employer'
  useEffect(() => {
    const setup = async () => {

      if (isSignedIn && user) {
        const id = Math.floor(Math.random() * 100) + 1;
        const loggedInUser = {
          id: id,
          name: user.fullName || user.firstName || "User",
          email: user.emailAddresses[0]?.emailAddress || "",
          role,
        };

        login(loggedInUser);

        try {
          await setUserRole.mutateAsync(role);
        } catch (err) {
          console.error("Failed to set role:", err);
        }


        if (window.location.pathname.startsWith("/auth")) {
          router.push(`/dashboard/${loggedInUser.role}`);
        }
      }
    }
    setup()
  }, [isSignedIn, user, login, router]);

  return <>{children}</>;
}
