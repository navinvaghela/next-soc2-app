// components/common/StatCard.tsx
import React from "react";

export default function StatCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-64">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{count}</h3>
    </div>
  );
}
