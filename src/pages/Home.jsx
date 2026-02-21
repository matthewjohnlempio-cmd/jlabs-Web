'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import GeoMap from "../components/Map/GeoMap";

export default function Home() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState([]);

  const fetchMyIP = async () => {
    try {
      const res = await axios.get("https://ipinfo.io/geo");
      setData(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch IP data.");
    }
  };

  useEffect(() => {
    fetchMyIP();
  }, []);

  const handleSearch = async () => {
    if (!ip) return;
    try {
      const res = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setData(res.data);
      setError("");
      setHistory((prev) => [...prev, ip]);
      setIp("");
    } catch (err) {
      setError("Invalid IP address.");
    }
  };

  const handleClear = () => {
    setIp("");
    fetchMyIP();
  };

  const handleHistoryClick = async (ipAddress) => {
    try {
      const res = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
      setData(res.data);
      setError("");
    } catch (err) {
      setError("Invalid IP address.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const deleteSelected = () => {
    setHistory(history.filter((item) => !selectedHistory.includes(item)));
    setSelectedHistory([]);
  };

  const coords = data && data.loc ? data.loc.split(",").map(Number) : null;

  return (
    <div className="min-h-screen bg-[#0B2E3A] font-sans p-6 text-[#EBF4F6]">
      <div className="max-w-6xl mx-auto bg-[#0F3F4F] rounded-2xl shadow-2xl p-8 space-y-8 border border-[#088395]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-4xl font-bold text-[#7AB2B2]">GeoIP Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#088395] text-white font-semibold rounded-lg hover:bg-[#FF5F00] transition shadow"
          >
            Logout
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Enter IP address"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 bg-[#0B2E3A] border border-[#088395] rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#7AB2B2] text-[#EBF4F6] placeholder-[#7AB2B2] shadow-sm"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#088395] text-white font-medium rounded-lg hover:bg-[#9BEC00] transition shadow"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-[#09637E] text-white font-medium rounded-lg hover:bg-[#57595B] transition shadow"
            >
              Clear
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 font-medium">{error}</p>}

        {/* IP Data Card */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#0B2E3A] rounded-xl p-6 shadow-inner border border-[#088395]">
            <div className="flex flex-col gap-1">
              <span className="text-[#7AB2B2] font-semibold">IP Address</span>
              <span className="text-[#EBF4F6] font-medium">{data.ip}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#7AB2B2] font-semibold">City</span>
              <span className="text-[#EBF4F6] font-medium">{data.city}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#7AB2B2] font-semibold">Region</span>
              <span className="text-[#EBF4F6] font-medium">{data.region}</span>
            </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#7AB2B2] font-semibold">Country</span>
                <span className="text-[#EBF4F6] font-medium flex gap-2 items-center">
                  {data.country && (
                    <img
                      src={`https://flagcdn.com/w40/${data.country.toLowerCase()}.png`}
                      alt={data.country}
                      width="24"
                      height="18"
                      className="rounded-sm"
                    />
                  )}
                  {data.country || "N/A"}
                </span>
              </div>
            <div className="flex flex-col gap-1 col-span-full">
              <span className="text-[#7AB2B2] font-semibold">Location</span>
              <span className="text-[#EBF4F6] font-medium">{data.loc || "N/A"}</span>
            </div>
          </div>
        )}

        {/* Map */}
        {coords ? (
          <GeoMap coords={coords} ip={data.ip} darkMode />
        ) : data ? (
          <p className="text-[#7AB2B2]">Location coordinates not available for this IP.</p>
        ) : null}

        {/* History */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#7AB2B2]">Search History</h3>
          {history.length === 0 ? (
            <p className="text-[#7AB2B2]">No history yet.</p>
          ) : (
            <div className="bg-[#0B2E3A] p-4 rounded-xl shadow-inner border border-[#088395]">
              <ul className="space-y-2 mb-3">
                {history.map((item, index) => (
                  <li key={index} className="flex items-center justify-between gap-3 p-2 hover:bg-[#088395]/20 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedHistory.includes(item)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedHistory([...selectedHistory, item]);
                          } else {
                            setSelectedHistory(selectedHistory.filter((i) => i !== item));
                          }
                        }}
                        className="w-5 h-5 accent-[#7AB2B2]"
                      />
                      <span
                        className="cursor-pointer text-[#7AB2B2] hover:underline font-medium"
                        onClick={() => handleHistoryClick(item)}
                      >
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={deleteSelected}
                className="px-5 py-2 bg-[#088395] text-white font-medium rounded-lg hover:bg-[#C3110C] transition shadow"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}