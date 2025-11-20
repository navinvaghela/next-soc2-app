// components/common/BarChart.tsx
"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useUsers } from "@/hooks/useUsers";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {

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

  const data = {
    labels: ["2025", "2026", "2027","2028"],
    datasets: [
      { label: "Employers", data: [usersCount.employer], backgroundColor: "rgba(59,130,246,0.8)" },
      { label: "Auditors", data: [usersCount.auditor], backgroundColor: "rgba(16,185,129,0.8)" },
      { label: "Contractors", data: [usersCount.contractor], backgroundColor: "rgba(234,179,8,0.8)" },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <Bar data={data} />
    </div>
  );
}
