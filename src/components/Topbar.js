"use client";
import { Bell, User, Settings } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-end items-center bg-white shadow-sm px-6 py-3 rounded-xl mb-6">
      {/* Notifications */}
      <button className="relative mx-3 text-gray-600 hover:text-blue-600">
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          3
        </span>
      </button>

      {/* Settings */}
      <button className="mx-3 text-gray-600 hover:text-blue-600">
        <Settings size={22} />
      </button>

      {/* Profile */}
      <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          R
        </div>
        <span className="hidden md:block font-medium text-gray-700">Receptionist</span>
      </div>
    </div>
  );
}
