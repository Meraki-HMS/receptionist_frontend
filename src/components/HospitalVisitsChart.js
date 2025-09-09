"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const visitData = [
  { month: "Jan", visits: 300 },
  { month: "Feb", visits: 450 },
  { month: "Mar", visits: 320 },
  { month: "Apr", visits: 500 },
  { month: "May", visits: 610 },
  { month: "Jun", visits: 420 },
];

export default function HospitalVisitsChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Hospital Visits</h2>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={visitData}>
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="visits" stroke="#2563EB" fillOpacity={1} fill="url(#colorVisits)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
