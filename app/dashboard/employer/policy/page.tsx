"use client"
import { useState } from "react"

type Policy = { id: number; name: string; enabled: boolean };

export default function PolicyPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);

  const toggle = (id: number) => {
    setPolicies((s) => s.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Policy Management</h1>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Policy</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">
                  <input type="checkbox" checked={p.enabled} onChange={() => toggle(p.id)} className="w-5 h-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
