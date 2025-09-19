"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // form state
  const [hospitalId, setHospitalId] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // validation errors
  const [errors, setErrors] = useState({});

  // simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e = {};
    if (!hospitalId.trim()) e.hospitalId = "Hospital ID is required";
    if (!role) e.role = "Please select a role";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    // simulate successful login
    const user = {
      hospitalId: hospitalId.trim(),
      role,
      email: email.trim(),
      loggedAt: new Date().toISOString(),
    };
    // store minimal session info
    localStorage.setItem("receptionistLoggedIn", "true");
    localStorage.setItem("hmsUser", JSON.stringify(user));

    // redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left: form */}
        <div className="p-8 flex flex-col justify-center gap-3">
          <h2 className="text-2xl font-bold text-blue-700">Login</h2>
          <p className="text-sm text-slate-500 mb-4">
            Enter your hospital credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Hospital ID</label>
              <input
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${errors.hospitalId ? "border-red-500" : "border-gray-300"} focus:outline-none`}
                placeholder="e.g. HOSP-001"
              />
              {errors.hospitalId && <p className="text-xs text-red-500 mt-1">{errors.hospitalId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${errors.role ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select role</option>
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
              </select>
              {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="receptionist@example.com"
                type="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-400 mt-4">
            Note: Receptionists are added by admin. No self-signup.
          </p>
        </div>

        {/* Right: decorative panel */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-6">
          <div className="text-center">
            <svg width="140" height="140" viewBox="0 0 24 24" className="mx-auto mb-4" fill="none">
              <path d="M12 2v6" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="12" cy="14" r="6" stroke="#2563EB" strokeWidth="1.4"/>
            </svg>
            <h3 className="font-semibold text-slate-800">Welcome to Meraki HMS</h3>
            <p className="text-sm text-slate-500 mt-2">Secure access for hospital staff — sign in to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
