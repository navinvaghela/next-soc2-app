// components/common/AvatarMenu.tsx
"use client";

import { useState } from "react";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-full cursor-pointer border" onClick={() => setOpen((s) => !s)} />
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded p-2">
          <a className="block px-2 py-1 hover:bg-gray-100">Profile</a>
        </div>
      )}
    </div>
  );
}
