
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "employer" | "auditor" | "contractor";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role | string;
  password?: string
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  getUser: () => User | null;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      getUser: () => get().user,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

