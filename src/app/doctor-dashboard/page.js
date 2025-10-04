"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "../../components/doctor/layout/DoctorSidebar";
import DoctorTopBar from "../../components/doctor/layout/DoctorTopBar";
import StatCards from "../../components/doctor/dashboard/StatCards";
import PatientQueue from "../../components/doctor/dashboard/PatientQueue";
import TodaySchedule from "../../components/doctor/dashboard/TodaySchedule";
import QuickActions from "../../components/doctor/dashboard/QuickActions";
import { useDoctorAuth } from "../../hooks/useDoctorAuth";
import { useMobileDetection } from "../../hooks/useMobileDetection";

export default function DoctorDashboard() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useDoctorAuth();
  const { isMobile } = useMobileDetection();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeModule, setActiveModule] = useState("dashboard");

  // Redirect based on active module
  useEffect(() => {
    if (activeModule !== "dashboard") {
      const routes = {
        patients: "/doctor/patients",
        appointments: "/doctor/appointments",
        prescriptions: "/doctor/prescriptions",
        "lab-reports": "/doctor/lab-reports",
        "video-consult": "/doctor/video-consult",
        diagnosis: "/doctor/diagnosis",
        "treatment-plans": "/doctor/treatment-plans",
        referrals: "/doctor/referrals",
        discharge: "/doctor/discharge",
        feedback: "/doctor/feedback"
      };
      
      if (routes[activeModule]) {
        router.push(routes[activeModule]);
      }
    }
  }, [activeModule, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Doctor Dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Doctor Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isMobile ? 'fixed inset-y-0 z-50 w-64' : 'relative'}
        transition-transform duration-300 ease-in-out
      `}>
        <DoctorSidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          user={user}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <DoctorTopBar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          activeModule={activeModule}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Welcome back, Dr. {user?.name?.split(' ')[0] || 'Doctor'}
            </h1>
            <p className="text-gray-600 mt-2">
              Here's your schedule and patient queue for today.
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="mb-6 lg:mb-8">
            <StatCards />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Patient Queue - Left Column */}
            <div className="xl:col-span-1">
              <PatientQueue />
            </div>

            {/* Today's Schedule - Middle Column */}
            <div className="xl:col-span-1">
              <TodaySchedule />
            </div>

            {/* Quick Actions - Right Column */}
            <div className="xl:col-span-1">
              <QuickActions setActiveModule={setActiveModule} />
            </div>
          </div>

          {/* Emergency Alert Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <i className="bi bi-exclamation-triangle text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Emergency Case Alert</h3>
                  <p className="text-red-600 text-sm">Patient in Room 204 requires immediate attention</p>
                </div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
                Respond Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}