import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiEdit2,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";
import AIWidget from "../components/AIWidget";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [stats, setStats] = useState({ total: 0, completed: 0, urgent: 0 });
  const [aiQuote, setAiQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const userRes = await API.get("/auth/me");
        const statsRes = await API.get("/tasks/statistics");
        setUser({ name: userRes.data.name, email: userRes.data.email });
        setStats(statsRes.data);
        // AI suggestion for a motivational quote based on tasks
        const aiRes = await API.post("/ai/suggest-quote", {
          stats: statsRes.data,
        });
        setAiQuote(aiRes.data.quote || "Stay productive and keep going!");
      } catch {
        setAiQuote("Stay productive and keep going!");
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex w-full max-w-full bg-gradient-to-br from-indigo-100/60 via-white/80 to-cyan-100/60 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 font-[Inter,sans-serif] overflow-x-hidden">
      <aside className="hidden md:flex h-full">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-full px-2 sm:px-8 py-8">
        <Topbar />
        <div
          className="w-full max-w-2xl bg-white/60 dark:bg-zinc-900/70 rounded-3xl shadow-2xl p-8 mt-8 flex flex-col items-center gap-10 border border-zinc-100 dark:border-zinc-800 backdrop-blur-xl"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-400 to-cyan-400 flex items-center justify-center shadow-lg mb-2 border-4 border-white dark:border-zinc-800">
              <FiUser className="text-white text-5xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-[Poppins,sans-serif]">
              {user.name || "User"}
            </h2>
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300 text-base font-medium">
              <FiMail className="w-5 h-5" />
              {user.email || "user@email.com"}
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-indigo-200/80 to-purple-100/80 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 shadow-md transition-all duration-300">
              <FiTrendingUp className="text-indigo-500 dark:text-indigo-300 text-2xl mb-1" />
              <span className="text-4xl font-bold text-indigo-700 dark:text-indigo-200">
                {stats.total}
              </span>
              <span className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-widest">
                Total Tasks
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-green-100/80 to-cyan-100/80 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 shadow-md transition-all duration-300">
              <FiCheckCircle className="text-green-500 dark:text-green-300 text-2xl mb-1" />
              <span className="text-4xl font-bold text-green-600 dark:text-green-200">
                {stats.completed}
              </span>
              <span className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-widest">
                Completed
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center bg-gradient-to-r from-red-100/80 to-yellow-100/80 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 shadow-md transition-all duration-300">
              <FiAlertCircle className="text-red-400 dark:text-yellow-300 text-2xl mb-1" />
              <span className="text-4xl font-bold text-red-500 dark:text-yellow-300">
                {stats.urgent}
              </span>
              <span className="text-xs font-semibold text-zinc-500 mt-1 uppercase tracking-widest">
                Urgent
              </span>
            </div>
          </div>
          <div className="w-full max-w-xl bg-gradient-to-r from-indigo-200/80 to-cyan-200/80 dark:from-zinc-800 dark:to-zinc-900 rounded-xl p-6 shadow flex flex-col items-center border border-indigo-100 dark:border-zinc-800">
            <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 mb-2 flex items-center gap-2">
              <FiEdit2 className="w-5 h-5" /> AI Suggested Quote
            </span>
            <blockquote className="italic text-zinc-700 dark:text-zinc-200 text-center text-base sm:text-lg">
              {loading ? "Thinking..." : `"${aiQuote}"`}
            </blockquote>
          </div>
        </div>
        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-indigo-500 via-purple-400 to-cyan-400 text-white rounded-full p-5 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
          title="Add New Todo"
        >
          <FiPlus className="w-7 h-7" />
        </button>
        <div className="mt-10 w-full max-w-2xl">
          <AIWidget />
        </div>
      </main>
    </div>
  );
}
