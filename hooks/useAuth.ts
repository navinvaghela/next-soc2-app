"use client";
import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi } from "@/app/api/auth";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.user);
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signupApi,
    onError: (error: any) => {
      console.error("Signup failed:", error);
    },
  });
}
