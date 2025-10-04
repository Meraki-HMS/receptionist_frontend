"use client";
import { useState, useEffect, useRef } from "react";
import ConsultationNotes from "./ConsultationNotes";

export default function VideoCallInterface({ consultation, onEndCall, onBack }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [patientJoined, setPatientJoined] = useState(false);
  
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Simulate call connection and patient joining
  useEffect(() => {
    const connectCall = setTimeout(() => {
      setIsConnected(true);
      setPatientJoined(true);
    }, 2000);

    // Start call timer
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectCall);
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In real implementation, this would toggle the video stream
  };

  const handleToggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In real implementation, this would toggle the audio stream
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In real implementation, this would toggle screen sharing
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // In real implementation, this would start/stop recording
  };

  const handleTakeNotes = () => {
    setShowNotes(true);
  };

  const handleEndCall = () => {
    clearInterval(timerRef.current);
    if (onEndCall) onEndCall();
  };

  const handleSaveNotes = (notes) => {
    console.log("Saving consultation notes:", notes);
    setShowNotes(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="bi bi-arrow-left text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl font-semibold">Video Consultation</h1>
              <p className="text-gray-400 text-sm">
                with {consultation.patientName} • {consultation.condition}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-green-400">
                {formatTime(callDuration)}
              </div>
              <div className="text-xs text-gray-400">Call Duration</div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">{isConnected ? 'Connected' : 'Connecting...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Patient Video (Main) */}
          <div className="lg:col-span-2 bg-black rounded-2xl relative overflow-hidden">
            {patientJoined ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="bi bi-person text-4xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{consultation.patientName}</h3>
                  <p className="text-gray-400">Video feed active</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Audio {isAudioOn ? 'On' : 'Off'}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Video {isVideoOn ? 'On' : 'Off'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Waiting for patient to join...</h3>
                  <p className="text-gray-400">The call will start automatically when patient joins</p>
                </div>
              </div>
            )}

            {/* Call Quality Indicator */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <i className="bi bi-wifi text-green-400"></i>
                <span className="text-sm">Excellent</span>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 bg-red-600 rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm">Recording</span>
              </div>
            )}
          </div>

          {/* Doctor Video & Controls Sidebar */}
          <div className="space-y-6">
            {/* Doctor's Video Preview */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Your Video</h3>
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="bi bi-camera-video text-white text-xl"></i>
                    </div>
                    <p className="text-sm text-gray-400">Video Active</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className="bi bi-camera-video-off text-gray-400 text-xl"></i>
                    </div>
                    <p className="text-sm text-gray-400">Video Off</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors flex flex-col items-center gap-1">
                  <i className="bi bi-file-medical text-lg"></i>
                  <span className="text-xs">Prescription</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors flex flex-col items-center gap-1">
                  <i className="bi bi-clipboard-plus text-lg"></i>
                  <span className="text-xs">Lab Tests</span>
                </button>
                <button 
                  onClick={handleTakeNotes}
                  className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition-colors flex flex-col items-center gap-1"
                >
                  <i className="bi bi-journal-text text-lg"></i>
                  <span className="text-xs">Notes</span>
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 p-3 rounded-lg transition-colors flex flex-col items-center gap-1">
                  <i className="bi bi-share text-lg"></i>
                  <span className="text-xs">Share</span>
                </button>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Patient Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span>{consultation.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Condition:</span>
                  <span>{consultation.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{consultation.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="capitalize">{consultation.type.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          {/* Audio Control */}
          <button
            onClick={handleToggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isAudioOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <i className={`bi bi-mic${isAudioOn ? '' : '-mute'} text-xl`}></i>
          </button>

          {/* Video Control */}
          <button
            onClick={handleToggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isVideoOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <i className={`bi bi-camera-video${isVideoOn ? '' : '-off'} text-xl`}></i>
          </button>

          {/* Screen Share */}
          <button
            onClick={handleToggleScreenShare}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <i className="bi bi-laptop text-xl"></i>
          </button>

          {/* Recording */}
          <button
            onClick={handleToggleRecording}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <i className="bi bi-record-circle text-xl"></i>
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <i className="bi bi-telephone-x text-xl"></i>
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <i className="bi bi-chat-left-dots"></i>
            Chat
          </button>
          <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <i className="bi bi-people"></i>
            Invite
          </button>
          <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <i className="bi bi-gear"></i>
            Settings
          </button>
        </div>
      </div>

      {/* Consultation Notes Modal */}
      {showNotes && (
        <ConsultationNotes
          consultation={consultation}
          onSave={handleSaveNotes}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}