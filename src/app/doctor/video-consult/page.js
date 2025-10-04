"use client";
import { useEffect, useState } from "react";
import ConsultationList from "../../../components/doctor/video-consult/ConsultationList";
import VideoCallInterface from "../../../components/doctor/video-consult/VideoCallInterface";
import ConsultationHistory from "../../../components/doctor/video-consult/ConsultationHistory";
import NewConsultationForm from "../../../components/doctor/video-consult/NewConsultationForm";
import ConsultationNotes from "../../../components/doctor/video-consult/ConsultationNotes";

// Mock data for video consultations
const consultationsData = [
    {
        id: 1,
        consultationId: "VC-001",
        patientId: "P001",
        patientName: "John Smith",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00 AM",
        duration: 30,
        status: "scheduled",
        type: "follow-up",
        condition: "Hypertension Management",
        notes: "Discuss medication adjustment",
        joinUrl: "https://meet.jit.si/room-001",
        recordingUrl: null,
        symptoms: ["High BP", "Headache"],
        priority: "routine"
    },
    {
        id: 2,
        consultationId: "VC-002",
        patientId: "P002",
        patientName: "Maria Garcia",
        appointmentDate: "2024-01-15",
        appointmentTime: "11:30 AM",
        duration: 45,
        status: "in-progress",
        type: "new-patient",
        condition: "Asthma Review",
        notes: "New patient consultation",
        joinUrl: "https://meet.jit.si/room-002",
        recordingUrl: null,
        symptoms: ["Shortness of breath", "Wheezing"],
        priority: "high"
    },
    {
        id: 3,
        consultationId: "VC-003",
        patientId: "P003",
        patientName: "Robert Johnson",
        appointmentDate: "2024-01-15",
        appointmentTime: "02:15 PM",
        duration: 30,
        status: "completed",
        type: "consultation",
        condition: "Diabetes Checkup",
        notes: "Regular diabetes management",
        joinUrl: "https://meet.jit.si/room-003",
        recordingUrl: "https://storage.meraki.com/recordings/vc-003",
        symptoms: ["High blood sugar", "Fatigue"],
        priority: "routine"
    },
    {
        id: 4,
        consultationId: "VC-004",
        patientId: "P004",
        patientName: "Sarah Chen",
        appointmentDate: "2024-01-16",
        appointmentTime: "09:00 AM",
        duration: 60,
        status: "scheduled",
        type: "procedure-consult",
        condition: "Pre-surgery Discussion",
        notes: "Discuss upcoming surgery procedure",
        joinUrl: "https://meet.jit.si/room-004",
        recordingUrl: null,
        symptoms: ["Scheduled surgery", "Pre-op assessment"],
        priority: "high"
    }
];

function TestEquipmentModal({ onClose }) {
    const [testStep, setTestStep] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (testStep < 3) {
                setTestStep(testStep + 1);
            } else {
                const closeTimer = setTimeout(onClose, 2000);
                return () => clearTimeout(closeTimer);
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, [testStep, onClose]);
    const steps = { 1: { icon: "bi-mic-fill", text: "Testing Microphone..." }, 2: { icon: "bi-volume-up-fill", text: "Testing Speakers..." }, 3: { icon: "bi-camera-video-fill", text: "Testing Camera..." } };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 m-4 max-w-sm w-full text-center shadow-2xl">
                <div className="animate-pulse"><i className={`bi ${steps[testStep].icon} text-5xl text-green-500 mb-4`}></i><h3 className="text-xl font-bold text-gray-800">{steps[testStep].text}</h3></div>
                {testStep === 3 && (<p className="text-green-600 font-semibold mt-4">All equipment working perfectly!</p>)}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6"><div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(testStep / 3) * 100}%` }}></div></div>
            </div>
        </div>
    );
}

