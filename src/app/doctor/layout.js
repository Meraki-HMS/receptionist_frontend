"use client";
import React, { useState } from "react";
import { DoctorModuleContext } from "./DoctorModuleContext";
import DoctorSidebar from "../../components/doctor/layout/DoctorSidebar";
import DoctorTopBar from "../../components/doctor/layout/DoctorTopBar";
import { useDoctorAuth } from "../../hooks/useDoctorAuth";
import { useMobileDetection } from "../../hooks/useMobileDetection";

export default function DoctorLayout({ children }) {
  const { user, loading, isAuthenticated } = useDoctorAuth();
  const { isMobile } = useMobileDetection();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Persisted appointment data
  const defaultAppointments = [
    { id: 1, patientEmail: "john.smith@example.com", patientName: "John Smith", date: "2025-10-06", time: "10:00 AM", type: "virtual", sessionType: "Checkup", status: "scheduled", patientDetails: { age: 45, gender: "Male", contact: "+1 123-456-7890", email: "john.smith@example.com", sessionType: "Checkup", medicalHistoryFiles: [ { name: "Blood Report - Aug 2025.pdf", url: "/path/to/report.pdf" }, { name: "Chest X-Ray.jpg", url: "/path/to/xray.jpg" }, ], }, joinUrl: "https://zoom.us/j/1234567890", passcode: "12345" },
    { id: 2, patientEmail: "emily.white@example.com", patientName: "Emily White", date: "2025-10-06", time: "11:30 AM", type: "walk-in", sessionType: "Consultation", status: "scheduled", patientDetails: { age: 32, gender: "Female", contact: "+1 234-567-8901", email: "emily.white@example.com", sessionType: "Consultation", medicalHistoryFiles: [], }, },
    { id: 3, patientEmail: "robert.j@example.com", patientName: "Robert Johnson", date: "2025-10-07", time: "02:00 PM", type: "offline", sessionType: "Therapy", status: "scheduled", patientDetails: { age: 58, gender: "Male", contact: "+1 345-678-9012", email: "robert.j@example.com", sessionType: "Therapy", medicalHistoryFiles: [ { name: "ECG Report.pdf", url: "/path/to/ecg.pdf" }, ], }, },
    { id: 4, patientEmail: "sarah.chen@example.com", patientName: "Sarah Chen", date: "2025-10-04", time: "09:00 AM", type: "virtual", sessionType: "Follow-Up", status: "completed", patientDetails: { age: 28, gender: "Female", contact: "+1 456-789-0123", email: "sarah.chen@example.com", sessionType: "Follow-Up", medicalHistoryFiles: [], }, },
    { id: 5, patientEmail: "michael.b@example.com", patientName: "Michael Brown", date: "2025-10-03", time: "01:00 PM", type: "walk-in", sessionType: "Checkup", status: "cancelled", patientDetails: { age: 65, gender: "Male", contact: "+1 567-890-1234", email: "michael.b@example.com", sessionType: "Checkup", medicalHistoryFiles: [], }, },
    { id: 6, patientEmail: "lisa.wang@example.com", patientName: "Lisa Wang", date: "2025-10-08", time: "09:30 AM", type: "virtual", sessionType: "Consultation", status: "scheduled", patientDetails: { age: 37, gender: "Female", contact: "+1 678-901-2345", email: "lisa.wang@example.com", sessionType: "Therapy", medicalHistoryFiles: [ { name: "MRI Scan.pdf", url: "/path/to/mri.pdf" } ], }, joinUrl: "https://zoom.us/j/9876543210", passcode: "54321" },
    { id: 7, patientEmail: "david.miller@example.com", patientName: "David Miller", date: "2025-10-08", time: "11:00 AM", type: "walk-in", sessionType: "Therapy", status: "scheduled", patientDetails: { age: 50, gender: "Male", contact: "+1 789-012-3456", email: "david.miller@example.com", sessionType: "Follow-Up", medicalHistoryFiles: [], }, },
    { id: 8, patientEmail: "maria.garcia@example.com", patientName: "Maria Garcia", date: "2025-10-09", time: "01:30 PM", type: "offline", sessionType: "Checkup", status: "scheduled", patientDetails: { age: 29, gender: "Female", contact: "+1 890-123-4567", email: "maria.garcia@example.com", sessionType: "Consultation", medicalHistoryFiles: [ { name: "Ultrasound Report.pdf", url: "/path/to/ultrasound.pdf" } ], }, },
    { id: 9, patientEmail: "james.lee@example.com", patientName: "James Lee", date: "2025-10-09", time: "03:00 PM", type: "virtual", sessionType: "Follow-Up", status: "scheduled", patientDetails: { age: 41, gender: "Male", contact: "+1 901-234-5678", email: "james.lee@example.com", sessionType: "Checkup", medicalHistoryFiles: [], }, joinUrl: "https://zoom.us/j/1928374650", passcode: "67890" },
    { id: 10, patientEmail: "priya.singh@example.com", patientName: "Priya Singh", date: "2025-10-10", time: "10:15 AM", type: "walk-in", sessionType: "Consultation", status: "scheduled", patientDetails: { age: 34, gender: "Female", contact: "+1 234-567-8902", email: "priya.singh@example.com", sessionType: "Therapy", medicalHistoryFiles: [], }, },
  ];

  const [appointments, setAppointments] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('appointments');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return defaultAppointments;
  });

  // Persist appointments to localStorage on every change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);
  const [prescriptionContext, setPrescriptionContext] = useState(null);

  // Navigation function for prescription
  const handleNavigateToPrescription = (patientData) => {
    setPrescriptionContext(patientData);
    // Persist context for reload/redirect
    if (typeof window !== "undefined") {
      localStorage.setItem('prescriptionContext', JSON.stringify(patientData));
      window.location.href = '/doctor/prescriptions';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Doctor Portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <DoctorModuleContext.Provider value={{
      handleNavigateToPrescription,
      appointments,
      setAppointments,
      prescriptionContext,
      setPrescriptionContext,
    }}>
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
          />
          {/* Render children (doctor modules) */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </DoctorModuleContext.Provider>
  );
}

