"use client";
import { Home, Calendar, Users, Bed, FileText, User } from "lucide-react";
import NavItem from "./NavItem";

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`${open ? "w-64" : "w-20"} bg-white shadow-md transition-all duration-300 h-screen`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-bold text-blue-600">
          {open ? "Healthcare Manager" : "HM"}
        </h1>
        <button className="text-gray-500" onClick={() => setOpen(!open)}>
          ≡
        </button>
      </div>
      <nav className="p-4 space-y-3">
        <NavItem icon={<Home size={20} />} label="Dashboard" open={open} />
        <NavItem icon={<Calendar size={20} />} label="Schedule" open={open} />
        <NavItem icon={<Users size={20} />} label="Patients" open={open} />
        <NavItem icon={<Bed size={20} />} label="Bed Management" open={open} />
        <NavItem icon={<User size={20} />} label="Staff" open={open} />
        <NavItem icon={<FileText size={20} />} label="Reports" open={open} />
      </nav>
    </aside>
  );
}

<div
  className="flex items-center space-x-3 p-2 rounded-md hover:bg-red-100 cursor-pointer mt-6 text-red-600"
  onClick={() => {
    localStorage.removeItem("receptionistLoggedIn");
    window.location.href = "/login";
  }}
>
  🚪 <span>Logout</span>
</div>
