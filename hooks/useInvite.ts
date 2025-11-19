"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendInviteApi, acceptInviteApi } from "@/app/api/auth";

export function useSendInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendInviteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitedUsers"] });
    },
    onError: (error: any) => {
      console.error("Failed to send invite:", error);
    },
  });
}


export function useValidateInvite(token?: string) {
  return useQuery({
    queryKey: ["invite", token],
    queryFn: () => acceptInviteApi(token as string),
    enabled: !!token,
  });
}

