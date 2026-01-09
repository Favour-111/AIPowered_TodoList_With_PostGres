import React, { useState } from "react";

// Placeholder for calendar logic, will expand with features
export default function Calendar() {
  // View state: day, week, month
  const [view, setView] = useState("month");
  // Selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 transition-colors duration-300">
      {/* Top bar: Month selector, view toggle */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <button className="text-lg font-bold">←</button>
          <span className="text-xl font-bold">July 2025</span>
          <button className="text-lg font-bold">→</button>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              view === "day"
                ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
            }`}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              view === "week"
                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
            }`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              view === "month"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>
      {/* Center: Calendar grid placeholder */}
      <div className="flex-1 flex flex-row gap-4 p-6">
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-2xl shadow-sm p-4">
          <div className="text-center text-zinc-400">
            Calendar grid will go here
          </div>
        </div>
        {/* Side panel: Task summary */}
        <aside className="w-80 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-4">Task Summary</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">🟡</span> Tasks due today:{" "}
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">🟢</span> Completed this week:{" "}
              <span className="font-bold">0</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-500">🔴</span> Upcoming deadlines:{" "}
              <span className="font-bold">0</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
