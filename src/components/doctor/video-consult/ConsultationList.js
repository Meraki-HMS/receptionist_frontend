"use client";

export default function ConsultationList({ 
  consultations, 
  onStartConsultation, 
  onJoinCall, 
  onEndCall, 
  onReschedule, 
  onCancel, 
  onViewDetails,
  type = "upcoming" 
}) {
  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-700 border-blue-200',
      'in-progress': 'bg-green-100 text-green-700 border-green-200',
      completed: 'bg-gray-100 text-gray-700 border-gray-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.scheduled;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      routine: 'bg-blue-100 text-blue-700'
    };
    return colors[priority] || colors.routine;
  };

  const getTimeStatus = (appointmentDate, appointmentTime) => {
    const now = new Date();
    // A simple way to parse time like "10:00 AM" is to add it to a date string
    const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);
    const timeDiff = appointmentDateTime - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 0) return { text: 'Overdue', color: 'text-red-600 bg-red-50' };
    if (hoursDiff < 1) return { text: 'Starting soon', color: 'text-orange-600 bg-orange-50' };
    if (hoursDiff < 24) return { text: 'Today', color: 'text-green-600 bg-green-50' };
    return { text: 'Upcoming', color: 'text-blue-600 bg-blue-50' };
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-4">
      {consultations.map((consultation) => {
        const timeStatus = getTimeStatus(consultation.appointmentDate, consultation.appointmentTime);
        
        return (
          <div 
            key={consultation.id} 
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Patient Info */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  consultation.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                  consultation.status === 'in-progress' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <i className={`bi ${
                    consultation.status === 'scheduled' ? 'bi-camera-video' :
                    consultation.status === 'in-progress' ? 'bi-play-circle' :
                    'bi-check-circle'
                  } text-xl`}></i>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(consultation.priority)}`}>
                      {consultation.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${timeStatus.color}`}>
                      {timeStatus.text}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Time Info */}
              <div className="text-right">
                <div className="font-semibold text-gray-800">{consultation.appointmentTime}</div>
                <div className="text-sm text-gray-500">
                  {new Date(consultation.appointmentDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDuration(consultation.duration)}
                </div>
              </div>
            </div>

            {/* Condition and Symptoms */}
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Condition:</span> {consultation.condition}
              </p>
              {consultation.symptoms && consultation.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {consultation.symptoms.map((symptom, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {symptom}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Notes Preview */}
            {consultation.notes && (
              <div className="mb-3 bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 line-clamp-2">{consultation.notes}</p>
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
              
              {consultation.status === 'scheduled' && (
                <>
                  <button
                    onClick={() => onStartConsultation(consultation)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-camera-video"></i>
                    Start Now
                  </button>
                  <button
                    onClick={() => onReschedule(consultation.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Reschedule
                  </button>
                </>
              )}
              
              {consultation.status === 'in-progress' && (
                <>
                  <button
                    onClick={() => onJoinCall(consultation)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-play-circle"></i>
                    Join Call
                  </button>
                  <button
                    onClick={() => onEndCall(consultation.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    End Call
                  </button>
                </>
              )}
              
              {(consultation.status === 'scheduled' || consultation.status === 'in-progress') && (
                <button
                  onClick={() => onCancel(consultation.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Quick Join for In-Progress */}
            {consultation.status === 'in-progress' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Call in progress</span>
                  </div>
                  <button
                    onClick={() => onJoinCall(consultation)}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 text-sm"
                  >
                    Join immediately
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {consultations.length === 0 && (
        <div className="text-center py-8">
          <i className="bi bi-camera-video text-3xl text-gray-300 mb-3"></i>
          <h3 className="text-lg font-medium text-gray-500">
            {type === 'upcoming'
              ? 'No upcoming consultations'
              : type === 'in-progress'
              ? 'No active consultations'
              : 'No consultation history'}
          </h3>
          <p className="text-gray-400 mt-1">
            {type === 'upcoming'
              ? 'All scheduled consultations will appear here'
              : type === 'in-progress'
              ? 'Active video calls will appear here'
              : 'Completed consultations will appear here'}
          </p>
        </div>
      )}
    </div>
  );
}