"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("receptionistLoggedIn", "true");
      router.push("/dashboard");
 // redirect to dashboard
    } else {
      setError("Please enter valid credentials");
    }
  };

  return (
<div className="flex h-screen items-center justify-center bg-cover bg-center relative" 
     style={{ backgroundImage:"url('/images/hospital-bg.jpg')"}}>
  
  {/* Overlay to dim the background for better contrast */}
  <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>

  {/* Login Card */}
  <div className="relative z-10 bg-white rounded-2xl shadow-lg flex w-[850px] overflow-hidden">
    {/* Left Form */}
    <div className="w-1/2 p-10 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">
        Receptionist Login
      </h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Please enter your credentials to access the dashboard
      </p>
      <form onSubmit={handleLogin} className="space-y-4">
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </div>

    {/* Right Image */}
    <div className="w-1/2 relative">
      <Image
        src="/images/reception.jpg"
        alt="Hospital Reception"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  </div>
</div>
  );
}
