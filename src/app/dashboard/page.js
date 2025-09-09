"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Corrected imports (2 levels up because we are in /app/dashboard/page.js)
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import BedChart from "../../components/BedChart";
import UpcomingAppointments from "../../components/UpcomingAppointments";
import HospitalVisitsChart from "../../components/HospitalVisitsChart";

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("receptionistLoggedIn");
    if (!loggedIn) {
      router.push("/login"); // redirect if not logged in
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 text-blue-600 font-semibold">
        Checking login...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Title */}
        

          {/* Middle Search Bar */}
          <div className="flex-1 mx-12">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search patients, appointments, staff, or beds..."
                className="w-full px-4 py-2 rounded-full border-2 border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02]"
              />
              <span className="absolute right-3 top-2.5 text-gray-600 group-focus-within:text-blue-600 transition-colors duration-300">
                <i className="bi bi-search text-lg"></i>
              </span>
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-blue-600 transition">
              <i className="bi bi-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>
            <button className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow hover:shadow-md transition">
              <i className="bi bi-person-circle text-xl text-blue-600"></i>
              <span className="hidden md:inline text-gray-700 font-medium">
                Receptionist
              </span>
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <DashboardCard title="Appointments" value="78 today" icon="bi bi-calendar-check" />
          <DashboardCard title="Patients" value="123 active" icon="bi bi-people-fill" />
          <DashboardCard title="Beds" value="56 occupied" icon="bi bi-hospital" />
          <DashboardCard title="Staff" value="80 on duty" icon="bi bi-person-badge-fill" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BedChart />
          <UpcomingAppointments />
        </div>

        {/* Hospital Visits */}
        <HospitalVisitsChart />
      </main>
    </div>
  );
}
