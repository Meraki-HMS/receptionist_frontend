"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: "bi bi-speedometer2", label: "Dashboard" },
    { href: "/patients", icon: "bi bi-people-fill", label: "Patients" },
    { href: "/appointments", icon: "bi bi-calendar-check", label: "Appointments" },
    { href: "/beds", icon: "bi bi-hospital", label: "Bed Management" },
    { href: "/staff", icon: "bi bi-person-badge-fill", label: "Staff" },
    { href: "/reports", icon: "bi bi-bar-chart-line", label: "Reports" },
  ];

  return (
    <div className={`
      ${open ? "w-64" : "w-20"} 
      bg-white/90 backdrop-blur-sm border-r border-gray-200/60 h-screen 
      transition-all duration-300 flex flex-col sticky top-0
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200/60">
        <div className={`flex items-center gap-3 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Healthcare</h1>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>
         <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200 text-gray-500 hover:text-blue-600"
        >
          <i className="bi bi-list text-xl"></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? "bg-blue-50/80 border border-blue-200/60 text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-800"
                }
              `}
            >
              <div className={`
                p-2 rounded-lg transition-colors duration-200
                ${isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50"}
              `}>
                <i className={`${item.icon} text-lg`}></i>
              </div>
              
              {open && (
                <span className="font-medium flex-1">{item.label}</span>
              )}
              
              {isActive && open && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200/60">
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 ${open ? "opacity-100" : "opacity-0"}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">Receptionist</p>
            <p className="text-xs text-gray-500">Admin Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}