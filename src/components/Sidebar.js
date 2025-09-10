"use client";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ open, setOpen }) {
  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-white shadow-md h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h1
          className={`text-xl font-bold text-blue-700 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          Healthcare
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-blue-600"
        >
          <i className="bi bi-list text-xl"></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-speedometer2"></i>
          {open && <span>Dashboard</span>}
        </Link>

        <Link
          href="/patients"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-people-fill"></i>
          {open && <span>Patients</span>}
        </Link>

        <Link
          href="/appointments"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-calendar-check"></i>
          {open && <span>Appointments</span>}
        </Link>

        <Link
          href="/beds"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-hospital"></i>
          {open && <span>Bed Management</span>}
        </Link>

        <Link
          href="/staff"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-person-badge-fill"></i>
          {open && <span>Staff</span>}
        </Link>

        <Link
          href="/reports"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
        >
          <i className="bi bi-bar-chart-line"></i>
          {open && <span>Reports</span>}
        </Link>
      </nav>
    </div>
  );
}
