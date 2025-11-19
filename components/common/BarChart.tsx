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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const data = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      { label: "Employers", data: [5, 8, 12, 18, 30], backgroundColor: "rgba(59,130,246,0.8)" },
      { label: "Auditors", data: [2, 3, 6, 9, 18], backgroundColor: "rgba(16,185,129,0.8)" },
      { label: "Contractors", data: [1, 2, 3, 8, 12], backgroundColor: "rgba(234,179,8,0.8)" },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <Bar data={data} />
    </div>
  );
}
