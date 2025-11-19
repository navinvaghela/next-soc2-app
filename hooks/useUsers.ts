"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  fetchUserRoleApi,
  setUserRoleApi,
} from "@/app/api/users";

export function useSetUserRole() {
  return useMutation({
    mutationFn: (role: string) => setUserRoleApi(role),
    onError: (error: any) => {
      console.error("Failed to set user role:", error);
    },
  });
}


export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      // Invalidate the "users" query so that the users list refreshes automatically
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      console.error("Failed to create user:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => {
      return updateUserApi(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

