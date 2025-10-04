"use client";
import { useState } from "react";
import MedicineSearch from "./MedicineSearch";

const initialFormData = {
  patientId: "",
  patientName: "",
  diagnosis: "",
  medicines: [],
  tests: [],
  advice: "",
  followUpDate: ""
};

const commonTests = [
  "Complete Blood Count (CBC)",
  "Lipid Profile",
  "Liver Function Test",
  "Kidney Function Test",
  "Thyroid Profile",
  "Blood Glucose Test",
  "Urine Analysis",
  "ECG",
  "X-Ray Chest",
  "Ultrasound Abdomen"
];

export default function PrescriptionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentMedicine, setCurrentMedicine] = useState({
    name: "",
    dosage: "",
    frequency: "Once daily",
    duration: "",
    instructions: ""
  });
  const [errors, setErrors] = useState({});

  const frequencyOptions = [
    "Once daily",
    "Twice daily",
    "Three times daily",
    "Four times daily",
    "As needed",
    "Before meals",
    "After meals",
    "At bedtime"
  ];

  const durationOptions = [
    "3 days",
    "5 days",
    "7 days",
    "10 days",
    "14 days",
    "21 days",
    "30 days",
    "60 days",
    "90 days",
    "As directed"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) newErrors.patientId = "Patient ID is required";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.diagnosis.trim()) newErrors.diagnosis = "Diagnosis is required";
    if (formData.medicines.length === 0) newErrors.medicines = "At least one medicine is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMedicine = () => {
    if (!currentMedicine.name || !currentMedicine.dosage || !currentMedicine.duration) {
      alert("Please fill all medicine fields");
      return;
    }

    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { ...currentMedicine }]
    }));

    setCurrentMedicine({
      name: "",
      dosage: "",
      frequency: "Once daily",
      duration: "",
      instructions: ""
    });
  };

  const handleRemoveMedicine = (index) => {
    setFormData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleTestToggle = (test) => {
    setFormData(prev => ({
      ...prev,
      tests: prev.tests.includes(test)
        ? prev.tests.filter(t => t !== test)
        : [...prev.tests, test]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit(formData);
    setFormData(initialFormData);
  };

  const handleMedicineSelect = (medicine) => {
    setCurrentMedicine(prev => ({
      ...prev,
      name: medicine.name,
      dosage: medicine.dosage || ""
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient ID *
              </label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.patientId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient ID"
              />
              {errors.patientId && (
                <p className="text-red-600 text-sm mt-1">{errors.patientId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.patientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient name"
              />
              {errors.patientName && (
                <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnosis</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis *
            </label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.diagnosis ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter diagnosis details..."
            />
            {errors.diagnosis && (
              <p className="text-red-600 text-sm mt-1">{errors.diagnosis}</p>
            )}
          </div>
        </div>

        {/* Medicines */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medicines</h3>
          
          {errors.medicines && (
            <p className="text-red-600 text-sm mb-4">Please add at least one medicine</p>
          )}

          {/* Medicine Search */}
          <div className="mb-6">
            <MedicineSearch onMedicineSelect={handleMedicineSelect} />
          </div>

          {/* Medicine Form */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name *
              </label>
              <input
                type="text"
                value={currentMedicine.name}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Medicine name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage *
              </label>
              <input
                type="text"
                value={currentMedicine.dosage}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 10mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select
                value={currentMedicine.frequency}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {frequencyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <select
                value={currentMedicine.duration}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select duration</option>
                {durationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            <input
              type="text"
              value={currentMedicine.instructions}
              onChange={(e) => setCurrentMedicine(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Special instructions"
            />
          </div>

          {/* Add Medicine Button */}
          <button
            type="button"
            onClick={handleAddMedicine}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            Add Medicine
          </button>

          {/* Medicine List */}
          {formData.medicines.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Added Medicines</h4>
              <div className="space-y-3">
                {formData.medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800">{medicine.name}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                          {medicine.dosage}
                        </span>
                        <span className="text-sm text-gray-600">{medicine.frequency}</span>
                        <span className="text-sm text-gray-600">{medicine.duration}</span>
                      </div>
                      {medicine.instructions && (
                        <p className="text-sm text-gray-500 mt-1">{medicine.instructions}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Tests</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonTests.map((test) => (
              <label key={test} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.tests.includes(test)}
                  onChange={() => handleTestToggle(test)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{test}</span>
              </label>
            ))}
          </div>

          {/* Custom Test Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add custom test..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const test = e.target.value.trim();
                  if (test && !formData.tests.includes(test)) {
                    handleTestToggle(test);
                    e.target.value = '';
                  }
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Medical Advice and Follow-up */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Advice
              </label>
              <textarea
                value={formData.advice}
                onChange={(e) => setFormData(prev => ({ ...prev, advice: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Lifestyle advice, precautions, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Follow-up Date
              </label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData(prev => ({ ...prev, followUpDate: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Notes
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Notes for next visit"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-file-medical"></i>
            Create Prescription
          </button>
        </div>
      </form>
    </div>
  );
}