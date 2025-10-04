"use client";
import { useEffect, useState } from "react";

// Mock data for appointments
const appointmentsData = [
  {
    id: 1,
    patientId: "P001",
    patientName: "John Smith",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: 30,
    type: "consultation",
    typeLabel: "Consultation",
    status: "confirmed",
    location: "Room 201",
    isVideo: false,
    condition: "Hypertension Follow-up",
    notes: "Regular checkup, discuss medication adjustment"
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Maria Garcia",
    date: "2024-01-15",
    time: "11:30 AM",
    duration: 45,
    type: "follow-up",
    typeLabel: "Follow-up",
    status: "confirmed",
    location: "Room 201",
    isVideo: true,
    condition: "Asthma Management",
    notes: "Video consultation - discuss inhaler usage"
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Robert Johnson",
    date: "2024-01-15",
    time: "02:15 PM",
    duration: 30,
    type: "consultation",
    typeLabel: "Consultation",
    status: "scheduled",
    location: "Room 205",
    isVideo: false,
    condition: "Diabetes Review",
    notes: "Review blood sugar logs"
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Sarah Chen",
    date: "2024-01-16",
    time: "09:00 AM",
    duration: 60,
    type: "procedure",
    typeLabel: "Procedure",
    status: "confirmed",
    location: "OR-3",
    isVideo: false,
    condition: "Pregnancy Ultrasound",
    notes: "20-week anatomy scan"
  }
];

// Day View Component
function DayView({ appointments, onJoinVideo, onStartConsultation, onReschedule }) {
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="relative">
      {/* Time Slots */}
      <div className="space-y-4">
        {timeSlots.map((timeSlot) => {
          const slotAppointments = appointments.filter(apt => {
            // This logic is a bit fragile for parsing AM/PM. A more robust library like date-fns would be better in a real app.
            const aptHour = new Date(`2000-01-01 ${apt.time}`).getHours();
            const slotHour = new Date(`2000-01-01 ${timeSlot}`).getHours();
            return aptHour === slotHour;
          });

          return (
            <div key={timeSlot} className="flex">
              {/* Time Label */}
              <div className="w-20 text-sm text-gray-500 font-medium">
                {timeSlot}
              </div>
              
              {/* Appointments */}
              <div className="flex-1 ml-4">
                {slotAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onJoinVideo={onJoinVideo}
                    onStartConsultation={onStartConsultation}
                    onReschedule={onReschedule}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ appointment, onJoinVideo, onStartConsultation, onReschedule }) {
  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.scheduled;
  };

  const getTypeColor = (type) => {
    const colors = {
      consultation: 'bg-purple-100 text-purple-800',
      'follow-up': 'bg-green-100 text-green-800',
      procedure: 'bg-orange-100 text-orange-800',
      emergency: 'bg-red-100 text-red-800'
    };
    return colors[type] || colors.consultation;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <i className="bi bi-person text-green-600 text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{appointment.patientName}</h3>
            <p className="text-sm text-gray-500">{appointment.condition}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                {appointment.typeLabel}
              </span>
              {appointment.isVideo && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Video Call
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-gray-800">{appointment.time}</div>
          <div className="text-sm text-gray-500">{appointment.duration} min</div>
          <div className="text-sm text-gray-500">{appointment.location}</div>
        </div>
      </div>

      {appointment.notes && (
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <p className="text-sm text-gray-600">{appointment.notes}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {appointment.isVideo && appointment.status === 'confirmed' && (
          <button
            onClick={() => onJoinVideo(appointment.id)}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <i className="bi bi-camera-video"></i>
            Join Video Call
          </button>
        )}
        
        {!appointment.isVideo && appointment.status === 'confirmed' && (
          <button
            onClick={() => onStartConsultation(appointment.id)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <i className="bi bi-chat-dots"></i>
            Start Consultation
          </button>
        )}

        <button
          onClick={() => onReschedule(appointment.id)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Reschedule
        </button>

        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          <i className="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
  );
}

// Week View Component (Simplified)
function WeekView({ appointments }) {
  return (
    <div className="text-center py-12">
      <i className="bi bi-calendar-week text-4xl text-gray-300 mb-4"></i>
      <h3 className="text-lg font-medium text-gray-500">Week View</h3>
      <p className="text-gray-400 mt-1">Weekly calendar view coming soon</p>
    </div>
  );
}

// Month View Component (Simplified)
function MonthView({ appointments }) {
  return (
    <div className="text-center py-12">
      <i className="bi bi-calendar-month text-4xl text-gray-300 mb-4"></i>
      <h3 className="text-lg font-medium text-gray-500">Month View</h3>
      <p className="text-gray-400 mt-1">Monthly calendar view coming soon</p>
    </div>
  );
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState("day"); // day, week, month

  useEffect(() => {
    setAppointments(appointmentsData);
  }, []);

  useEffect(() => {
    let filtered = appointments.filter(apt => apt.date === selectedDate);
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }
    
    if (typeFilter !== "all") {
      filtered = filtered.filter(apt => apt.type === typeFilter);
    }
    
    setFilteredAppointments(filtered);
  }, [selectedDate, statusFilter, typeFilter, appointments]);

  const handleJoinVideoCall = (appointmentId) => {
    console.log(`Joining video call for appointment ${appointmentId}`);
    // In a real app, you might use router.push here
  };

  const handleStartConsultation = (appointmentId) => {
    console.log(`Starting consultation for appointment ${appointmentId}`);
  };

  const handleReschedule = (appointmentId) => {
    console.log(`Rescheduling appointment ${appointmentId}`);
  };

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      {/* Header Section */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600 mt-2">
              Manage your schedule and patient appointments
            </p>
          </div>
          <button className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
            <i className="bi bi-plus-lg"></i>
            New Appointment
          </button>
        </div>
      </div>

      {/* Calendar and Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Date Selection */}
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("day")}
                className={`p-2 rounded-md transition-colors ${
                  view === "day" ? "bg-white shadow-sm text-green-600" : "text-gray-500"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView("week")}
                className={`p-2 rounded-md transition-colors ${
                  view === "week" ? "bg-white shadow-sm text-green-600" : "text-gray-500"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`p-2 rounded-md transition-colors ${
                  view === "month" ? "bg-white shadow-sm text-green-600" : "text-gray-500"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="procedure">Procedure</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>

          {view === "day" && (
            <DayView 
              appointments={filteredAppointments}
              onJoinVideo={handleJoinVideoCall}
              onStartConsultation={handleStartConsultation}
              onReschedule={handleReschedule}
            />
          )}

          {view === "week" && (
            <WeekView appointments={appointments} />
          )}

          {view === "month" && (
            <MonthView appointments={appointments} />
          )}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <i className="bi bi-calendar-x text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-500">No appointments scheduled</h3>
              <p className="text-gray-400 mt-1">You're all caught up for this date!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
