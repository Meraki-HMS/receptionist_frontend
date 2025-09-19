"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

/* Utilities */
const generatePatientId = (existing = []) => {
  // create an id not present in existing
  let id;
  do {
    id = "P" + Math.floor(1000 + Math.random() * 9000);
  } while (existing.some((p) => p.id === id));
  return id;
};

export default function PatientsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  // Drawer (Add patient) state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false);

  // Filters modal
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    gender: "all",
    age: "all",
    status: "all",
  });

  // New patient form
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
  });

  // --- Load patients, normalize missing 'active' field ---
  useEffect(() => {
    const raw = localStorage.getItem("patients");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // normalize: ensure active present and age calculated if missing
        const normalized = parsed.map((p) => {
          const copy = { ...p };
          if (typeof copy.active === "undefined") copy.active = true;
          // ensure numeric age if present; else calc from dob
          if ((!copy.age || copy.age === "") && copy.dob) {
            const today = new Date();
            const bd = new Date(copy.dob);
            let age = today.getFullYear() - bd.getFullYear();
            const m = today.getMonth() - bd.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
            copy.age = age;
          }
          return copy;
        });
        setPatients(normalized);
        // save back normalized
        localStorage.setItem("patients", JSON.stringify(normalized));
      } catch (err) {
        console.error("Failed parsing patients:", err);
        setPatients([]);
      }
    } else {
      // default demo data (ensures active = true)
      const demo = [
        { id: "P1001", name: "Ravindra Shardul", phone: "9322078972", gender: "Male", dob: "1990-01-01", age: 34, email: "", address: "", active: true },
        { id: "P1002", name: "okok", phone: "857875585", gender: "Male", dob: "1992-02-02", age: 32, email: "", address: "", active: true },
      ];
      setPatients(demo);
      localStorage.setItem("patients", JSON.stringify(demo));
    }
  }, []);

  // Persist helper (and notify)
  const persistPatients = (arr) => {
    setPatients(arr);
    localStorage.setItem("patients", JSON.stringify(arr));
    // notify other components/pages
    window.dispatchEvent(new Event("patientsUpdated"));
  };

  // --- Drawer open/close with small animation hooks ---
  const openDrawer = () => {
    setIsDrawerOpen(true);
    // start animation slightly after mount
    setTimeout(() => setDrawerAnimating(true), 10);
  };
  const closeDrawer = () => {
    setDrawerAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setNewPatient({
        name: "",
        email: "",
        phone: "",
        dob: "",
        age: "",
        gender: "",
        address: "",
      });
    }, 300);
  };

  // DOB change -> auto-calc age
  const handleDobChange = (val) => {
    const today = new Date();
    const birthDate = new Date(val);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    setNewPatient((s) => ({ ...s, dob: val, age }));
  };

  // Validation for add form
  const validateAdd = () => {
    if (!newPatient.name || newPatient.name.trim().length === 0) return "Full name is required.";
    if (!newPatient.phone || !/^\d{7,15}$/.test(newPatient.phone.trim())) return "Enter a valid phone number (digits only).";
    if (!newPatient.dob) return "Date of birth is required.";
    if (!newPatient.gender) return "Please select gender.";
    return null;
  };

  // Add patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const err = validateAdd();
    if (err) {
      alert(err);
      return;
    }
    const id = generatePatientId(patients);
    const toAdd = { ...newPatient, id, active: true };
    const updated = [...patients, toAdd];
    persistPatients(updated);
    closeDrawer();
  };

  // Soft-remove: set active:false
  const handleRemove = (id) => {
    if (!confirm("Remove patient from active list? (Data will be retained)")) return;
    const updated = patients.map((p) => (p.id === id ? { ...p, active: false } : p));
    persistPatients(updated);
  };

  // Filtered list
  const filtered = patients.filter((p) => {
    // status filter
    if (filters.status === "active" && !p.active) return false;
    if (filters.status === "removed" && p.active) return false;

    // search
    if (search) {
      const q = search.toLowerCase();
      const match = (p.name || "").toLowerCase().includes(q) || (p.id || "").toLowerCase().includes(q) || (p.phone || "").includes(q);
      if (!match) return false;
    }

    // gender
    if (filters.gender !== "all" && p.gender !== filters.gender) return false;

    // age groups
    if (filters.age !== "all") {
      if (filters.age === "child" && !(p.age !== undefined && p.age < 13)) return false;
      if (filters.age === "adult" && !(p.age !== undefined && p.age >= 13 && p.age < 60)) return false;
      if (filters.age === "senior" && !(p.age !== undefined && p.age >= 60)) return false;
    }

    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setFilters({ gender: "all", age: "all", status: "all" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Patients List</h1>
            <p className="text-sm text-slate-500">Manage walk-ins and registered patients</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID or phone..."
                className="pl-10 pr-4 py-2 rounded-lg border-2 border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
            </div>

            <button onClick={() => setIsFilterOpen(true)} className="px-3 py-2 bg-slate-100 rounded-md hover:bg-slate-200">Filters</button>

            <button onClick={openDrawer} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + Add Patient
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Patient ID</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className={`border-b ${p.active ? "hover:bg-slate-50" : "bg-slate-50"}`}>
                  <td className={`p-3 ${p.active ? "text-slate-900" : "text-gray-400"}`}>{p.name}</td>
                  <td className={`p-3 ${p.active ? "text-slate-900" : "text-gray-400"}`}>{p.id}</td>
                  <td className={`p-3 ${p.active ? "text-slate-900" : "text-gray-400"}`}>{p.phone}</td>
                  <td className={`p-3 ${p.active ? "text-slate-900" : "text-gray-400"}`}>{p.gender}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => router.push(`/patients/${p.id}?mode=view`)}
                      className="px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100"
                    >
                      View
                    </button>

                    {p.active && (
                      <button
                        onClick={() => handleRemove(p.id)}
                        className="px-3 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={5}>
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Drawer: Add patient (overlay + panel) */}
      {isDrawerOpen && (
        <>
          {/* overlay: blurred background, click to close */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* panel */}
          <aside
            className={`fixed right-0 top-0 z-50 h-full w-[420px] bg-white shadow-2xl p-6 transform transition-transform duration-300 ${
              drawerAnimating ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Add New Patient</h3>
              <button onClick={closeDrawer} className="text-slate-500">✕</button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input className="w-full border rounded px-3 py-2" value={newPatient.name} onChange={(e) => setNewPatient((s) => ({ ...s, name: e.target.value }))} />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" value={newPatient.email} onChange={(e) => setNewPatient((s) => ({ ...s, email: e.target.value }))} />
              </div>

              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input className="w-full border rounded px-3 py-2" value={newPatient.phone} onChange={(e) => setNewPatient((s) => ({ ...s, phone: e.target.value }))} />
              </div>

              <div>
                <label className="block text-sm font-medium">Date of Birth</label>
                <input type="date" className="w-full border rounded px-3 py-2" value={newPatient.dob} onChange={(e) => handleDobChange(e.target.value)} />
                {newPatient.age !== "" && newPatient.age !== undefined && (
                  <p className="text-sm text-slate-600 mt-1">Age: {newPatient.age} years</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select className="w-full border rounded px-3 py-2" value={newPatient.gender} onChange={(e) => setNewPatient((s) => ({ ...s, gender: e.target.value }))}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} value={newPatient.address} onChange={(e) => setNewPatient((s) => ({ ...s, address: e.target.value }))} />
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <button type="button" onClick={closeDrawer} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
              </div>
            </form>
          </aside>
        </>
      )}

      {/* Filters Modal */}
      {isFilterOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />

          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] bg-white rounded-xl p-6 shadow-lg transform transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4">Filter Patients</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm">Gender</label>
                <select value={filters.gender} onChange={(e) => setFilters((s) => ({ ...s, gender: e.target.value }))} className="w-full border rounded px-3 py-2">
                  <option value="all">All Genders</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Age Group</label>
                <select value={filters.age} onChange={(e) => setFilters((s) => ({ ...s, age: e.target.value }))} className="w-full border rounded px-3 py-2">
                  <option value="all">All Ages</option>
                  <option value="child">Child (&lt;13)</option>
                  <option value="adult">Adult (13–59)</option>
                  <option value="senior">Senior (60+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm">Status</label>
                <select value={filters.status} onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))} className="w-full border rounded px-3 py-2">
                  <option value="all">All Patients</option>
                  <option value="active">Active Only</option>
                  <option value="removed">Removed Only</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button onClick={clearFilters} className="px-4 py-2 border rounded-md">Clear All</button>
              <div className="flex gap-2">
                <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 border rounded-md">Close</button>
                <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md">Apply</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
