"use client";
import { Calendar, Clock, ClipboardList } from "lucide-react";

const appointments = [
  { name: "James Smith", date: "28-06-24", time: "08:21 AM", type: "Checkup" },
  { name: "Hazy Eling", date: "08-07-24", time: "03:05 PM", type: "Follow-up" },
  { name: "Pelor Grey", date: "30-09-24", time: "12:54 PM", type: "Surgery" },
  { name: "Sarah Lee", date: "10-08-24", time: "09:15 AM", type: "Emergency" },
];

export default function UpcomingAppointments() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[350px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
          + Create New
        </button>
      </div>

      {/* Appointment List */}
      <div className="overflow-y-auto space-y-3">
        {appointments.map((appt, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-3 hover:shadow-sm transition"
          >
            {/* Patient Name */}
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{appt.name}</span>
              <span className="text-xs text-gray-500">Patient</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Calendar size={16} /> {appt.date}
            </div>

            {/* Time */}
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Clock size={16} /> {appt.time}
            </div>

            {/* Type */}
            <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
              <ClipboardList size={16} /> {appt.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
