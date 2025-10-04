"use client";
import { useState } from "react";

export default function ConsultationNotes({ consultation, onSave, onClose }) {
  const [notes, setNotes] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    prescriptions: [],
    recommendations: "",
    followUpDate: ""
  });

  const [activeSection, setActiveSection] = useState("subjective");

  const sections = [
    { id: "subjective", label: "Subjective", icon: "bi-person", description: "Patient's complaints and history" },
    { id: "objective", label: "Objective", icon: "bi-clipboard-data", description: "Clinical findings and observations" },
    { id: "assessment", label: "Assessment", icon: "bi-graph-up", description: "Diagnosis and evaluation" },
    { id: "plan", label: "Plan", icon: "bi-check-circle", description: "Treatment plan and next steps" }
  ];

  const commonPrescriptions = [
    { name: "Paracetamol", dosage: "500mg", frequency: "Every 6 hours", duration: "5 days" },
    { name: "Ibuprofen", dosage: "400mg", frequency: "Every 8 hours", duration: "3 days" },
    { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" }
  ];

  const handleAddPrescription = (prescription) => {
    setNotes(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { ...prescription }]
    }));
  };

  const handleRemovePrescription = (index) => {
    setNotes(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Consultation Notes</h2>
              <p className="text-gray-600">
                for {consultation.patientName} - {consultation.condition}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Save Notes
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-4">SOAP Notes</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`bi ${section.icon} text-lg`}></i>
                        <div className="flex-1">
                          <div className="font-medium">{section.label}</div>
                          <div className="text-xs opacity-75">{section.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <i className="bi bi-file-medical mr-2"></i>
                      Create Prescription
                    </button>
                    <button className="w-full text-left p-2 text-sm text-green-600 hover:bg-green-50 rounded transition-colors">
                      <i className="bi bi-clipboard-plus mr-2"></i>
                      Request Lab Tests
                    </button>
                    <button className="w-full text-left p-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      <i className="bi bi-calendar-plus mr-2"></i>
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Subjective Section */}
                {activeSection === "subjective" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Subjective Findings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chief Complaint
                        </label>
                        <textarea
                          value={notes.subjective}
                          onChange={(e) => setNotes(prev => ({ ...prev, subjective: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Describe the patient's main complaints, symptoms, and history..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Symptoms Duration
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="e.g., 3 days, 2 weeks..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Severity (1-10)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Scale 1-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Objective Section */}
                {activeSection === "objective" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Objective Findings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinical Observations
                        </label>
                        <textarea
                          value={notes.objective}
                          onChange={(e) => setNotes(prev => ({ ...prev, objective: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Record vital signs, physical exam findings, and clinical observations..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">BP</label>
                          <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-300" placeholder="120/80" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">HR</label>
                          <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-300" placeholder="72 bpm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Temp</label>
                          <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-300" placeholder="98.6°F" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">SpO2</label>
                          <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-300" placeholder="98%" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assessment Section */}
                {activeSection === "assessment" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment & Diagnosis</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Diagnosis
                        </label>
                        <input
                          type="text"
                          value={notes.assessment}
                          onChange={(e) => setNotes(prev => ({ ...prev, assessment: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter primary diagnosis..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Differential Diagnosis
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="List possible alternative diagnoses..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinical Impression
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Overall clinical impression and reasoning..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan Section */}
                {activeSection === "plan" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Treatment Plan</h3>
                    <div className="space-y-6">
                      {/* Prescriptions */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-800">Medications</h4>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            + Add Custom Medication
                          </button>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          {commonPrescriptions.map((med, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-800">{med.name} {med.dosage}</div>
                                <div className="text-sm text-gray-600">{med.frequency} for {med.duration}</div>
                              </div>
                              <button
                                onClick={() => handleAddPrescription(med)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <i className="bi bi-plus-circle"></i>
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Selected Prescriptions */}
                        {notes.prescriptions.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Selected Medications</h5>
                            <div className="space-y-2">
                              {notes.prescriptions.map((prescription, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <div>
                                    <div className="font-medium text-gray-800">{prescription.name} {prescription.dosage}</div>
                                    <div className="text-sm text-gray-600">{prescription.frequency} for {prescription.duration}</div>
                                  </div>
                                  <button
                                    onClick={() => handleRemovePrescription(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Recommendations */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recommendations & Lifestyle Advice
                        </label>
                        <textarea
                          value={notes.recommendations}
                          onChange={(e) => setNotes(prev => ({ ...prev, recommendations: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Diet, exercise, lifestyle modifications..."
                        />
                      </div>

                      {/* Follow-up */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Follow-up Date
                        </label>
                        <input
                          type="date"
                          value={notes.followUpDate}
                          onChange={(e) => setNotes(prev => ({ ...prev, followUpDate: e.target.value }))}
                          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}