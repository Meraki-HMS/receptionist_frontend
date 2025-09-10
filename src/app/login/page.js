"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [hospitalId, setHospitalId] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (hospitalId && role && email && password) {
      // ✅ Save login info in localStorage (temporary until backend)
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("hospitalId", hospitalId);

      router.push("/dashboard"); // redirect after login
    } else {
      setError("Please fill in all required fields");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl flex w-[900px] overflow-hidden">
        
        {/* Left Side (Illustration) */}
        <div className="w-1/2 flex items-center justify-center bg-blue-100">


<Image
  src="/login-illustration.png"
  alt="Healthcare Team"
  width={400}
  height={400}
  className="object-contain"
/>


        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            Login
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Please enter your credentials to access the system
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Hospital ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital ID
              </label>
              <input
                type="text"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                placeholder="Enter Hospital ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="receptionist@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

