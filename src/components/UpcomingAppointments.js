"use client";

import { useState } from "react";

export default function UpcomingAppointments() {
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Terrell Fashey",
      time: "9:30 AM",
      patientName: "Flora Strosin",
      phone: "679-747-6105",
      email: "flora.strosin@email.com"
    },
    {
      id: 2,
      doctorName: "Dr. Clarence Gulgow",
      time: "10:00 AM",
      patientName: "Michele Nicolas",
      phone: "884-528-7089",
      email: "m.nicolas@email.com"
    },
    {
      id: 3,
      doctorName: "Dr. Jay Mohr",
      time: "10:45 AM",
      patientName: "Joseph Pacocha",
      phone: "777-284-2912",
      email: "j.pacocha@email.com"
    },
    {
      id: 4,
      doctorName: "Dr. Sarah Johnson",
      time: "11:30 AM",
      patientName: "Michael Brown",
      phone: "555-123-4567",
      email: "m.brown@email.com"
    }
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {appointments.length} today
        </span>
      </div>

      {/* Scrollable Appointments */}
      <div className="flex-1 overflow-y-auto max-h-64 pr-1">
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow duration-150">
              {/* Compact Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{appointment.doctorName}</h4>
                  <p className="text-blue-600 font-semibold text-xs">${appointment.time}</p>
                </div>
              </div>

              {/* Compact Patient Info */}
              <div className="mb-2">
                <p className="text-gray-600 text-xs mb-1 truncate">
                  With <span className="font-medium">{appointment.patientName}</span>
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate">{appointment.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{appointment.email}</span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                  Confirmed
                </span>
                <span className="text-xs text-gray-500">
                  {appointment.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <button className="mt-3 w-full py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150 text-sm font-medium border border-gray-200">
        View all appointments
      </button>
    </div>
  );
}