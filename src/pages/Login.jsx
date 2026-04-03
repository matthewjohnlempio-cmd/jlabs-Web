'use client';

import { useState } from "react";
import BubbleAnimation from "../components/bubbles/BubbleAnimation";

export default function Login({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("username", name.trim());
      localStorage.setItem("token", "true");
      setIsLoggedIn(true); // triggers App.jsx redirect to Home
      setIsLoading(false);
    }, 500);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #3C799D, #3C799D)" }}
    >
      <BubbleAnimation />

      <div className="relative z-10 w-full max-w-md bg-[#0B2E3A]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-[#EBF4F6]">
        <h2 className="text-3xl font-bold text-center mb-6">Enter Your Name</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#09637E]/30 placeholder-[#7AB2B2] text-[#EBF4F6] focus:outline-none focus:ring-2 focus:ring-[#088395]"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-3 bg-[#088395] rounded-lg font-semibold hover:bg-[#9BEC00] transition flex items-center justify-center gap-2 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Enter"}
          </button>
        </form>
        {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}