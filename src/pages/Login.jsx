'use client';

import { useState } from "react";
import axios from "axios";
import BubbleAnimation from "../components/bubbles/BubbleAnimation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Quick debug (you can remove this line later)
  console.log("API Base URL being used:", apiBaseUrl || "(not set — check Vercel env vars)");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!apiBaseUrl) {
      setError("API URL is not configured. Please check environment variables.");
      console.error("NEXT_PUBLIC_API_URL is missing or empty");
      return;
    }

    setError(""); // clear previous error

    try {
      const res = await axios.post(
        `${apiBaseUrl}/api/login`, // ← change to `${apiBaseUrl}/login` if your backend mounts routes at root
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res.data.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);
      window.location.href = "/"; // or use next/router if you prefer client-side navigation
    } catch (err) {
      console.error("Login request failed:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials or try again later.";

      setError(errorMessage);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #3C799D, #3C799D)" }}
    >
      {/* Bubble animation */}
      <BubbleAnimation />

      {/* Login form */}
      <div className="relative z-10 w-full max-w-md bg-[#0B2E3A]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg text-[#EBF4F6]">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#09637E]/30 placeholder-[#7AB2B2] text-[#EBF4F6] focus:outline-none focus:ring-2 focus:ring-[#088395]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#09637E]/30 placeholder-[#7AB2B2] text-[#EBF4F6] focus:outline-none focus:ring-2 focus:ring-[#088395]"
            required
          />
          <button
            type="submit"
            className="px-4 py-3 bg-[#088395] rounded-lg font-semibold hover:bg-[#9BEC00] transition"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}