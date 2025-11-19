"use client"
import StatCard from "@/components/common/StatCard"

export default function EmployerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Employer Overview</h1>

      <div className="flex gap-4">
        <StatCard title="Policies" count={0} />
        <StatCard title="Active Services" count={0} />
        <StatCard title="Pending Actions" count={0} />
      </div>
    </div>
  );
}
