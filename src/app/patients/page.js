"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

export default function PatientsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // default sample data (used only if localStorage empty)
  const defaultPatients = [
    {
      id: "P1001",
      name: "James Smith",
      phone: "9876543210",
      gender: "Male",
      dob: "1985-06-15",
      bloodGroup: "A+",
      email: "james@example.com",
    },
    {
      id: "P1002",
      name: "Sarah Lee",
      phone: "9123456780",
      gender: "Female",
      dob: "1992-03-22",
      bloodGroup: "B+",
      email: "sarah@example.com",
    },
    {
      id: "P1003",
      name: "Arjun Mehta",
      phone: "9988776655",
      gender: "Male",
      dob: "1999-12-05",
      bloodGroup: "O-",
      email: "arjun@example.com",
    },
  ];

  // state
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterBlood, setFilterBlood] = useState("");
  const [filterAge, setFilterAge] = useState("");

  // drawer state + animation
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerAnim, setDrawerAnim] = useState(""); // "in" | "out" | ""

  // add form
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

  // ---- Load from localStorage on mount (or initialize) ----
  useEffect(() => {
    const raw = localStorage.getItem("patients");
    if (raw) {
      try {
        setPatients(JSON.parse(raw));
      } catch {
        setPatients(defaultPatients);
        localStorage.setItem("patients", JSON.stringify(defaultPatients));
      }
    } else {
      setPatients(defaultPatients);
      localStorage.setItem("patients", JSON.stringify(defaultPatients));
    }
  }, []);

  // listen to our custom event (fires in same tab) so list updates immediately
  useEffect(() => {
    const handler = () => {
      const raw = localStorage.getItem("patients");
      setPatients(raw ? JSON.parse(raw) : []);
    };
    window.addEventListener("patientsUpdated", handler);
    return () => window.removeEventListener("patientsUpdated", handler);
  }, []);

  // also listen to real storage event (other tabs)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "patients") {
        setPatients(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ---- helpers ----
  const generatePatientId = () => {
    const max = patients.reduce((m, p) => {
      const n = parseInt((p.id || "P1000").replace(/\D/g, ""), 10) || 1000;
      return n > m ? n : m;
    }, 1000);
    return "P" + (max + 1);
  };

  const calcAge = (dob) => {
    if (!dob) return null;
    const diff = Date.now() - new Date(dob).getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  };

  // write + notify helper (always call this for persistence)
  const writePatients = (arr) => {
    localStorage.setItem("patients", JSON.stringify(arr));
    // in same tab, dispatch event so other components update
    window.dispatchEvent(new Event("patientsUpdated"));
    // also update our state
    setPatients(arr);
  };

  // ---- Drawer open/close (with small animation) ----
  const openDrawer = () => {
    setIsDrawerOpen(true);
    // allow DOM mount then animate
    setTimeout(() => setDrawerAnim("in"), 20);
  };
  const closeDrawer = () => {
    setDrawerAnim("out");
    setTimeout(() => {
      setIsDrawerOpen(false);
      setDrawerAnim("");
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
    }, 420);
  };

  // ---- Add patient (immediate localStorage write + notify) ----
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone || !newPatient.gender) {
      alert("Please fill required fields: Name, Phone, Gender.");
      return;
    }
    const withId = { ...newPatient, id: generatePatientId() };
    const updated = [...patients, withId];
    writePatients(updated); // immediate persistence and notify
    closeDrawer();
  };

  // ---- Delete patient (persist immediately) ----
  const handleDelete = (id) => {
    if (!confirm("Delete this patient?")) return;
    const updated = patients.filter((p) => p.id !== id);
    writePatients(updated);
  };

  // ---- Filtering & search ----
  const filtered = patients.filter((p) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.id || "").toLowerCase().includes(q) ||
      (p.phone || "").includes(q);

    const matchGender = !filterGender || p.gender === filterGender;
    const matchBlood = !filterBlood || p.bloodGroup === filterBlood;

    const age = calcAge(p.dob);
    let matchAge = true;
    if (filterAge) {
      if (filterAge === "child") matchAge = age !== null && age < 18;
      else if (filterAge === "adult") matchAge = age !== null && age >= 18 && age < 60;
      else if (filterAge === "senior") matchAge = age !== null && age >= 60;
    }

    return matchSearch && matchGender && matchBlood && matchAge;
  });

  // small inline icons
  const IconView = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5c5 0 9.27 3.11 11 7-1.73 3.89-6 7-11 7s-9.27-3.11-11-7c1.73-3.89 6-7 11-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );

  const IconEdit = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 21v-3l11-11 3 3L6 21H3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const IconDelete = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 6H8l-1 14h14L21 6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Patients</h1>
            <p className="text-sm text-slate-500">Manage walk-ins and registered patients</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                aria-label="Search patients"
                className="pl-10 pr-4 py-2 rounded-lg border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-72"
                placeholder="Search by name, ID or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
            </div>

            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="px-3 py-2 rounded-md border">
              <option value="">All Genders</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="px-3 py-2 rounded-md border">
              <option value="">All Ages</option>
              <option value="child">Child (&lt;18)</option>
              <option value="adult">Adult (18–59)</option>
              <option value="senior">Senior (60+)</option>
            </select>

            <select value={filterBlood} onChange={(e) => setFilterBlood(e.target.value)} className="px-3 py-2 rounded-md border">
              <option value="">All Blood</option>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
            </select>

            <button onClick={openDrawer} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-shadow shadow-sm">
              + Add Patient
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Blood</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.email || "-"}</div>
                  </td>
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">{p.gender}</td>
                  <td className="p-3">{p.bloodGroup || "-"}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      title="View"
                      onClick={() => router.push(`/patients/${p.id}?mode=view`)}
                      className="px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition"
                    >
                      <IconView />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => router.push(`/patients/${p.id}?mode=edit`)}
                      className="px-3 py-1 rounded-md bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
                    >
                      <IconEdit />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition"
                    >
                      <IconDelete />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={6}>
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Drawer (overlay + right panel) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeDrawer} />

          {/* panel */}
          <aside
            className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 overflow-y-auto transform ${
              drawerAnim === "in" ? "animate-bounceIn" : drawerAnim === "out" ? "animate-bounceOut" : ""
            }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Add New Patient</h3>
              <button className="text-slate-500" onClick={closeDrawer} aria-label="Close">✕</button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3">
              <div>
                <label className="text-sm block mb-1">Full Name</label>
                <input required className="w-full border rounded px-3 py-2" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
              </div>

              <div>
                <label className="text-sm block mb-1">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} />
              </div>

              <div>
                <label className="text-sm block mb-1">Phone</label>
                <input required className="w-full border rounded px-3 py-2" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} />
              </div>

              <div>
                <label className="text-sm block mb-1">Date of Birth</label>
                <input type="date" className="w-full border rounded px-3 py-2" value={newPatient.dob} onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })} />
              </div>

              <div>
                <label className="text-sm block mb-1">Gender</label>
                <select required className="w-full border rounded px-3 py-2" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm block mb-1">Address</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} value={newPatient.address} onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} />
              </div>

              <div>
                <label className="text-sm block mb-1">Blood Group</label>
                <select className="w-full border rounded px-3 py-2" value={newPatient.bloodGroup} onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}>
                  <option value="">Select</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div>
                <label className="text-sm block mb-1">Allergies</label>
                <input className="w-full border rounded px-3 py-2" value={newPatient.allergies} onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })} />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeDrawer} className="px-4 py-2 border rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes bounceIn {
          0% { transform: translateX(100%); opacity: 0; }
          60% { transform: translateX(-10px); opacity: 1; }
          80% { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
        @keyframes bounceOut {
          0% { transform: translateX(0); opacity: 1; }
          20% { transform: translateX(-6px); }
          100% { transform: translateX(110%); opacity: 0; }
        }
        .animate-bounceIn { animation: bounceIn 420ms cubic-bezier(.2,.9,.3,1) forwards; }
        .animate-bounceOut { animation: bounceOut 360ms cubic-bezier(.2,.9,.3,1) forwards; }
      `}</style>
    </div>
  );
}