function ConsultationDetailModal({ consultation, onClose, onJoinCall, onStartConsultation }) {
    const getStatusColor = (status) => {
        const colors = { scheduled: 'bg-blue-100 text-blue-700 border-blue-200', 'in-progress': 'bg-green-100 text-green-700 border-green-200', completed: 'bg-gray-100 text-gray-700 border-gray-200', cancelled: 'bg-red-100 text-red-700 border-red-200' };
        return colors[status] || colors.scheduled;
    };
    const getPriorityColor = (priority) => {
        const colors = { urgent: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700', routine: 'bg-blue-100 text-blue-700' };
        return colors[priority] || colors.routine;
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-800">Consultation Details</h2><button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"><i className="bi bi-x-lg text-xl"></i></button></div></div>
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-800 mb-3">Patient Information</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Name:</span><span className="font-medium">{consultation.patientName}</span></div><div className="flex justify-between"><span className="text-gray-600">Patient ID:</span><span className="font-medium">{consultation.patientId}</span></div><div className="flex justify-between"><span className="text-gray-600">Consultation ID:</span><span className="font-medium">{consultation.consultationId}</span></div></div></div>
                        <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-800 mb-3">Appointment Details</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Date & Time:</span><span className="font-medium">{new Date(consultation.appointmentDate).toLocaleDateString()} at {consultation.appointmentTime}</span></div><div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium">{consultation.duration} minutes</span></div><div className="flex justify-between items-center"><span className="text-gray-600">Status:</span><span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>{consultation.status}</span></div><div className="flex justify-between items-center"><span className="text-gray-600">Priority:</span><span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(consultation.priority)}`}>{consultation.priority}</span></div></div></div>
                    </div>
                    <div className="flex gap-3 justify-end"><button onClick={onClose} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Close</button>{consultation.status === 'scheduled' && (<button onClick={() => { onStartConsultation(consultation); onClose(); }} className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"><i className="bi bi-camera-video"></i> Start Consultation</button>)}{consultation.status === 'in-progress' && (<button onClick={() => { onJoinCall(consultation); onClose(); }} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"><i className="bi bi-play-circle"></i> Join Call</button>)}</div>
                </div>
            </div>
        </div>
    );
}

export default function VideoConsultPage() {
    const [consultations, setConsultations] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [activeCall, setActiveCall] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showNewConsultationForm, setShowNewConsultationForm] = useState(false);
    const [showTestEquipment, setShowTestEquipment] = useState(false);

    useEffect(() => {
        setConsultations(consultationsData);
    }, []);

    const handleCreateConsultation = (newConsultationData) => {
        const newEntry = {
            id: consultations.length + 5,
            consultationId: `VC-${String(consultations.length + 5).padStart(3, '0')}`,
            ...newConsultationData,
            joinUrl: `https://meet.jit.si/room-${Math.floor(Math.random() * 1000)}`,
        };
        setConsultations(prev => [newEntry, ...prev]);
        setShowNewConsultationForm(false);
        setActiveTab("upcoming");
    };

    const handleJoinCall = (consultation) => { setActiveCall(consultation); };
    const handleEndCall = () => {
        if (activeCall) {
            setConsultations(prev => prev.map(consult => consult.id === activeCall.id ? { ...consult, status: 'completed' } : consult));
        }
        setActiveCall(null);
    };
    const handleStartConsultation = (consultation) => {
        setConsultations(prev => prev.map(consult => consult.id === consultation.id ? { ...consult, status: 'in-progress' } : consult));
        setActiveCall(consultation);
    };
    const handleReschedule = (consultationId) => { console.log("Rescheduling consultation:", consultationId); };
    const handleCancel = (consultationId) => {
        setConsultations(prev => prev.map(consult => consult.id === consultationId ? { ...consult, status: 'cancelled' } : consult));
    };

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || consultation.consultationId.toLowerCase().includes(searchTerm.toLowerCase()) || consultation.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const upcomingConsultations = filteredConsultations.filter(c => c.status === 'scheduled');
    const inProgressConsultations = filteredConsultations.filter(c => c.status === 'in-progress');
    const completedConsultations = filteredConsultations.filter(c => c.status === 'completed' || c.status === 'cancelled');

    if (activeCall) {
        return (<VideoCallInterface consultation={activeCall} onEndCall={handleEndCall} onBack={() => setActiveCall(null)} />);
    }

    return (
        <>
            <main className="flex-1 p-4 lg:p-6 overflow-auto">
                <div className="mb-6 lg:mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Video Consultations</h1>
                            <p className="text-gray-600 mt-2">Manage virtual appointments and telemedicine sessions</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 lg:mt-0">
                            <button onClick={() => setShowNewConsultationForm(true)} className="bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"><i className="bi bi-plus-lg"></i> New Consultation</button>
                            <button onClick={() => setShowTestEquipment(true)} className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"><i className="bi bi-camera-video"></i> Test Equipment</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"><div className="text-2xl font-bold text-gray-800">{consultations.length}</div><div className="text-sm text-gray-500">Total Consultations</div></div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"><div className="text-2xl font-bold text-blue-600">{upcomingConsultations.length}</div><div className="text-sm text-gray-500">Upcoming</div></div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"><div className="text-2xl font-bold text-green-600">{inProgressConsultations.length}</div><div className="text-sm text-gray-500">In Progress</div></div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"><div className="text-2xl font-bold text-purple-600">{completedConsultations.length}</div><div className="text-sm text-gray-500">Completed</div></div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto">
                            <button onClick={() => setActiveTab("upcoming")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "upcoming" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}><i className="bi bi-calendar-check mr-2"></i> Upcoming ({upcomingConsultations.length})</button>
                            <button onClick={() => setActiveTab("in-progress")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "in-progress" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}><i className="bi bi-camera-video mr-2"></i> In Progress ({inProgressConsultations.length})</button>
                            <button onClick={() => setActiveTab("history")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === "history" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}><i className="bi bi-clock-history mr-2"></i> History ({completedConsultations.length})</button>
                        </nav>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <div className="flex-1"><div className="relative"><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" /><i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i></div></div>
                            <div className="flex items-center gap-4"><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"><option value="all">All Status</option><option value="scheduled">Scheduled</option><option value="in-progress">In Progress</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
                        </div>
                        {activeTab === "upcoming" && <ConsultationList consultations={upcomingConsultations} onStartConsultation={handleStartConsultation} onReschedule={handleReschedule} onCancel={handleCancel} onViewDetails={setSelectedConsultation} type="upcoming" />}
                        {activeTab === "in-progress" && <ConsultationList consultations={inProgressConsultations} onJoinCall={handleJoinCall} onEndCall={handleEndCall} onViewDetails={setSelectedConsultation} type="in-progress" />}
                        {activeTab === "history" && <ConsultationHistory consultations={completedConsultations} onViewDetails={setSelectedConsultation} onViewRecording={(c) => console.log(c.recordingUrl)} />}
                    </div>
                </div>
            </main>

            {showTestEquipment && <TestEquipmentModal onClose={() => setShowTestEquipment(false)} />}
            {showNewConsultationForm && <NewConsultationForm onClose={() => setShowNewConsultationForm(false)} onSubmit={handleCreateConsultation} />}
            {selectedConsultation && (<ConsultationDetailModal consultation={selectedConsultation} onClose={() => setSelectedConsultation(null)} onJoinCall={handleJoinCall} onStartConsultation={handleStartConsultation} />)}
        </>
    );
}

