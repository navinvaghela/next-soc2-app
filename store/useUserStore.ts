import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./authStore";

type UserState = {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  clearUsers: () => void;
  getAllUsers: () => User[];
  removeUser: (id: number) => void
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      clearUsers: () => set({ users: [] }),
      getAllUsers: () => get().users,
      removeUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      }),
    {
    name: "user-storage", // localStorage key
    }
  )
);
