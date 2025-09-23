"use client";
import { Calendar, Clock, ClipboardList, Plus, ArrowRight } from "lucide-react";

const appointments = [
  { 
    name: "James Smith", 
    date: "28-06-24", 
    time: "08:21 AM", 
    type: "Checkup",
    status: "confirmed",
    priority: "high"
  },
  { 
    name: "Hazy Eling", 
    date: "08-07-24", 
    time: "03:05 PM", 
    type: "Follow-up",
    status: "confirmed",
    priority: "medium"
  },
  { 
    name: "Pelor Grey", 
    date: "30-09-24", 
    time: "12:54 PM", 
    type: "Surgery",
    status: "pending",
    priority: "high"
  },
  { 
    name: "Sarah Lee", 
    date: "10-08-24", 
    time: "09:15 AM", 
    type: "Emergency",
    status: "confirmed",
    priority: "urgent"
  },
];

const PriorityBadge = ({ priority }) => {
  const styles = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${styles[priority]}`}>
      {priority}
    </span>
  );
};

export default function UpcomingAppointments() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-4 lg:p-6 h-[350px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
          <p className="text-sm text-gray-500">Next 7 days schedule</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-md">
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="overflow-y-auto space-y-3 flex-1">
        {appointments.map((appt, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60 hover:shadow-md transition-all duration-200 group hover:scale-[1.01]"
          >
            {/* Patient Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {appt.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 text-sm">{appt.name}</span>
                  <PriorityBadge priority={appt.priority} />
                </div>
                <span className="text-xs text-gray-500 capitalize">{appt.status}</span>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
                  <Calendar size={14} />
                  <span>{appt.date}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <Clock size={14} />
                  <span>{appt.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  appt.type === 'Emergency' ? 'bg-red-50 text-red-600' :
                  appt.type === 'Surgery' ? 'bg-orange-50 text-orange-600' :
                  appt.type === 'Checkup' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>
                  <ClipboardList size={16} />
                </div>
                <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200/60">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">4 appointments today</span>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}