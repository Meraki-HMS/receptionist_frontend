"use client";
import React from "react";

export default function BedChart() {
  // Sample department data (later can be replaced with backend API)
  const departments = [
    { name: "General Ward", occupied: 30, total: 40 },
    { name: "ICU", occupied: 12, total: 15 },
    { name: "Cardiology", occupied: 8, total: 12 },
    { name: "Neurology", occupied: 6, total: 10 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-blue-700 mb-4">
        Bed Occupancy by Department
      </h2>

      <div className="space-y-4">
        {departments.map((dept, index) => {
          const percentage = Math.round((dept.occupied / dept.total) * 100);

          return (
            <div key={index}>
              {/* Department Name + Count */}
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{dept.name}</span>
                <span className="text-sm text-gray-600">
                  {dept.occupied} / {dept.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    percentage > 80
                      ? "bg-red-500"
                      : percentage > 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
