"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function PatientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Patient data
  const [patients, setPatients] = useState([
    { id: "P1001", name: "James Smith", phone: "9876543210", gender: "Male" },
    { id: "P1002", name: "Sarah Lee", phone: "9123456780", gender: "Female" },
    { id: "P1003", name: "Arjun Mehta", phone: "9988776655", gender: "Male" },
  ]);

  const [search, setSearch] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    bloodGroup: "",
    allergies: "",
  });

  // Generate unique ID
  const generatePatientId = () => "P" + Math.floor(1000 + Math.random() * 9000);

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone || !newPatient.gender) {
      alert("Please fill in all required fields");
      return;
    }

    const patientWithId = {
      ...newPatient,
      id: generatePatientId(),
    };

    setPatients([...patients, patientWithId]);
    setIsDrawerOpen(false);

    // Reset form
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      bloodGroup: "",
      allergies: "",
    });
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-700">Patients List</h1>

          <div className="flex gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filters */}
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <i className="bi bi-funnel"></i> Filters
            </button>

            {/* Add Patient */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add Patient
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3">Patient Name</th>
                <th className="px-6 py-3">Patient ID</th>
                <th className="px-6 py-3">Phone Number</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{patient.name}</td>
                  <td className="px-6 py-3">{patient.id}</td>
                  <td className="px-6 py-3">{patient.phone}</td>
                  <td className="px-6 py-3">{patient.gender}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                      View
                    </button>
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Drawer (fixed to viewport, blur background, bounce in) */}
      <div
        className={`fixed inset-0 z-50 transition ${
          isDrawerOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[400px] bg-white shadow-xl p-6 overflow-y-auto transform transition-transform duration-500 ease-in-out ${
            isDrawerOpen
              ? "translate-x-0 animate-[bounceIn_0.6s_ease]"
              : "translate-x-full"
          }`}
        >
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Add New Patient
          </h2>

          <form onSubmit={handleAddPatient} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                value={newPatient.dob}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, dob: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, gender: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium">Address</label>
              <textarea
                value={newPatient.address}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, address: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <select
                value={newPatient.bloodGroup}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, bloodGroup: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
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
                value={newPatient.allergies}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, allergies: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom keyframes */}
      <style jsx global>{`
        @keyframes bounceIn {
          0% {
            transform: translateX(100%);
          }
          60% {
            transform: translateX(-10px);
          }
          80% {
            transform: translateX(5px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
