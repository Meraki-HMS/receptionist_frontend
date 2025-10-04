"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DoctorSidebar from "../../components/doctor/layout/DoctorSidebar";
import DoctorTopBar from "../../components/doctor/layout/DoctorTopBar";
import { useDoctorAuth } from "../../hooks/useDoctorAuth";
import { useMobileDetection } from "../../hooks/useMobileDetection";

export default function DoctorModuleLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useDoctorAuth();
  const { isMobile } = useMobileDetection();
  
  const initialModule = pathname.split('/')[2] || 'dashboard';
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeModule, setActiveModule] = useState(initialModule);

  // Central navigation logic
  useEffect(() => {
    // Handle main dashboard link
    if (activeModule === 'dashboard' && pathname !== '/doctor-dashboard') {
        router.push('/doctor-dashboard');
        return;
    }
    
    const newPath = `/doctor/${activeModule}`;
    if (pathname !== newPath && activeModule !== 'dashboard') {
      router.push(newPath);
    }
  }, [activeModule, router, pathname]);

  // Update sidebar active state if browser back/forward is used
  useEffect(() => {
    setActiveModule(initialModule);
  }, [initialModule]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Doctor Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push("/login");
    }
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className={` ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${isMobile ? "fixed inset-y-0 z-50 w-64" : "relative"} transition-transform duration-300 ease-in-out`}>
            <DoctorSidebar 
                open={sidebarOpen} 
                setOpen={setSidebarOpen} 
                activeModule={activeModule} 
                setActiveModule={setActiveModule} 
                user={user} 
            />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
            <DoctorTopBar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                user={user} 
                activeModule={activeModule} 
            />
            {/* Your individual page content will be rendered here */}
            {children}
        </div>
    </div>
  );
}
