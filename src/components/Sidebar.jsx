import {
  FiSearch,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiCheckCircle,
  FiX,
  FiHash,
  FiTrendingUp,
  FiInbox,
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import {
  PiUserCircleLight,
  PiBriefcaseLight,
  PiListBulletsLight,
  PiCalendarCheckLight,
  PiStarLight,
  PiNoteLight,
  PiCalendarBlankLight,
  PiSparkle,
} from "react-icons/pi";

import { Link, useLocation } from "react-router-dom";

const defaultLists = [
  { name: "Personal", color: "#f87171", count: 3 },
  { name: "Work", color: "#60a5fa", count: 6 },
  { name: "List 1", color: "#fbbf24", count: 3 },
];

const tags = [
  { name: "Tag 1", color: "bg-zinc-200 text-zinc-700" },
  { name: "Tag 2", color: "bg-zinc-200 text-zinc-700" },
];

export default function Sidebar({
  activeView = "Upcoming",
  onViewChange,
  lists: propLists,
  setLists: setPropLists,
  onClose,
  showCancel = true,
}) {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch tasks for list counts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tasksRes] = await Promise.all([API.get("/tasks")]);
        setTaskList(tasksRes.data);
      } catch (err) {
        toast.error("Failed to load tasks or lists");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const [search, setSearch] = useState("");
  const [lists, setLists] =
    propLists && setPropLists
      ? [propLists, setPropLists]
      : useState(defaultLists);
  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListColor, setNewListColor] = useState("#6366f1");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const colorPalette = [
    "#f87171", // red
    "#fbbf24", // yellow
    "#60a5fa", // blue
    "#34d399", // green
    "#a78bfa", // purple
    "#f472b6", // pink
    "#f59e42", // orange
    "#38bdf8", // sky
    "#facc15", // amber
    "#6ee7b7", // teal
    "#6366f1", // indigo
    "#e879f9", // fuchsia
    "#fcd34d", // gold
    "#4ade80", // emerald
    "#818cf8", // violet
    "#fca5a5", // light red
    "#fde68a", // light yellow
    "#a3e635", // lime
    "#fda4af", // rose
    "#c084fc", // purple dark
  ];

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    try {
      const res = await API.post("/lists", {
        list_name: newListName.trim(),
        color: newListColor,
      });
      setLists((prev) => [...prev, res.data]);
      setNewListName("");
      setNewListColor("#6366f1");
      setShowAddList(false);
      toast.success("List added");
    } catch {
      toast.error("Failed to add list");
    }
  };

  const handleDeleteList = async (listId, listName) => {
    setListToDelete({ id: listId, name: listName });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!listToDelete) return;
    setIsDeleting(true);
    try {
      await API.delete(`/lists/${listToDelete.id}`);
      setLists((prev) => prev.filter((list) => list.id !== listToDelete.id));
      toast.success("List deleted successfully");
    } catch (err) {
      toast.error("Failed to delete list");
      console.error("Delete list error:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setListToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setListToDelete(null);
  };

  return (
    <>
      <aside className="flex flex-col h-full sm:w-72 w-80 bg-gradient-to-b from-white via-white to-zinc-50/50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/50 backdrop-blur-2xl border-r border-zinc-200/60 dark:border-zinc-800/60 transition-all duration-300 md:static md:translate-x-0 md:shadow-none relative overflow-y-auto">
        {/* Cancel/Close Button */}
        {showCancel && (
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all z-10 group"
            aria-label="Close Sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}

        {/* Logo / App Name with modern gradient */}
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <FiCheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
                Taskora
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                Stay organized
              </span>
            </div>
          </div>
        </div>
        {/* Search with modern styling */}
        <div className="px-6 pb-4">
          <div className="relative group">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-indigo-500 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
            />
          </div>
        </div>
        {/* Views with enhanced styling */}
        <nav className="px-6 pb-4 space-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Views
            </span>
          </div>
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group cursor-pointer relative overflow-hidden ${
              useLocation().pathname === "/"
                ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {useLocation().pathname === "/" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full" />
            )}
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                useLocation().pathname === "/"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
              } transition-all`}
            >
              <PiCalendarCheckLight
                className={`text-lg ${
                  useLocation().pathname === "/"
                    ? "text-white"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              />
            </span>
            <span className="flex-1 text-left text-sm font-medium">
              Dashboard
            </span>
            <span
              className={`min-w-7 h-7 flex items-center justify-center text-xs font-semibold rounded-lg px-2 ${
                useLocation().pathname === "/"
                  ? "bg-indigo-500/20 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              5
            </span>
          </Link>
        </nav>

        <div className="px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        </div>
        {/* Lists with modern card design */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              My Lists
            </span>
            <button
              onClick={() => setShowAddList(true)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all group"
              title="Add new list"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {lists.map((list) => {
              const count = taskList.filter(
                (task) => task.list_id === list.id
              ).length;
              return (
                <div
                  key={list.id || list.list_name}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="relative">
                    <span
                      className="w-6 h-6 rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center"
                      style={{ backgroundColor: list.color }}
                    >
                      <FiHash className="w-3 h-3 text-white/80" />
                    </span>
                  </div>
                  <span className="flex-1 text-left text-sm font-medium truncate">
                    {list.list_name}
                  </span>
                  <span className="min-w-7 h-7 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 rounded-lg px-2 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                    {count}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(list.id, list.list_name);
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
                    title="Delete list"
                    type="button"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            <button
              className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 dark:hover:from-indigo-500/20 dark:hover:to-purple-500/20 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-all group border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/30"
              onClick={() => setShowAddList(true)}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 transition-colors">
                <FiPlus className="w-4 h-4" />
              </span>
              <span className="flex-1 text-left text-sm font-medium">
                Add New List
              </span>
            </button>
          </div>
        </div>
        {/* Priority Tags with modern pill design */}
        <div className="px-6 py-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 mb-3">
            <PiSparkle className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Priority Tags
            </span>
          </div>
          <div className="space-y-3 px-4">
            <div className="flex items-center gap-2.5 group">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Urgent
              </span>
            </div>
            <div className="flex items-center gap-2.5 group">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                High Priority
              </span>
            </div>
            <div className="flex items-center gap-2.5 group">
              <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Medium Priority
              </span>
            </div>
          </div>
        </div>
        {/* Settings & Sign out with modern styling */}
        <div className="px-6 py-4 space-y-1 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Link
            // to="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
              <PiUserCircleLight className="text-base text-zinc-600 dark:text-zinc-400" />
            </span>
            <span className="flex-1 text-left text-sm font-medium">
              Profile
            </span>
          </Link>
          <Link
            // to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
              <FiSettings className="text-base text-zinc-600 dark:text-zinc-400" />
            </span>
            <span className="flex-1 text-left text-sm font-medium">
              Settings
            </span>
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              setTimeout(() => {
                window.location.reload();
              }, 200);
            }}
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-all group focus:outline-none focus:ring-2 focus:ring-red-400/20"
            aria-label="Sign out"
            title="Sign out and clear session"
            type="button"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/50 group-hover:bg-red-200 dark:group-hover:bg-red-950 transition-colors">
              <FiLogOut className="text-base" />
            </span>
            <span className="flex-1 text-left text-sm font-medium">
              Sign out
            </span>
          </button>
        </div>
      </aside>
      {/* Add List Modal with modern 2026 design */}
      {showAddList &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
            <form
              onSubmit={handleAddList}
              className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 flex flex-col gap-6 border border-zinc-200/50 dark:border-zinc-800/50 animate-slide-up"
              style={{ minWidth: 0 }}
            >
              <button
                type="button"
                onClick={() => setShowAddList(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-2xl opacity-30 rounded-2xl"
                    style={{ backgroundColor: newListColor }}
                  />
                  <span
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: newListColor }}
                  >
                    <FiHash className="w-8 h-8 text-white/90" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Create New List
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Organize your tasks with a custom list
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
                  List Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm placeholder:text-zinc-400"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g. Shopping, Gym Routine"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">
                  Choose Color
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {colorPalette.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                        newListColor === color
                          ? "border-zinc-900 dark:border-white scale-110 shadow-lg"
                          : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewListColor(color)}
                      aria-label={color}
                    >
                      {newListColor === color && (
                        <FiCheckCircle className="w-4 h-4 text-white mx-auto drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddList(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all text-sm"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm &&
        createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-zinc-200/50 dark:border-zinc-800/50 animate-slide-up">
              {/* Warning Icon */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                    <FiAlertTriangle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  Delete List?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    "{listToDelete?.name}"
                  </span>
                  ?
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                  This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
