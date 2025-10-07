"use client";
import { useState, useContext } from "react";
import { DoctorModuleContext } from "../DoctorModuleContext";
import UpcomingAppointments from "../../../components/doctor/appointments/UpcomingAppointments";
import VirtualConsultation from "../../../components/doctor/appointments/VirtualConsultation";
import History from "../../../components/doctor/appointments/History";
import AppointmentDetailModal from "../../../components/doctor/appointments/AppointmentDetailModal";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Consume the shared state and functions from the parent layout via context.
  const context = useContext(DoctorModuleContext);
  
  // If the context is not yet available, display a loading message to prevent errors.
  if (!context) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Destructure the appointments list, setter, and the navigation function from the context.
  const { appointments, setAppointments, handleNavigateToPrescription } = context;

  // This function now calls the function provided by the parent layout.

  // Mark as completed and redirect to prescription
  const handlePrescription = (appointmentId) => {
    setAppointments(prev => {
      const updated = prev.map(app =>
        app.id === appointmentId ? { ...app, status: 'completed' } : app
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('appointments', JSON.stringify(updated));
      }
      const patientData = updated.find(app => app.id === appointmentId);
      if (patientData) {
        handleNavigateToPrescription(patientData);
      } else {
        alert("Could not find patient data for prescription.");
      }
      return updated;
    });
  };

  // Mark as completed for handwritten prescription
  const handleHandwritten = (appointmentId) => {
    setAppointments(prev => {
      const updated = prev.map(app =>
        app.id === appointmentId ? { ...app, status: 'completed' } : app
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('appointments', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Filter the centrally-managed appointments list for each tab.
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const virtualAppointments = appointments.filter(a => a.type === 'virtual' && a.status === 'scheduled');
  const historyAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 bg-gray-50/70">
        <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your schedule and patient appointments</p>
        </div>
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-4">
              <button onClick={() => setActiveTab('upcoming')} className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${ activeTab === 'upcoming' ? 'bg-white border-gray-200 border-t border-x text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  <i className="bi bi-calendar-check mr-2"></i>Upcoming Appointments
              </button>
              <button onClick={() => setActiveTab('virtual')} className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${ activeTab === 'virtual' ? 'bg-white border-gray-200 border-t border-x text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  <i className="bi bi-camera-video mr-2"></i>Virtual Consultation
              </button>
              <button onClick={() => setActiveTab('history')} className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${ activeTab === 'history' ? 'bg-white border-gray-200 border-t border-x text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  <i className="bi bi-clock-history mr-2"></i>Appointment History
              </button>
            </nav>
        </div>
        <div className="bg-white p-6 rounded-b-2xl rounded-r-2xl shadow-sm border border-gray-200">
            {activeTab === 'upcoming' && (
              <UpcomingAppointments
                appointments={upcomingAppointments}
                onViewDetails={setSelectedAppointment}
                onComplete={handlePrescription}
                onHandwritten={handleHandwritten}
              />
            )}
            {activeTab === 'virtual' && ( <VirtualConsultation appointments={virtualAppointments} /> )}
            {activeTab === 'history' && ( <History appointments={historyAppointments} onViewDetails={setSelectedAppointment} /> )}
        </div>
      </main>
      {selectedAppointment && ( <AppointmentDetailModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} /> )}
    </>
  );
}

