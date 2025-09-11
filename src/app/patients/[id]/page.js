"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";

export default function PatientProfile() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeQuery = searchParams?.get("mode") || "view";
  const id = params?.id;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patient, setPatient] = useState(null);
  const [editData, setEditData] = useState(null);
  const [mode, setMode] = useState(modeQuery);

  // load patient on mount (from localStorage)
  useEffect(() => {
    const raw = localStorage.getItem("patients");
    const arr = raw ? JSON.parse(raw) : [];
    const found = arr.find((p) => p.id === id);
    if (!found) {
      router.push("/patients");
      return;
    }
    setPatient(found);
    setEditData({ ...found });
  }, [id, router]);

  useEffect(() => {
    setMode(modeQuery);
  }, [modeQuery]);

  // input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // helper to write and notify
  const writePatients = (arr) => {
    localStorage.setItem("patients", JSON.stringify(arr));
    window.dispatchEvent(new Event("patientsUpdated"));
  };

  // Save edits (immediate write + notify)
  const handleSave = () => {
    const raw = localStorage.getItem("patients");
    const arr = raw ? JSON.parse(raw) : [];
    const updated = arr.map((p) => (p.id === id ? editData : p));
    writePatients(updated);
    // keep UI consistent then go back to list
    router.push("/patients");
  };

  // Delete
  const handleDelete = () => {
    if (!confirm("Delete this patient?")) return;
    const raw = localStorage.getItem("patients");
    const arr = raw ? JSON.parse(raw) : [];
    const updated = arr.filter((p) => p.id !== id);
    writePatients(updated);
    router.push("/patients");
  };

  if (!patient) {
    return (
      <div className="flex h-screen">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-slate-500">Loading patient...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Patient Profile</h1>
              <p className="text-sm text-slate-500">{patient.name}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => router.push("/patients")} className="px-3 py-2 border rounded-md">Back</button>

              {mode === "view" ? (
                <>
                  <button onClick={() => router.push(`/patients/${id}?mode=edit`)} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md">Edit</button>
                  <button onClick={handleDelete} className="px-3 py-2 bg-red-50 text-red-700 rounded-md">Delete</button>
                </>
              ) : (
                <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-md">Save</button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            {mode === "view" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-slate-700">{patient.name}</p>

                  <p className="text-sm font-medium mt-4">Email</p>
                  <p className="text-slate-700">{patient.email || "-"}</p>

                  <p className="text-sm font-medium mt-4">Phone</p>
                  <p className="text-slate-700">{patient.phone}</p>

                  <p className="text-sm font-medium mt-4">DOB</p>
                  <p className="text-slate-700">{patient.dob || "-"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Gender</p>
                  <p className="text-slate-700">{patient.gender || "-"}</p>

                  <p className="text-sm font-medium mt-4">Address</p>
                  <p className="text-slate-700">{patient.address || "-"}</p>

                  <p className="text-sm font-medium mt-4">Blood Group</p>
                  <p className="text-slate-700">{patient.bloodGroup || "-"}</p>

                  <p className="text-sm font-medium mt-4">Allergies</p>
                  <p className="text-slate-700">{patient.allergies || "-"}</p>
                </div>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input name="name" className="w-full border rounded px-3 py-2" value={editData.name} onChange={handleChange} />

                  <label className="block text-sm font-medium mt-3">Email</label>
                  <input name="email" type="email" className="w-full border rounded px-3 py-2" value={editData.email || ""} onChange={handleChange} />

                  <label className="block text-sm font-medium mt-3">Phone</label>
                  <input name="phone" className="w-full border rounded px-3 py-2" value={editData.phone || ""} onChange={handleChange} />

                  <label className="block text-sm font-medium mt-3">Date of Birth</label>
                  <input name="dob" type="date" className="w-full border rounded px-3 py-2" value={editData.dob || ""} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium">Gender</label>
                  <select name="gender" className="w-full border rounded px-3 py-2" value={editData.gender || ""} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>

                  <label className="block text-sm font-medium mt-3">Address</label>
                  <textarea name="address" className="w-full border rounded px-3 py-2" value={editData.address || ""} onChange={handleChange} />

                  <label className="block text-sm font-medium mt-3">Blood Group</label>
                  <select name="bloodGroup" className="w-full border rounded px-3 py-2" value={editData.bloodGroup || ""} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                  </select>

                  <label className="block text-sm font-medium mt-3">Allergies</label>
                  <input name="allergies" className="w-full border rounded px-3 py-2" value={editData.allergies || ""} onChange={handleChange} />
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
