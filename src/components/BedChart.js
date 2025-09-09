"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const bedData = [
  { month: "Jan", Occupied: 65, Free: 35 },
  { month: "Feb", Occupied: 72, Free: 28 },
  { month: "Mar", Occupied: 55, Free: 45 },
  { month: "Apr", Occupied: 80, Free: 20 },
  { month: "May", Occupied: 68, Free: 32 },
  { month: "Jun", Occupied: 75, Free: 25 },
];

export default function BedChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Bed Occupancy</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Occupied" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Free" fill="#93C5FD" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
