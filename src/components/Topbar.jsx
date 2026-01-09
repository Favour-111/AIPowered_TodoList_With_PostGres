import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiClock,
  FiUser,
  FiMenu,
  FiSun,
  FiMoon,
  FiCheckCircle,
} from "react-icons/fi";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Topbar({
  user = {
    name: "Vincent",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  onSidebarToggle,
}) {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-white via-white to-zinc-50/50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/50 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 gap-3 sm:gap-6">
        {/* Left section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
            aria-label="Open sidebar menu"
            onClick={onSidebarToggle}
          >
            <FiMenu className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>

          {/* Logo/Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-md opacity-30" />
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <FiCheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent">
              Taskora
            </span>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md hidden sm:flex">
          <div className="relative w-full group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search icon for mobile */}
          <button
            className="sm:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
            title="Search"
          >
            <FiSearch className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all group"
            title="Notifications"
          >
            <FiBell className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-zinc-950"></span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all group"
            title="Toggle dark mode"
          >
            {isDark ? (
              <FiSun className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
            ) : (
              <FiMoon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 transition-colors" />
            )}
          </button>

          {/* Profile avatar */}
          <button className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all"
            />
            <span className="hidden lg:block text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {user.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
