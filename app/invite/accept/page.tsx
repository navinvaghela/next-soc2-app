"use client";

import { Suspense } from "react";
import InviteForm from "./InviteForm"

export default function InviteAcceptPage() {
  return (
    <Suspense fallback={<div>Loadind...</div>}>
      <InviteForm />
    </Suspense>
  );
}
