"use client";

import { useSendInvite } from "@/hooks/useInvite";
import { useState } from "react";

export default function InviteUserPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employer");
  const [success, setSuccess] = useState("");
  const { mutate, isLoading, isError, error } : any = useSendInvite();
  
  const handleSend = () => {
    if (!email) return alert("Enter email");

    mutate(
      { email, role },
      {
        onSuccess: () => {
          setSuccess(`Invite sent to ${email}`);
          setEmail("");
        },
        onError: (err: any) => {
          alert(err.message || "Failed to send invite");
        },
      }
    );
  };


  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Invite User</h1>

      <div className="space-y-3 max-w-sm">
        <input
          type="email"
          placeholder="User email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employer">Employer</option>
          <option value="auditor">Auditor</option>
          <option value="contractor">Contractor</option>
        </select>

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </button>
      </div>

      {success && (
        <div className="p-3 bg-green-100 text-green-800 rounded">{success}</div>
      )}
    </div>
  );
}
