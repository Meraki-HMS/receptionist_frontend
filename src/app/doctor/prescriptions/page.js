"use client";
import { useEffect, useState } from "react";
// NOTE: Layout-related imports are removed.
import PrescriptionForm from "../../../components/doctor/prescriptions/PrescriptionForm";
import PrescriptionHistory from "../../../components/doctor/prescriptions/PrescriptionHistory";

// Mock data for prescriptions
const prescriptionsData = [
  {
    id: 1,
    prescriptionId: "RX-001",
    patientId: "P001",
    patientName: "John Smith",
    date: "2024-01-15",
    status: "active",
    diagnosis: "Hypertension Stage 2",
    medicines: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning"
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take at bedtime"
      }
    ],
    tests: ["Blood Pressure Monitoring", "Lipid Profile"],
    advice: "Reduce salt intake, exercise regularly",
    followUpDate: "2024-02-15"
  },
  {
    id: 2,
    prescriptionId: "RX-002",
    patientId: "P002",
    patientName: "Maria Garcia",
    date: "2024-01-14",
    status: "completed",
    diagnosis: "Asthma with allergic rhinitis",
    medicines: [
      {
        name: "Salbutamol Inhaler",
        dosage: "100mcg",
        frequency: "As needed",
        duration: "90 days",
        instructions: "Use during asthma attacks"
      },
      {
        name: "Fluticasone Nasal Spray",
        dosage: "50mcg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "One spray each nostril"
      }
    ],
    tests: ["Pulmonary Function Test"],
    advice: "Avoid allergens, use humidifier",
    followUpDate: "2024-02-14"
  }
];

export default function PrescriptionsPage() {
  // NOTE: Layout-related state and hooks are removed.
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("history"); // history, new
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPrescriptions(prescriptionsData);
  }, []);

  const handleNewPrescription = (prescriptionData) => {
    const newPrescription = {
      id: prescriptions.length + 1,
      prescriptionId: `RX-${String(prescriptions.length + 1).padStart(3, '0')}`,
      ...prescriptionData,
      date: new Date().toISOString().split('T')[0],
      status: "active"
    };
    setPrescriptions(prev => [newPrescription, ...prev]);
    setActiveTab("history");
    
    // Show success message
    console.log("Prescription created:", newPrescription);
  };

  const handlePrintPrescription = (prescription) => {
    console.log("Printing prescription:", prescription);
    // PDF generation logic will be implemented
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // NOTE: Loading and auth checks are removed as they are handled by the layout.

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Prescriptions</h1>
              <p className="text-gray-600 mt-2">
                Create and manage patient prescriptions with medicine database
              </p>
            </div>
            <button 
              onClick={() => setActiveTab("new")}
              className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <i className="bi bi-plus-lg"></i>
              New Prescription
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{prescriptions.length}</div>
            <div className="text-sm text-gray-500">Total Prescriptions</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {prescriptions.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {prescriptions.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {prescriptions.reduce((total, p) => total + p.medicines.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Medicines Prescribed</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "history"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-clock-history mr-2"></i>
                Prescription History
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "new"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-file-medical mr-2"></i>
                New Prescription
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "history" && (
              <PrescriptionHistory
                prescriptions={filteredPrescriptions}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onView={setSelectedPrescription}
                onPrint={handlePrintPrescription}
              />
            )}

            {activeTab === "new" && (
              <PrescriptionForm
                onSubmit={handleNewPrescription}
                onCancel={() => setActiveTab("history")}
              />
            )}
          </div>
        </div>
      </main>

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <PrescriptionDetailModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          onPrint={handlePrintPrescription}
        />
      )}
    </>
  );
}

// Prescription Detail Modal Component
function PrescriptionDetailModal({ prescription, onClose, onPrint }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Prescription Details</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onPrint(prescription)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <i className="bi bi-printer"></i>
                Print
              </button>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Patient Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{prescription.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium">{prescription.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(prescription.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Prescription Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prescription ID:</span>
                  <span className="font-medium">{prescription.prescriptionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    prescription.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {prescription.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Follow-up:</span>
                  <span className="font-medium">
                    {prescription.followUpDate 
                      ? new Date(prescription.followUpDate).toLocaleDateString()
                      : 'Not scheduled'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Diagnosis</h3>
            <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg">
              {prescription.diagnosis}
            </div>
          </div>

          {/* Medicines */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Medicines</h3>
            <div className="space-y-3">
              {prescription.medicines.map((medicine, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {medicine.dosage}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Frequency:</span> {medicine.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {medicine.duration}
                    </div>
                    <div className="md:col-span-3">
                      <span className="font-medium">Instructions:</span> {medicine.instructions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tests and Advice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tests */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Recommended Tests</h3>
              <div className="space-y-2">
                {prescription.tests.map((test, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="bi bi-check-circle text-green-500"></i>
                    {test}
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Advice */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Medical Advice</h3>
              <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                {prescription.advice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
