"use client"

import StatCard from "@/components/common/StatCard"
import BarChart from "@/components/common/BarChart"
import { useMemo } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useUsers } from "@/hooks/useUsers";

export default function AdminPage() {

  const { data: users = [] } = useUsers();

  const usersCount = useMemo(() => {
    return users.reduce(
      (acc: any, user: any) => {
        const role = user.role || "unknown";
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      },
      { employer: 0, auditor: 0, contractor: 0 }
    );
  }, [users]); 

  const { employer, auditor, contractor } =  usersCount
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>

      <div className="flex gap-4">
        <StatCard title="Employers" count={employer} />
        <StatCard title="Auditors" count={auditor} />
        <StatCard title="Contractors" count={contractor} />
      </div>
      <BarChart />
    </div>
  );
}
