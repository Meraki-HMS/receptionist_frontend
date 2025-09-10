"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";

export default function PatientProfile() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "view"; // default is "view"

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patient, setPatient] = useState(null);

  // ✅ Load patient from localStorage
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const found = storedPatients.find((p) => p.id === id);
    if (found) {
      setPatient(found);
    }
  }, [id]);

  const handleChange = (e) => {
    if (mode === "view") return; // block editing in view mode
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSave = () => {
    if (!patient) return;

    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const updatedPatients = storedPatients.map((p) =>
      p.id === patient.id ? patient : p
    );
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    alert("Patient details updated ✅");
    router.push("/patients");
  };

  if (!patient) {
    return (
      <div className="h-screen flex items-center justify-center text-blue-600">
        Loading patient...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-700">
            Patient Profile - {patient.name}
          </h1>
          <button
            onClick={() => router.push("/patients")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            ← Back to Patients
          </button>
        </div>

        {/* Patient Details */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={patient.name}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={patient.email || ""}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={patient.phone}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={patient.dob || ""}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={patient.gender}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium">Address</label>
              <textarea
                name="address"
                value={patient.address || ""}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <select
                name="bloodGroup"
                value={patient.bloodGroup || ""}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={patient.allergies || ""}
                onChange={handleChange}
                disabled={mode === "view"}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Save Button */}
            {mode === "edit" && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
