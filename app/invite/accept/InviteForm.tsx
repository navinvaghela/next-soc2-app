"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useValidateInvite } from "@/hooks/useInvite";

export default function InviteForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  // Use React Query hook
  const { data: invite, isLoading, isError, error } = useValidateInvite(token || undefined);

  if (isLoading) return <p className="p-10">Validating...</p>;
  if (isError) {
    alert((error as any)?.message || "Invalid invite");
    router.push("/auth/signup");
    return null;
  }

  if (!invite) return <p className="p-10">No invite found</p>;

  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Accept Invitation</h1>
      <p>Email: {invite.email}</p>
      <p>Role: {invite.role}</p>

      <button
        onClick={() =>
          router.push(
            `/auth/signup?email=${invite.email}&role=${invite.role}&token=${invite.token}`
          )
        }
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue to Sign Up
      </button>
    </div>
  );
}
