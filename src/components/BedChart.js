"use client";
import React from "react";

export default function BedChart() {
  // Sample department data
  const departments = [
    { name: "General Ward", occupied: 30, total: 40 },
    { name: "ICU", occupied: 12, total: 15 },
    { name: "Cardiology", occupied: 8, total: 12 },
    { name: "Neurology", occupied: 6, total: 10 },
  ];

  // Calculate overall occupancy
  const totalOccupied = departments.reduce((sum, dept) => sum + dept.occupied, 0);
  const totalBeds = departments.reduce((sum, dept) => sum + dept.total, 0);
  const overallPercentage = Math.round((totalOccupied / totalBeds) * 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-4 lg:p-6 h-full">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
          Bed Occupancy by Department
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors duration-200">
          View Details <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="space-y-4 lg:space-y-5">
        {departments.map((dept, index) => {
          const percentage = Math.round((dept.occupied / dept.total) * 100);
          const available = dept.total - dept.occupied;

          // New color scheme that matches the UI better
          const getProgressBarColor = (percent) => {
            if (percent >= 90) return "bg-gradient-to-r from-red-500 to-red-400"; // Critical
            if (percent >= 75) return "bg-gradient-to-r from-orange-500 to-orange-400"; // High
            if (percent >= 50) return "bg-gradient-to-r from-yellow-500 to-yellow-400"; // Medium
            if (percent >= 25) return "bg-gradient-to-r from-blue-500 to-blue-400"; // Low
            return "bg-gradient-to-r from-green-500 to-green-400"; // Very Low
          };

          const getStatusColor = (percent) => {
            if (percent >= 90) return "text-red-600";
            if (percent >= 75) return "text-orange-600";
            if (percent >= 50) return "text-yellow-600";
            if (percent >= 25) return "text-blue-600";
            return "text-green-600";
          };

          const progressColor = getProgressBarColor(percentage);
          const statusColor = getStatusColor(percentage);

          return (
            <div key={index} className="group hover:scale-[1.02] transition-transform duration-200">
              {/* Department Header */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800 text-sm lg:text-base">{dept.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs lg:text-sm font-medium px-2 py-1 rounded-full ${statusColor} bg-opacity-10`}>
                    {percentage}% occupied
                  </span>
                  <span className="text-xs lg:text-sm font-medium text-gray-700">
                    {dept.occupied}/{dept.total}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200/60 rounded-full h-2.5 lg:h-3 shadow-inner overflow-hidden">
                <div
                  className={`h-2.5 lg:h-3 rounded-full transition-all duration-1000 ease-out ${progressColor} shadow-sm`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Stats Footer */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                  {available} beds available
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Capacity: {dept.total} total
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 lg:mt-8 pt-4 lg:pt-5 border-t border-gray-200/60">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Overall Hospital Occupancy</span>
          <span className="font-semibold text-gray-800">{overallPercentage}%</span>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="w-full bg-gray-200/60 rounded-full h-3 shadow-inner overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${
              overallPercentage >= 90 ? "bg-gradient-to-r from-red-500 to-red-400" :
              overallPercentage >= 75 ? "bg-gradient-to-r from-orange-500 to-orange-400" :
              overallPercentage >= 50 ? "bg-gradient-to-r from-yellow-500 to-yellow-400" :
              overallPercentage >= 25 ? "bg-gradient-to-r from-blue-500 to-blue-400" :
              "bg-gradient-to-r from-green-500 to-green-400"
            } shadow-sm`}
            style={{ width: `${overallPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Total Occupied: {totalOccupied} beds</span>
          <span>Total Capacity: {totalBeds} beds</span>
        </div>
      </div>

      {/* Color Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200/60">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded bg-green-400"></div>
            <span>Low (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded bg-yellow-400"></div>
            <span>Medium (50-75%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded bg-orange-400"></div>
            <span>High (75-90%)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 rounded bg-red-400"></div>
            <span>Critical (&gt;90%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}