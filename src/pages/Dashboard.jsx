import AIWidget from "../components/AIWidget";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../api";
import { useEffect, useState } from "react";
// Simple spinner component
function Spinner({ size = 24, color = "#6366f1", className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
import toast from "react-hot-toast";

import {
  FiChevronRight,
  FiCalendar,
  FiCheckCircle,
  FiList,
  FiClock,
  FiPlus,
  FiTrash2,
  FiSquare,
  FiCheckSquare,
  FiX,
  FiAlertCircle,
  FiStar,
} from "react-icons/fi";

function TaskList({
  onSelect,
  selectedId,
  tasks,
  onToggle,
  selectedIds = [],
  onSelectTask = () => {},
  onDeleteSelected = () => {},
  lists = [],
}) {
  // Pagination state
  const [page, setPage] = useState(1);
  const tasksPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(tasks.length / tasksPerPage));
  // Filter pills state
  const [filter, setFilter] = useState("ongoing");
  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);
  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  return (
    <section className="flex-1 w-full max-w-full bg-gradient-to-b from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-6 sm:p-8 shadow-sm flex flex-col transition-all overflow-hidden">
      {/* Modern Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 w-full">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-20" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <FiList className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              Today's Tasks
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} •{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold border border-indigo-500/20">
            {filteredTasks.length}
          </span>
        </div>
      </div>
      {/* Modern Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6 w-full">
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer font-medium transition-all ${
            filter === "all"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
              : "bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
        >
          <FiList className="w-4 h-4" />
          <span>All Tasks</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer font-medium transition-all ${
            filter === "ongoing"
              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
              : "bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("ongoing");
            setPage(1);
          }}
        >
          <FiClock className="w-4 h-4" />
          <span>Ongoing</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm cursor-pointer font-medium transition-all ${
            filter === "completed"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
              : "bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("completed");
            setPage(1);
          }}
        >
          <FiCheckCircle className="w-4 h-4" />
          <span>Completed</span>
        </button>
      </div>
      {/* Modern Action Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all text-sm cursor-pointer"
          onClick={() =>
            typeof window !== "undefined" &&
            window.openAddTask &&
            window.openAddTask()
          }
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
            selectedIds.length === tasks.length && tasks.length > 0
              ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-950/70 border border-amber-300 dark:border-amber-800"
              : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
          }`}
          onClick={() => {
            if (selectedIds.length === tasks.length && tasks.length > 0) {
              tasks.forEach((t) => onSelectTask(t.id));
            } else {
              tasks.forEach((t) => {
                if (!selectedIds.includes(t.id)) onSelectTask(t.id);
              });
            }
          }}
        >
          {selectedIds.length === tasks.length && tasks.length > 0 ? (
            <>
              <FiX className="w-4 h-4" />
              <span>Deselect All</span>
            </>
          ) : (
            <>
              <FiCheckSquare className="w-4 h-4" />
              <span>Select All</span>
            </>
          )}
        </button>
        {selectedIds.length > 0 ? (
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-950/70 font-medium transition-all text-sm cursor-pointer animate-fade-in border border-red-300 dark:border-red-800"
            onClick={onDeleteSelected}
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Delete ({selectedIds.length})</span>
          </button>
        ) : (
          <span className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs ml-2">
            <FiAlertCircle className="w-4 h-4" />
            <span>Select tasks to perform bulk actions</span>
          </span>
        )}
      </div>
      {paginatedTasks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16">
          <div className="flex flex-col items-center max-w-sm text-center">
            <div className="relative mb-6">
              <div
                className="absolute inset-0 blur-2xl opacity-20 rounded-full"
                style={{
                  backgroundColor:
                    filter === "completed"
                      ? "#10b981"
                      : filter === "ongoing"
                      ? "#f59e0b"
                      : "#6366f1",
                }}
              />
              <div
                className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${
                  filter === "completed"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                    : filter === "ongoing"
                    ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30"
                }`}
              >
                {filter === "completed" ? (
                  <FiCheckCircle className="w-10 h-10 text-white" />
                ) : filter === "ongoing" ? (
                  <FiClock className="w-10 h-10 text-white" />
                ) : (
                  <FiList className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            <h4 className="text-base sm:text-lg font-semibold sm:font-bold text-zinc-900 dark:text-white mb-2">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "ongoing"
                ? "No ongoing tasks"
                : "No tasks found"}
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              {filter === "completed"
                ? "Complete some tasks to see them here!"
                : filter === "ongoing"
                ? "Create a new task to get started"
                : "Try adding your first task to stay organized"}
            </p>
            <button
              onClick={() =>
                typeof window !== "undefined" &&
                window.openAddTask &&
                window.openAddTask()
              }
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              <span>Create Your First Task</span>
            </button>
          </div>
        </div>
      ) : (
        <ul className="flex-1 flex flex-col gap-2 w-full max-w-full">
          {paginatedTasks.map((task) => (
            <li key={task.id}>
              <div
                onClick={() => onSelect(task.id)}
                className={`group w-full flex flex-wrap items-start gap-3 px-4 py-4 transition-all text-left rounded-xl border cursor-pointer ${
                  selectedId === task.id
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800 shadow-sm"
                    : "bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
                }`}
              >
                {/* Checkboxes */}
                <div className="flex items-center gap-3 pt-0.5">
                  {/* Selection Checkbox - Square shape */}
                  <button
                    type="button"
                    className={`relative group/select w-5 h-5 rounded border-2 flex items-center justify-center transition-all hover:scale-110 ${
                      selectedIds.includes(task.id)
                        ? "bg-indigo-500 border-indigo-500 shadow-md shadow-indigo-500/30"
                        : "border-zinc-300 dark:border-zinc-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTask(task.id);
                    }}
                    title="Select for bulk actions"
                  >
                    {selectedIds.includes(task.id) && (
                      <FiCheckSquare className="w-3.5 h-3.5 text-white" />
                    )}
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-700 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/select:opacity-100 transition-opacity pointer-events-none z-10">
                      Select
                    </span>
                  </button>

                  {/* Complete Checkbox - Circular shape */}
                  <button
                    type="button"
                    className={`relative group/complete w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
                      task.completed
                        ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/30"
                        : "border-zinc-300 dark:border-zinc-600 hover:border-emerald-400 dark:hover:border-emerald-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!task.completed) onToggle(task.id);
                    }}
                    title="Mark as completed"
                  >
                    {task.completed && (
                      <FiCheckCircle className="w-3.5 h-3.5 text-white" />
                    )}
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-700 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/complete:opacity-100 transition-opacity pointer-events-none z-10">
                      Complete
                    </span>
                  </button>
                </div>

                {/* Task Content */}
                <div className="flex-1 flex flex-col min-w-0 gap-2">
                  <div className="flex items-start justify-between gap-2 w-full">
                    <h4
                      className={`text-sm font-semibold ${
                        task.completed
                          ? "line-through text-zinc-400 dark:text-zinc-500"
                          : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* List Badge */}
                    {lists &&
                      task.list_id &&
                      (() => {
                        const found = lists.find((l) => l.id === task.list_id);
                        if (!found) return null;
                        return (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border"
                            style={{
                              backgroundColor: `${found.color}15`,
                              borderColor: `${found.color}30`,
                              color: found.color,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: found.color }}
                            />
                            {found.list_name || found.name}
                          </span>
                        );
                      })()}

                    {/* Priority Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <>
                        {task.tags.map((tag, idx) => {
                          let bgColor = "#e5e7eb";
                          let textColor = "#3f3f46";
                          let shouldBlink = false;

                          if (tag === "Urgent") {
                            bgColor = "#ef4444";
                            textColor = "#fff";
                            shouldBlink = true;
                          } else if (tag === "High Priority") {
                            bgColor = "#f97316";
                            textColor = "#fff";
                          } else if (tag === "Medium Priority") {
                            bgColor = "#eab308";
                            textColor = "#fff";
                          }

                          return (
                            <span
                              key={tag + idx}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium shadow-sm ${
                                shouldBlink ? "animate-pulse" : ""
                              }`}
                              style={{
                                backgroundColor: bgColor,
                                color: textColor,
                              }}
                            >
                              {shouldBlink && (
                                <FiAlertCircle className="w-3 h-3" />
                              )}
                              {tag}
                            </span>
                          );
                        })}
                      </>
                    )}

                    {/* Due Date */}
                    {task.due_date && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(task.due_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}

                    {/* Subtasks Count */}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        <FiList className="w-3 h-3" />
                        {task.subtasks.length} subtask
                        {task.subtasks.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>

                <FiChevronRight className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:translate-x-1 transition-all w-5 h-5 mt-1" />
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modern Priority Legend */}
      <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 w-full">
        <div className="flex items-center gap-2">
          <FiStar className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Priority Legend
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white shadow-sm animate-pulse">
            <FiAlertCircle className="w-3 h-3" />
            Urgent
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-500 text-white shadow-sm">
            High Priority
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-500 text-white shadow-sm">
            Medium Priority
          </span>
        </div>
      </div>

      {/* Modern Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 w-full">
        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Showing {(page - 1) * tasksPerPage + 1}–
          {Math.min(page * tasksPerPage, filteredTasks.length)} of{" "}
          {filteredTasks.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <GrFormPrevious className="inline w-5 h-5" />
          </button>
          <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-sm">
            {page}
          </span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <GrFormNext className="inline w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { Fragment } from "react";

function TaskDetails({ task, open, onClose, lists = [], fetchData }) {
  // All hooks must be at the top level, before any return or conditional
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const listTasks = allTasks.filter((t) => t.list === task?.list);
  const [editTask, setEditTask] = useState({
    title: task?.title || "",
    description: task?.description || "",
    list_id:
      task?.list_id ||
      lists.find((l) => l.name === task?.list || l.list_name === task?.list)
        ?.id ||
      "",
    due_date: task?.due_date || "",
    tags: Array.isArray(task?.tags) ? task.tags : [],
    subtasks: Array.isArray(task?.subtasks) ? task.subtasks : [],
    completed: task?.completed || false,
  });
  const [originalTask, setOriginalTask] = useState(null);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".custom-list-dropdown"))
        setListDropdownOpen(false);
    }
    if (listDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [listDropdownOpen]);
  useEffect(() => {
    setEditTask({
      title: task?.title || "",
      description: task?.description || "",
      list_id:
        task?.list_id ||
        lists.find((l) => l.name === task?.list || l.list_name === task?.list)
          ?.id ||
        "",
      due_date: task?.due_date || "",
      tags: Array.isArray(task?.tags) ? task.tags : [],
      subtasks: Array.isArray(task?.subtasks) ? task.subtasks : [],
      completed: task?.completed || false,
    });
    setOriginalTask({
      title: task?.title || "",
      description: task?.description || "",
      list_id:
        task?.list_id ||
        lists.find((l) => l.name === task?.list || l.list_name === task?.list)
          ?.id ||
        "",
      due_date: task?.due_date || "",
      tags: Array.isArray(task?.tags) ? task.tags : [],
      subtasks: Array.isArray(task?.subtasks) ? task.subtasks : [],
      completed: task?.completed || false,
    });
    setSubtaskInput("");
  }, [task, lists]);

  const handleListDelete = () => setShowDeleteConfirm(true);
  const handleConfirmDelete = async () => {
    if (!task?.id) return;
    setDeleting(true);
    try {
      await API.delete(`/tasks/${task.id}`);
      toast.success("Task deleted");
      setShowDeleteConfirm(false);
      if (onClose) onClose();
      if (fetchData) fetchData();
    } catch (err) {
      toast.error("Failed to delete task");
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };
  const handleCancelDelete = () => setShowDeleteConfirm(false);

  if (!task) {
    return (
      <aside className="hidden lg:flex flex-col w-96 bg-gradient-to-b from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 rounded-2xl ml-2 p-8 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all">
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-20" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <FiList className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-zinc-900 dark:text-white mb-2">
              No Task Selected
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Select a task from the list to view and edit details
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleListChange = (listId) => {
    setEditTask((prev) => ({ ...prev, list_id: listId }));
  };
  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setEditTask((prev) => ({
        ...prev,
        subtasks: [...prev.subtasks, subtaskInput],
      }));
      setSubtaskInput("");
    }
  };
  const handleRemoveSubtask = (idx) => {
    setEditTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== idx),
    }));
  };
  // Save update handler
  const handleSaveUpdate = async () => {
    const payload = {
      title: editTask.title,
      description: editTask.description,
      due_date: editTask.due_date,
      tags: editTask.tags,
      subtasks: editTask.subtasks,
      completed: editTask.completed,
      list_id: editTask.list_id,
    };
    setUpdating(true);
    try {
      await API.put(`/tasks/${task.id}`, payload);
      toast.success("Task updated");
      setOriginalTask({ ...editTask });
      if (fetchData) fetchData();
    } catch (err) {
      toast.error("Failed to update task");
    } finally {
      setUpdating(false);
    }
  };
  // Check if any field has changed
  const isChanged =
    originalTask &&
    (editTask.title !== originalTask.title ||
      editTask.description !== originalTask.description ||
      editTask.due_date !== originalTask.due_date ||
      editTask.completed !== originalTask.completed ||
      editTask.list_id !== originalTask.list_id ||
      JSON.stringify(editTask.tags) !== JSON.stringify(originalTask.tags) ||
      JSON.stringify(editTask.subtasks) !==
        JSON.stringify(originalTask.subtasks));
  // AI Suggest & Rephrase handler for edit mode
  const handleAISuggestEditTask = async () => {
    setAiLoading(true);
    try {
      const res = await API.post("/ai/suggest-task", {
        input: {
          title: editTask.title,
          description: editTask.description,
        },
      });
      const suggestion = res.data && res.data.suggestion;
      if (suggestion && suggestion.title && suggestion.description) {
        setEditTask((prev) => ({
          ...prev,
          title: suggestion.title,
          description: suggestion.description,
        }));
        toast.success("AI rephrased title & description!");
      } else {
        toast.error("AI did not return a suggestion.");
      }
    } catch (err) {
      toast.error("AI suggestion failed");
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <Fragment>
      {typeof window !== "undefined" && window.innerWidth >= 1024 && (
        <aside className="hidden lg:flex flex-col w-96 bg-gradient-to-b from-white to-zinc-50/30 dark:from-zinc-900 dark:to-zinc-950/30 rounded-2xl ml-2 p-6 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all overflow-y-auto">
          {/* Modern Header with Gradient Icon */}
          <div className="mb-6 flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-lg opacity-20" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <LuListTodo className="w-6 h-6 text-white" />
              </div>
            </div>
            <textarea
              name="title"
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none resize-none"
              value={editTask.title}
              onChange={handleFieldChange}
              placeholder="Task title..."
              rows={2}
              style={{
                minWidth: 0,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
            />
          </div>

          {/* Modern Description Field */}
          <div className="mb-6 space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none resize-none"
              value={editTask.description}
              onChange={handleFieldChange}
              placeholder="Add a description..."
              rows={4}
              style={{
                minWidth: 0,
                maxHeight: "200px",
              }}
            />
          </div>
          {/* Modern Fields Section */}
          <div className="mb-6 space-y-4">
            {/* List Selector */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <MdOutlineChecklist className="w-4 h-4 text-zinc-400" />
                List
              </label>
              <div className="relative custom-list-dropdown">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium text-sm hover:border-zinc-300 dark:hover:border-zinc-600 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none cursor-pointer"
                  onClick={() => setListDropdownOpen((open) => !open)}
                >
                  <span className="flex items-center gap-2">
                    {(() => {
                      let selectedList = null;
                      if (editTask.list_id) {
                        selectedList = lists.find(
                          (l) => l.id === editTask.list_id
                        );
                      }
                      if (selectedList) {
                        return (
                          <span className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-lg"
                              style={{ backgroundColor: selectedList.color }}
                            />
                            <span className="text-sm font-medium">
                              {selectedList.list_name || selectedList.name}
                            </span>
                          </span>
                        );
                      }
                      return (
                        <span className="text-zinc-400">Select a list...</span>
                      );
                    })()}
                  </span>
                  <svg
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      listDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {listDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in">
                    {lists.length === 0 ? (
                      <div className="px-4 py-3 text-zinc-400 text-sm text-center">
                        No lists available
                      </div>
                    ) : (
                      lists.map((l, idx) => (
                        <div
                          key={l.id || idx}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                            editTask.list_id === l.id
                              ? "bg-zinc-50 dark:bg-zinc-800"
                              : ""
                          }`}
                          onClick={() => {
                            handleListChange(l.id);
                            setListDropdownOpen(false);
                          }}
                        >
                          <span
                            className="w-3 h-3 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: l.color }}
                          />
                          <span className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                            {l.list_name || l.name}
                          </span>
                          {editTask.list_id === l.id && (
                            <FiCheckCircle className="w-4 h-4 text-amber-500 ml-auto" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <CiCalendarDate className="w-4 h-4 text-zinc-400" />
                Due Date
              </label>
              <input
                name="due_date"
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                value={editTask.due_date}
                onChange={handleFieldChange}
              />
            </div>

            {/* Priority Tags Display */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <LiaHashtagSolid className="w-4 h-4 text-zinc-400" />
                Priority Tags
              </label>
              <div className="space-y-2">
                {Array.isArray(task.tags) && task.tags.length > 0 ? (
                  task.tags.map((tag, idx) => {
                    let bgColor = "#e5e7eb";
                    let textColor = "#3f3f46";
                    let shouldPulse = false;

                    if (tag === "Urgent") {
                      bgColor = "#ef4444";
                      textColor = "#fff";
                      shouldPulse = true;
                    } else if (tag === "High Priority") {
                      bgColor = "#f97316";
                      textColor = "#fff";
                    } else if (tag === "Medium Priority") {
                      bgColor = "#eab308";
                      textColor = "#fff";
                    }

                    return (
                      <div
                        key={tag + idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                          shouldPulse ? "animate-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: `${bgColor}20`,
                          borderLeft: `3px solid ${bgColor}`,
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: bgColor }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: bgColor === "#e5e7eb" ? "#3f3f46" : bgColor,
                          }}
                        >
                          {tag}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/20"
                    style={{ borderLeft: "3px solid #eab308" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
                      Medium Priority
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Modern Subtasks Section */}
          <div className="mb-6 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <TbSubtask className="w-4 h-4 text-zinc-400" />
              Subtasks ({editTask.subtasks.length})
            </label>
            <div className="space-y-2">
              {editTask.subtasks.map((sub, idx) => (
                <div
                  key={idx}
                  className="group flex gap-2 items-center p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                >
                  <div className="flex-1 text-sm text-zinc-900 dark:text-white">
                    {sub}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-all cursor-pointer"
                    title="Remove subtask"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubtask();
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                  placeholder="Add new subtask..."
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* Modern Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <button
              onClick={handleSaveUpdate}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold shadow-lg shadow-amber-500/30 transition-all ${
                isChanged && !updating
                  ? "hover:shadow-amber-500/50 hover:scale-[1.02] cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isChanged || updating}
            >
              {updating ? (
                <>
                  <Spinner size={18} color="#fff" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <LuSaveAll className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              onClick={handleAISuggestEditTask}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all cursor-pointer"
              disabled={aiLoading}
              title="AI Suggest & Rephrase"
            >
              {aiLoading ? (
                <>
                  <Spinner size={18} color="#fff" />
                  <span>AI Working...</span>
                </>
              ) : (
                <>
                  <IoBulbOutline className="w-5 h-5" />
                  <span>AI Enhance</span>
                </>
              )}
            </button>

            <button
              onClick={handleListDelete}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transition-all cursor-pointer"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Spinner size={18} color="#fff" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <BsTrash className="w-5 h-5" />
                  <span>Delete Task</span>
                </>
              )}
            </button>
          </div>
          {/* Modern Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 flex flex-col items-center border border-zinc-200/50 dark:border-zinc-800/50 animate-slide-up">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-red-500 rounded-2xl blur-2xl opacity-20" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                    <FiAlertCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                  Delete Task?
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 text-center">
                  This action cannot be undone. The task and all its subtasks
                  will be permanently deleted.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleCancelDelete}
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modern Priority Legend */}
          <div className="pt-6 mt-6 space-y-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <div className="flex items-center gap-2">
              <FiStar className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Priority Legend
              </span>
            </div>
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 animate-pulse"
                style={{ borderLeft: "3px solid #ef4444" }}
              >
                <FiAlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Urgent
                </span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10"
                style={{ borderLeft: "3px solid #f97316" }}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  High Priority
                </span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10"
                style={{ borderLeft: "3px solid #eab308" }}
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
                  Medium Priority
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Modal for Small Screens */}
      {open && typeof window !== "undefined" && window.innerWidth < 1024 && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-end">
            <div className="w-full bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl border-t border-zinc-200 dark:border-zinc-800 animate-slide-up max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-zinc-900 z-10 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-start justify-between gap-3 rounded-t-3xl">
                <div className="flex items-start gap-2 min-w-0">
                  <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                    <LuListTodo className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-zinc-900 dark:text-white break-words line-clamp-2">
                    {editTask.title || "Task Details"}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-red-500 transition-colors flex-shrink-0 p-2"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none resize-none"
                    value={editTask.description}
                    onChange={handleFieldChange}
                    placeholder="Add a description..."
                    rows={3}
                  />
                </div>

                {/* List, Due Date, Priority */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 relative custom-list-dropdown">
                    <span className="text-zinc-400 flex-shrink-0">
                      <MdOutlineChecklist />
                    </span>
                    <div className="flex-1 relative">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all outline-none"
                        onClick={() => setListDropdownOpen((open) => !open)}
                      >
                        <span className="flex items-center gap-2">
                          {(() => {
                            let selectedList = null;
                            if (editTask.list_id) {
                              selectedList = lists.find(
                                (l) => l.id === editTask.list_id
                              );
                            }
                            if (selectedList) {
                              return (
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-3 h-3 rounded border border-zinc-200"
                                    style={{
                                      backgroundColor: selectedList.color,
                                    }}
                                  />
                                  <span
                                    className="text-xs"
                                    style={{ color: selectedList.color }}
                                  >
                                    {selectedList.list_name ||
                                      selectedList.name}
                                  </span>
                                </span>
                              );
                            }
                            return (
                              <span className="text-zinc-400 text-xs">
                                Select list
                              </span>
                            );
                          })()}
                        </span>
                        <svg
                          className="w-4 h-4 ml-2 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {listDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-40 overflow-y-auto animate-fade-in">
                          {lists.length === 0 ? (
                            <div className="px-4 py-2 text-zinc-400 text-xs">
                              No lists found
                            </div>
                          ) : (
                            lists.map((l, idx) => (
                              <div
                                key={l.id || idx}
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs ${
                                  editTask.list_id === l.id
                                    ? "bg-gray-100 dark:bg-zinc-800 font-semibold"
                                    : ""
                                }`}
                                onClick={() => {
                                  handleListChange(l.id);
                                  setListDropdownOpen(false);
                                }}
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded border border-zinc-200"
                                  style={{ backgroundColor: l.color }}
                                />
                                <span style={{ color: l.color }}>
                                  {l.list_name || l.name}
                                </span>
                                {editTask.list_id === l.id && (
                                  <svg
                                    className="w-4 h-4 ml-auto text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 flex-shrink-0">
                      <CiCalendarDate />
                    </span>
                    <input
                      name="due_date"
                      type="date"
                      className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                      value={editTask.due_date}
                      onChange={handleFieldChange}
                    />
                  </div>

                  {/* Priority Tags */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 flex-shrink-0">
                      <LiaHashtagSolid />
                    </span>
                    <div className="flex flex-col gap-1 w-full">
                      {Array.isArray(task.tags) && task.tags.length > 0 ? (
                        task.tags.map((tag, idx) => {
                          let color = "#e5e7eb";
                          if (tag === "Urgent") color = "#ef4444";
                          if (tag === "High Priority") color = "#f59e42";
                          if (tag === "Medium Priority") color = "#fde047";
                          return (
                            <div
                              key={tag + idx}
                              className="flex items-center w-full"
                            >
                              <span
                                className="inline-block w-2 h-4 rounded-l"
                                style={{ backgroundColor: color }}
                              ></span>
                              <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100 ml-2">
                                {tag}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-xs text-zinc-400">
                          No tag selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtasks */}
                <div className="space-y-2">
                  <span className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <TbSubtask />
                    Subtasks
                  </span>
                  <div className="flex flex-col gap-2">
                    {editTask.subtasks.map((sub, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <div className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs">
                          {sub}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubtask(idx)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg bg-red-50 dark:bg-zinc-800 flex items-center justify-center cursor-pointer flex-shrink-0"
                          title="Remove Subtask"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        value={subtaskInput}
                        onChange={(e) => setSubtaskInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs outline-none"
                        placeholder="Add subtask"
                      />
                      <button
                        type="button"
                        onClick={handleAddSubtask}
                        className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-zinc-800 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-zinc-700 flex items-center gap-1 cursor-pointer flex-shrink-0"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    onClick={handleSaveUpdate}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-md transition-all text-sm font-semibold border-2 border-yellow-300/40 hover:from-yellow-500 hover:to-yellow-600 focus:ring-2 focus:ring-yellow-300 ${
                      isChanged && !updating
                        ? "cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                    disabled={!isChanged || updating}
                  >
                    {updating ? (
                      <>
                        <Spinner size={16} color="#fff" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <LuSaveAll size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleAISuggestEditTask}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md transition-all text-sm font-semibold border-2 border-blue-300/40 hover:from-blue-500 hover:to-blue-600 focus:ring-2 focus:ring-blue-300 cursor-pointer"
                    disabled={aiLoading}
                    title="AI Suggest & Rephrase"
                  >
                    {aiLoading ? (
                      <>
                        <Spinner size={16} color="#fff" />
                        <span>AI Working...</span>
                      </>
                    ) : (
                      <>
                        <IoBulbOutline size={18} />
                        <span>AI Suggest</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleListDelete}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md transition-all text-sm font-semibold border-2 border-red-300/40 hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-300 cursor-pointer"
                    disabled={deleting}
                  >
                    {deleting ? (
                      <>
                        <Spinner size={16} color="#fff" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <BsTrash size={18} />
                        <span>Delete Task</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Priority Legend */}
                <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Priority Legend
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-4 rounded-l bg-red-500" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                        Urgent
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-4 rounded-l bg-orange-500" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                        High Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-4 rounded-l bg-yellow-500" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                        Medium Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom padding for scroll */}
                <div className="h-4" />
              </div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl max-w-xs w-full flex flex-col items-center animate-slide-up">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-xl blur-lg opacity-20" />
                      <div className="relative w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-zinc-900 dark:text-white mb-2">
                      Confirm Delete
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mb-6 text-center">
                      Are you sure you want to delete this task? This action
                      cannot be undone.
                    </p>
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={handleCancelDelete}
                        className="flex-1 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDelete}
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md hover:from-red-600 hover:to-red-700 transition-all cursor-pointer text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}
import { Delete } from "react-feather";
import { BsTrash } from "react-icons/bs";
import { LuListTodo, LuSaveAll, LuTrash2 } from "react-icons/lu";
import { LiaHashtagSolid, LiaSave } from "react-icons/lia";
import { CiBoxList, CiCalendarDate } from "react-icons/ci";
import { MdOutlineChecklist, MdOutlineFindReplace } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { TbSubtask, TbTags } from "react-icons/tb";
import { GrFormNext, GrFormPrevious, GrTask } from "react-icons/gr";
import { PiCalendarHeartLight } from "react-icons/pi";
import { IoBulbOutline } from "react-icons/io5";

export default function Dashboard() {
  const [taskList, setTaskList] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    list: "",
    due: "",
    tags: [],
    subtasks: [""],
  });
  // Responsive sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Fetch tasks and lists
  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, listsRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/lists"),
      ]);
      setTaskList(tasksRes.data);
      setLists(listsRes.data);
      setSelectedTaskId((prev) => prev || tasksRes.data[0]?.id || null);
    } catch (err) {
      toast.error("Failed to load tasks or lists");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // Responsive sidebar
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const selectedTask = taskList.find((t) => t.id === selectedTaskId);
  // On small screens, open modal when a task is selected
  const handleSelect = (id) => {
    setSelectedTaskId(id);
    if (window.innerWidth < 1024) setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  // Confirmation and success modals for marking as completed
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const handleToggle = async (id) => {
    try {
      const task = taskList.find((t) => t.id === id);
      if (!task) return;

      await API.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description || "",
        due_date: task.due_date || null,
        tags: task.tags || [],
        subtasks: task.subtasks || [],
        list_id: task.list_id,
        completed: !task.completed,
      });
      toast.success(
        task.completed
          ? "Task marked as incomplete"
          : "Task marked as completed successfully!"
      );
      fetchData();
    } catch (err) {
      console.error("Toggle task error:", err);
      toast.error("Failed to update task");
    }
  };
  // Multi-select logic
  const handleSelectTask = (id) => {
    setSelectedTaskIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteSelected = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedTaskIds.map((id) => API.delete(`/tasks/${id}`))
      );
      setTaskList((list) =>
        list.filter((t) => !selectedTaskIds.includes(t.id))
      );
      setSelectedTaskIds([]);
      setShowDeleteConfirm(false);
      toast.success("Task(s) deleted");
    } catch {
      toast.error("Failed to delete task(s)");
    }
  };
  const cancelDeleteSelected = () => setShowDeleteConfirm(false);
  // Add Task Modal logic
  window.openAddTask = () => setShowAddTask(true);
  const closeAddTask = () => setShowAddTask(false);
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubtaskChange = (idx, value) => {
    setNewTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s, i) => (i === idx ? value : s)),
    }));
  };
  const addSubtask = () =>
    setNewTask((prev) => ({ ...prev, subtasks: [...prev.subtasks, ""] }));
  const removeSubtask = (idx) =>
    setNewTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== idx),
    }));
  const [adding, setAdding] = useState(false);
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.list) {
      toast.error("Select a list before submitting");
      return;
    }
    setAdding(true);
    try {
      const listObj = lists.find(
        (l) => l.list_name === newTask.list || l.name === newTask.list
      );
      await API.post("/tasks", {
        title: newTask.title,
        description: newTask.description,
        list_id: listObj?.id,
        due_date: newTask.due || null,
        tags: newTask.tags,
        subtasks: newTask.subtasks.filter(Boolean),
      });
      setShowAddTask(false);
      setNewTask({
        title: "",
        description: "",
        list: "",
        due: "",
        tags: [],
        subtasks: [""],
      });
      toast.success("Task added");
      fetchData();
    } catch {
      toast.error("Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  // --- AI Integration ---
  const [aiLoading, setAiLoading] = useState(false);
  const handleAISuggestTask = async () => {
    setAiLoading(true);
    try {
      const res = await API.post("/ai/suggest-task", {
        input: {
          title: newTask.title || "",
          description: newTask.description || "",
        },
      });
      if (res.data && res.data.suggestion) {
        let suggestion = res.data.suggestion;
        let parsed = null;
        if (typeof suggestion === "string") {
          try {
            parsed = JSON.parse(suggestion);
          } catch {
            // fallback: show raw output in description
            setNewTask((prev) => ({
              ...prev,
              description: suggestion,
            }));
            toast.success("AI output applied as description (raw)");
            return;
          }
        } else {
          parsed = suggestion;
        }
        setNewTask((prev) => ({
          ...prev,
          title: parsed.title || prev.title,
          description: parsed.description || prev.description,
          subtasks: parsed.subtasks || prev.subtasks,
        }));
        toast.success("AI suggestion applied");
      }
    } catch {
      toast.error("AI suggestion failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAISmartTag = async () => {
    if (!newTask.description) {
      toast.error("Enter a description first");
      return;
    }
    setAiLoading(true);
    try {
      const res = await API.post("/ai/smart-tag", {
        description: newTask.description,
      });
      if (res.data && res.data.tag) {
        setNewTask((prev) => ({ ...prev, tags: [res.data.tag] }));
        toast.success("AI tag applied");
      }
    } catch {
      toast.error("AI tagging failed");
    } finally {
      setAiLoading(false);
    }
  };

  // --- AI Due Date Suggestion ---
  const handleAIDueDate = async () => {
    if (!newTask.description) {
      toast.error("Enter a description first");
      return;
    }
    setAiLoading(true);
    try {
      const res = await API.post("/ai/suggest-due-date", {
        description: newTask.description,
        workload: newTask.subtasks.length || 1,
      });
      if (res.data && res.data.dueDate) {
        setNewTask((prev) => ({ ...prev, due: res.data.dueDate }));
        toast.success("AI due date applied");
      }
    } catch {
      toast.error("AI due date failed");
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex w-[100%] bg-white dark:bg-zinc-900 transition-colors duration-300"
      style={{ overflow: sidebarOpen ? "hidden" : "auto" }}
    >
      {/* Full-page loader when fetching data */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-zinc-900/80">
          <div className="flex flex-col items-center gap-4">
            <Spinner size={48} color="#6366f1" />
            <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 animate-pulse">
              Loading your tasks...
            </span>
          </div>
        </div>
      )}
      {/* Sidebar for desktop, overlay for mobile */}
      <aside className="hidden md:flex h-full">
        <Sidebar lists={lists} setLists={setLists} />
      </aside>

      {/* Mobile sidebar overlay - always in DOM for smooth transition */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar overlay"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") setSidebarOpen(false);
        }}
        style={{
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
      />
      <aside
        className="fixed top-0 left-0 z-50 h-screen w-80 bg-white dark:bg-zinc-900 transition-all duration-500 ease-in-out md:hidden shadow-2xl"
        style={{
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <Sidebar
          lists={lists}
          setLists={setLists}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* AI Features Widget */}
        <AIWidget />
        <Topbar onSidebarToggle={() => setSidebarOpen((s) => !s)} />

        {/* Welcome Section - Modern 2026 Design */}
        <div className="px-2 md:px-4 pt-3 pb-2">
          <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
            {/* Gradient Background with Blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-pink-500/15" />
            <div className="absolute inset-0 backdrop-blur-3xl" />

            {/* Animated Border Gradient */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-400/30 dark:via-purple-400/30 dark:to-pink-400/30 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{ padding: "1px" }}
            >
              <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-2xl" />
            </div>

            <div className="relative p-4 md:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Welcome Text with Modern Typography */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Welcome back!
                    </h2>
                    <span className="text-xl">👋</span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 ml-3 font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Modern Stats Cards */}
                <div className="flex gap-2 md:gap-3 flex-wrap sm:flex-nowrap">
                  {/* Total Tasks */}
                  <div className="group/card relative flex-1 sm:flex-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-blue-50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-700">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg shadow-blue-500/30">
                        <FiList className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-0.5">
                          Total
                        </p>
                        <p className="text-lg font-bold text-zinc-900 dark:text-white leading-none">
                          {taskList.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Completed Tasks */}
                  <div className="group/card relative flex-1 sm:flex-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-emerald-300 dark:hover:border-emerald-700">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg shadow-emerald-500/30">
                        <FiCheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-0.5">
                          Done
                        </p>
                        <p className="text-lg font-bold text-zinc-900 dark:text-white leading-none">
                          {taskList.filter((t) => t.completed).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Active Tasks */}
                  <div className="group/card relative flex-1 sm:flex-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-800/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-amber-300 dark:hover:border-amber-700">
                      <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg shadow-amber-500/30">
                        <FiClock className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400 mb-0.5">
                          Active
                        </p>
                        <p className="text-lg font-bold text-zinc-900 dark:text-white leading-none">
                          {taskList.filter((t) => !t.completed).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-row gap-2 md:gap-4 py-2 md:py-4 px-1 md:px-4">
          <TaskList
            onSelect={handleSelect}
            selectedId={selectedTaskId}
            tasks={taskList}
            onToggle={handleToggle}
            selectedIds={selectedTaskIds}
            onSelectTask={handleSelectTask}
            onDeleteSelected={handleDeleteSelected}
            lists={lists}
          />
          <TaskDetails
            task={selectedTask}
            open={showModal}
            onClose={handleClose}
            lists={lists}
            fetchData={fetchData}
          />
        </div>
        {/* Success Modal replaced by toast notification */}
        {/* Add New Task Modal */}
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl max-w-xs w-full flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="text-lg font-bold mb-2 text-red-600 flex items-center gap-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 text-center">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedTaskIds.length}</span>{" "}
                selected task{selectedTaskIds.length > 1 ? "s" : ""}? This
                action cannot be undone.
              </p>
              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={cancelDeleteSelected}
                  className="flex-1 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteSelected}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {showAddTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-4">
            <div
              className="w-full max-w-2xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 rounded-3xl shadow-2xl relative border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col"
              style={{ maxHeight: "90vh" }}
            >
              {/* Modern Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl px-6 sm:px-8 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <GrTask className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Create New Task
                    </h2>
                    <p className="text-white/80 text-xs">
                      Add a new task to your list
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAddTask}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={handleAddTask}
                className="flex-1 flex flex-col gap-6 outline-none ring-0 overflow-y-auto relative p-6 sm:p-8"
                style={{
                  minHeight: 0,
                  maxHeight: "calc(90vh - 80px)",
                  scrollbarWidth: "none",
                }}
              >
                {/* AI Helper Buttons - Modern Pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:from-indigo-500/30 hover:to-purple-500/30 transition-all flex items-center gap-2 border border-indigo-200/50 dark:border-indigo-800/50 cursor-pointer"
                    onClick={handleAISuggestTask}
                    disabled={aiLoading}
                    title="Let AI rephrase, improve, and auto-generate your task title, description, and subtasks."
                  >
                    <IoBulbOutline className="text-sm" />
                    {aiLoading ? "AI Working..." : "AI Suggest"}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all flex items-center gap-2 border border-blue-200/50 dark:border-blue-800/50 cursor-pointer"
                    onClick={handleAIDueDate}
                    disabled={aiLoading}
                  >
                    <CiCalendarDate className="text-sm" />
                    {aiLoading ? "AI Dating..." : "Smart Date"}
                  </button>
                </div>

                {/* Title and Description Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 110 2h-6a1 1 0 110-2h6V4z" />
                        </svg>
                      </div>
                      Task Title
                    </label>
                    <input
                      name="title"
                      value={newTask.title}
                      onChange={handleNewTaskChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-base focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                      placeholder="e.g. Design homepage mockup"
                      aria-describedby="title-help"
                    />
                    <p
                      id="title-help"
                      className="text-xs text-zinc-500 dark:text-zinc-400 mt-2"
                    >
                      What needs to be done?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newTask.description}
                      onChange={handleNewTaskChange}
                      className="w-full px-4 py-3 rounded-xl text-base border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 min-h-20 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none shadow-sm resize-none"
                      placeholder="Add more details about this task..."
                      aria-describedby="desc-help"
                    />
                    <p
                      id="desc-help"
                      className="text-xs text-zinc-500 dark:text-zinc-400 mt-2"
                    >
                      Provide context and details for better understanding
                    </p>
                  </div>
                </div>

                {/* Details Grid - Modern Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V7z" />
                        </svg>
                      </div>
                      Due Date
                    </label>
                    <input
                      name="due"
                      type="date"
                      value={newTask.due}
                      onChange={handleNewTaskChange}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm cursor-pointer"
                      aria-describedby="due-help"
                    />
                    <p
                      id="due-help"
                      className="text-xs text-zinc-500 dark:text-zinc-400 mt-2"
                    >
                      When should this be done?
                    </p>
                  </div>

                  {/* List Selection */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2V3z" />
                        </svg>
                      </div>
                      List
                    </label>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 cursor-pointer shadow-sm transition-all outline-none hover:border-zinc-300 dark:hover:border-zinc-600"
                      onClick={() => setShowListDropdown((v) => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={showListDropdown}
                    >
                      <span className="flex items-center gap-2">
                        {(() => {
                          const found = lists.find(
                            (l) =>
                              l.list_name === newTask.list ||
                              l.name === newTask.list
                          );
                          return found ? (
                            <span className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-600"
                                style={{ backgroundColor: found.color }}
                              />
                              <span className="text-base font-medium">
                                {found.list_name || found.name}
                              </span>
                            </span>
                          ) : (
                            <span className="text-base text-zinc-400">
                              Select List
                            </span>
                          );
                        })()}
                      </span>
                      <svg
                        className="w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {showListDropdown && (
                      <div className="absolute z-20 mt-2 w-80 max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl max-h-56 overflow-y-auto animate-fade-in">
                        {lists.length === 0 ? (
                          <div className="px-4 py-3 text-zinc-400 text-sm">
                            No lists found
                          </div>
                        ) : (
                          lists.map((list) => (
                            <div
                              key={list.id || list.name}
                              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-pink-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors ${
                                newTask.list === (list.list_name || list.name)
                                  ? "bg-pink-50 dark:bg-zinc-800"
                                  : ""
                              }`}
                              onClick={() => {
                                setNewTask((prev) => ({
                                  ...prev,
                                  list: list.list_name || list.name,
                                }));
                                setShowListDropdown(false);
                              }}
                            >
                              <span
                                className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-600"
                                style={{ backgroundColor: list.color }}
                              />
                              <span className="truncate text-base">
                                {list.list_name || list.name}
                              </span>
                              {newTask.list ===
                                (list.list_name || list.name) && (
                                <svg
                                  className="w-5 h-5 text-green-500 ml-auto flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                      Which list does this belong to?
                    </p>
                  </div>
                </div>

                {/* Tags and Subtasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Priority Tag */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      Priority
                    </label>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer shadow-sm transition-all outline-none hover:border-zinc-300 dark:hover:border-zinc-600"
                      onClick={() => setShowTagDropdown((v) => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={showTagDropdown}
                    >
                      <span className="flex items-center gap-2">
                        {(() => {
                          const tagOptions = [
                            { name: "Urgent", color: "#ef4444" },
                            { name: "High Priority", color: "#f59e42" },
                            { name: "Medium Priority", color: "#fde047" },
                          ];
                          const found = tagOptions.find((t) =>
                            newTask.tags.includes(t.name)
                          );
                          return found ? (
                            <span className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-600"
                                style={{ backgroundColor: found.color }}
                              />
                              <span className="text-base font-medium">
                                {found.name}
                              </span>
                            </span>
                          ) : (
                            <span className="text-base text-zinc-400">
                              Select Priority
                            </span>
                          );
                        })()}
                      </span>
                      <svg
                        className="w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {showTagDropdown && (
                      <div className="absolute z-20 mt-2 w-80 max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl max-h-56 overflow-y-auto animate-fade-in">
                        {[
                          { name: "Urgent", color: "#ef4444" },
                          { name: "High Priority", color: "#f59e42" },
                          { name: "Medium Priority", color: "#fde047" },
                        ].map((tag) => (
                          <div
                            key={tag.name}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors ${
                              newTask.tags.includes(tag.name)
                                ? "bg-red-50 dark:bg-zinc-800"
                                : ""
                            }`}
                            onClick={() => {
                              setNewTask((prev) => ({
                                ...prev,
                                tags: [tag.name],
                              }));
                              setShowTagDropdown(false);
                            }}
                          >
                            <span
                              className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-600"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="truncate text-base">
                              {tag.name}
                            </span>
                            {newTask.tags.includes(tag.name) && (
                              <svg
                                className="w-5 h-5 text-green-500 ml-auto flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                      Set the task priority level
                    </p>
                  </div>

                  {/* Subtasks */}
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.707 6.707a1 1 0 010 1.414L5.414 9l1.293 1.293a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 0zm7.586 0a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 11-1.414-1.414L14.586 9l-1.293-1.293a1 1 0 010-1.414zM9 11a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      Subtasks ({newTask.subtasks.filter(Boolean).length})
                    </label>
                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                      {newTask.subtasks.map((sub, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            value={sub}
                            onChange={(e) =>
                              handleSubtaskChange(idx, e.target.value)
                            }
                            className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none shadow-sm"
                            placeholder={`Step ${idx + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeSubtask(idx)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-zinc-800 flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                            title="Remove Subtask"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSubtask}
                        className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 dark:text-green-300 text-sm font-semibold hover:from-green-500/30 hover:to-emerald-500/30 flex items-center gap-2 w-full justify-center border border-green-200/50 dark:border-green-800/50 transition-all cursor-pointer"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add Subtask
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                      Break it down into steps
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="submit"
                    className={`flex-1 text-base py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 justify-center border-2 border-indigo-300/40 dark:border-indigo-800/40 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 focus:ring-2 focus:ring-indigo-500/20 ${
                      adding
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={adding}
                  >
                    {adding ? (
                      <>
                        <Spinner size={18} color="#fff" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Create Task</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeAddTask}
                    className="px-6 py-3 rounded-xl font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
