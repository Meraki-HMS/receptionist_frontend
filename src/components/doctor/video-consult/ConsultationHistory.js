"use client";
import { useState } from "react";

export default function ConsultationHistory({ consultations, onViewDetails, onViewRecording }) {
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const dateFilters = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" }
  ];

  const typeFilters = [
    { value: "all", label: "All Types" },
    { value: "new-patient", label: "New Patient" },
    { value: "follow-up", label: "Follow-up" },
    { value: "consultation", label: "Consultation" },
    { value: "procedure-consult", label: "Procedure Consult" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.completed;
  };

  const getTypeColor = (type) => {
    const colors = {
      'new-patient': 'bg-blue-100 text-blue-700',
      'follow-up': 'bg-green-100 text-green-700',
      'consultation': 'bg-purple-100 text-purple-700',
      'procedure-consult': 'bg-orange-100 text-orange-700'
    };
    return colors[type] || colors.consultation;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const filterConsultations = () => {
    let filtered = [...consultations];

    // Date filtering
    const now = new Date();
    switch (dateFilter) {
      case "today":
        filtered = filtered.filter(c => 
          new Date(c.appointmentDate).toDateString() === now.toDateString()
        );
        break;
      case "week":
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filtered = filtered.filter(c => new Date(c.appointmentDate) >= weekAgo);
        break;
      case "month":
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filtered = filtered.filter(c => new Date(c.appointmentDate) >= monthAgo);
        break;
      default:
        // All time - no date filter
        break;
    }

    // Type filtering
    if (typeFilter !== "all") {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "date":
          aValue = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
          bValue = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
          break;
        case "patient":
          aValue = a.patientName.toLowerCase();
          bValue = b.patientName.toLowerCase();
          break;
        case "duration":
          aValue = a.duration;
          bValue = b.duration;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredConsultations = filterConsultations();

  const getCompletionRate = () => {
    const completed = consultations.filter(c => c.status === 'completed').length;
    const cancelled = consultations.filter(c => c.status === 'cancelled').length;
    const total = consultations.length;
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getAverageDuration = () => {
    const completedConsultations = consultations.filter(c => c.status === 'completed');
    if (completedConsultations.length === 0) return 0;
    
    const totalDuration = completedConsultations.reduce((sum, c) => sum + c.duration, 0);
    return Math.round(totalDuration / completedConsultations.length);
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{consultations.length}</div>
          <div className="text-sm text-gray-500">Total Consultations</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {consultations.filter(c => c.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {consultations.filter(c => c.status === 'cancelled').length}
          </div>
          <div className="text-sm text-gray-500">Cancelled</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{getCompletionRate()}%</div>
          <div className="text-sm text-gray-500">Completion Rate</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Date and Type Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {dateFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {typeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="date">Date</option>
                <option value="patient">Patient Name</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredConsultations.length} of {consultations.length} consultations
            </span>
            {getAverageDuration() > 0 && (
              <span>Average duration: {formatDuration(getAverageDuration())}</span>
            )}
          </div>
        </div>
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation) => (
          <div 
            key={consultation.id} 
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Patient and Consultation Info */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  consultation.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <i className={`bi bi-${consultation.status === 'completed' ? 'check-circle' : 'x-circle'} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{consultation.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    ID: {consultation.patientId} • {consultation.consultationId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
                      {consultation.type.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDuration(consultation.duration)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="text-right">
                <div className="font-semibold text-gray-800">
                  {new Date(consultation.appointmentDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">{consultation.appointmentTime}</div>
                {consultation.recordingUrl && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    <i className="bi bi-camera-reels mr-1"></i>
                    Recorded
                  </div>
                )}
              </div>
            </div>

            {/* Condition and Notes */}
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Condition:</span> {consultation.condition}
              </p>
              {consultation.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 line-clamp-2">{consultation.notes}</p>
                </div>
              )}
            </div>

            {/* Symptoms */}
            {consultation.symptoms && consultation.symptoms.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {consultation.symptoms.map((symptom, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onViewDetails(consultation)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                View Details
              </button>
              
              {consultation.recordingUrl && (
                <button
                  onClick={() => onViewRecording(consultation)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <i className="bi bi-play-circle"></i>
                  Watch Recording
                </button>
              )}
              
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                <i className="bi bi-download"></i>
                Export
              </button>
            </div>

            {/* Additional Info for Completed Consultations */}
            {consultation.status === 'completed' && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">Call Quality:</span>
                    <div className="flex items-center gap-1 mt-1">
                      <i className="bi bi-wifi text-green-500"></i>
                      <span>Excellent</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Connection:</span>
                    <div className="mt-1">Stable</div>
                  </div>
                  <div>
                    <span className="font-medium">Patient Satisfaction:</span>
                    <div className="flex items-center gap-1 mt-1">
                      <i className="bi bi-star-fill text-yellow-500"></i>
                      <i className="bi bi-star-fill text-yellow-500"></i>
                      <i className="bi bi-star-fill text-yellow-500"></i>
                      <i className="bi bi-star-fill text-yellow-500"></i>
                      <i className="bi bi-star text-gray-300"></i>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Follow-up:</span>
                    <div className="mt-1">
                      {consultation.followUpDate 
                        ? new Date(consultation.followUpDate).toLocaleDateString()
                        : 'Not scheduled'
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-clock-history text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No consultation history found</h3>
            <p className="text-gray-400 mt-1">
              {dateFilter !== 'all' || typeFilter !== 'all' 
                ? "Try adjusting your filters to see more results" 
                : "Completed video consultations will appear here"
              }
            </p>
          </div>
        )}
      </div>

      {/* Export Options */}
      {filteredConsultations.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">Export Consultation Data</h4>
              <p className="text-sm text-gray-600">Download your consultation history in various formats</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                <i className="bi bi-file-earmark-pdf"></i>
                PDF Report
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
                <i className="bi bi-file-earmark-spreadsheet"></i>
                Excel Export
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                <i className="bi bi-graph-up"></i>
                Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}