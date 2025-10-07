"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [hospitalId, setHospitalId] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e = {};
    if (!hospitalId.trim()) e.hospitalId = "Hospital ID is required";
    if (!role) e.role = "Please select a role";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = {
      hospitalId: hospitalId.trim(),
      role,
      email: email.trim(),
      loggedAt: new Date().toISOString(),
    };
    
    // Store user data based on role
    localStorage.setItem(`${role}LoggedIn`, "true");
    localStorage.setItem("hmsUser", JSON.stringify(user));
    
    setIsLoading(false);
    
    // Redirect based on role
    if (role === "doctor") {
      router.push("/doctor/dashboard");
    } else if (role === "receptionist") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const roles = [
    { value: "receptionist", label: "Receptionist", color: "from-blue-500 to-blue-600" },
    { value: "doctor", label: "Doctor", color: "from-green-500 to-green-600" },
    { value: "nurse", label: "Nurse", color: "from-purple-500 to-purple-600" },
    { value: "admin", label: "Administrator", color: "from-orange-500 to-orange-600" }
  ];

  const getSelectedRole = () => {
    return roles.find(r => r.value === role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10">
        
        {/* Left: Brand Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 text-white overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold">Meraki HMS</span>
                  <div className="text-blue-200 text-sm">Healthcare Management System</div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Welcome to{" "}
                  <span className="text-blue-200">
                    Smart Healthcare
                  </span>
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                  Experience the future of hospital management with our secure, intuitive platform.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Secure</div>
                    <div className="text-blue-200 text-xs">256-bit Encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Fast</div>
                    <div className="text-blue-200 text-xs">Real-time Updates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <div className="flex items-center justify-between text-blue-200">
                <div className="flex-1 h-px bg-blue-500/30"></div>
                <span className="px-4 text-sm font-medium">Trusted by Leading Hospitals</span>
                <div className="flex-1 h-px bg-blue-500/30"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">500+</div>
                  <div className="text-xs text-blue-200">Daily Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-blue-200">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">A+</div>
                  <div className="text-xs text-blue-200">Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-8 lg:p-12 relative">
          <div className="relative z-10 max-w-md mx-auto w-full">
            {/* Form Header */}
            <div className="text-center lg:text-left mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Login Portal
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Access Your Account
              </h2>
              <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hospital ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hospital ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
                    onFocus={() => setActiveField('hospitalId')}
                    onBlur={() => setActiveField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                      errors.hospitalId 
                        ? "border-red-500 bg-red-50" 
                        : activeField === 'hospitalId'
                        ? "border-blue-500 bg-white shadow-lg"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    }`}
                    placeholder="HOSP-001"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                {errors.hospitalId && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.hospitalId}
                  </p>
                )}
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Role
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      errors.role 
                        ? "border-red-500 bg-red-50" 
                        : activeField === 'role'
                        ? "border-blue-500 bg-white shadow-lg"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    } ${role ? '' : 'text-gray-500'}`}
                  >
                    {role ? (
                      <div className="flex items-center justify-between">
                        <span>{getSelectedRole()?.label}</span>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSelectedRole()?.color}`}></div>
                      </div>
                    ) : (
                      "Select your role"
                    )}
                  </button>
                  
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showRoleDropdown ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {showRoleDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden">
                      {roles.map((roleItem) => (
                        <button
                          key={roleItem.value}
                          type="button"
                          onClick={() => {
                            setRole(roleItem.value);
                            setShowRoleDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-all duration-300 hover:bg-gray-50 ${
                            role === roleItem.value 
                              ? `bg-gradient-to-r ${roleItem.color} text-white` 
                              : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{roleItem.label}</span>
                            {role === roleItem.value && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.role && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                      errors.email 
                        ? "border-red-500 bg-red-50" 
                        : activeField === 'email'
                        ? "border-blue-500 bg-white shadow-lg"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    }`}
                    placeholder="your.email@hospital.com"
                    type="email"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveField('password')}
                    onBlur={() => setActiveField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 pr-12 ${
                      errors.password 
                        ? "border-red-500 bg-red-50" 
                        : activeField === 'password'
                        ? "border-blue-500 bg-white shadow-lg"
                        : "border-gray-200 bg-white/80 hover:border-gray-300"
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-800 font-medium">Secure Access Notice</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Your credentials are encrypted end-to-end. Contact your system administrator for account setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showRoleDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowRoleDropdown(false)}
        />
      )}
    </div>
  );
}