import React, { useState } from "react";
import {
  FiSearch,
  FiUser,
  FiLock,
  FiMail,
  FiChevronDown,
  FiChevronRight,
  FiBell,
  FiShield,
  FiKey,
  FiGlobe,
  FiClock,
  FiHelpCircle,
  FiMessageCircle,
  FiStar,
  FiEye,
  FiLayout,
  FiImage,
  FiAlertCircle,
  FiActivity,
  FiRefreshCw,
} from "react-icons/fi";

const accent = "#6366f1"; // Indigo-500
const cardBg = "bg-white dark:bg-zinc-900";
const cardShadow = "shadow-md dark:shadow-zinc-900/30";
const cardRounded = "rounded-2xl";
const sectionTitle =
  "flex items-center gap-2 text-base font-semibold mb-2 text-zinc-700 dark:text-zinc-200";
const sectionDesc = "text-xs text-zinc-400 mb-2";
const iconStyle = "w-5 h-5 text-indigo-500";
const toggleBase =
  "relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none";
const toggleThumb =
  "inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200";

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={
        toggleBase +
        (checked ? " bg-indigo-500" : " bg-zinc-200 dark:bg-zinc-700")
      }
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span
        className={
          toggleThumb + (checked ? " translate-x-5" : " translate-x-1")
        }
        style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.08)" }}
      />
    </button>
  );
}

function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full max-w-xs">
      <button
        className="flex items-center justify-between w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span>{options.find((o) => o.value === value)?.label || value}</span>
        <FiChevronDown className="ml-2 w-4 h-4 text-zinc-400" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg">
          {options.map((o) => (
            <div
              key={o.value}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-zinc-800 text-sm ${
                value === o.value ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  // State for toggles and dropdowns
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState("medium");
  const [layout, setLayout] = useState("comfortable");
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [permissions, setPermissions] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [lang, setLang] = useState("en");
  const [tz, setTz] = useState("UTC");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-6 px-2 sm:px-6 flex flex-col items-center font-[Inter,sans-serif]">
      {/* Header */}
      <header className="w-full max-w-2xl flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              className="pl-9 pr-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="Search settings..."
              type="text"
            />
          </div>
        </div>
      </header>
      <main className="w-full max-w-2xl flex flex-col gap-6">
        {/* Account Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiUser className={iconStyle} /> Account
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiUser className="w-4 h-4 text-indigo-400" /> Profile
                Information
              </div>
              <div className={sectionDesc}>
                Edit your name, photo, and other personal details.
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiLock className="w-4 h-4 text-indigo-400" /> Change Password
              </div>
              <div className={sectionDesc}>
                Update your password regularly to keep your account secure.
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiMail className="w-4 h-4 text-indigo-400" /> Email Preferences
              </div>
              <div className={sectionDesc}>
                Manage your email notification and newsletter preferences.
              </div>
            </div>
          </div>
        </section>
        {/* Appearance Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiImage className={iconStyle} /> Appearance
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiImage className="w-4 h-4 text-indigo-400" /> Theme
                </div>
                <div className={sectionDesc}>
                  Choose your preferred color mode.
                </div>
              </div>
              <Dropdown
                value={theme}
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "system", label: "System" },
                ]}
                onChange={setTheme}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiEye className="w-4 h-4 text-indigo-400" /> Font Size
                </div>
                <div className={sectionDesc}>
                  Adjust the font size for better readability.
                </div>
              </div>
              <Dropdown
                value={fontSize}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                onChange={setFontSize}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiLayout className="w-4 h-4 text-indigo-400" /> Layout
                  Preferences
                </div>
                <div className={sectionDesc}>
                  Switch between compact and comfortable layouts.
                </div>
              </div>
              <Dropdown
                value={layout}
                options={[
                  { value: "compact", label: "Compact" },
                  { value: "comfortable", label: "Comfortable" },
                ]}
                onChange={setLayout}
              />
            </div>
          </div>
        </section>
        {/* Notifications Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiBell className={iconStyle} /> Notifications
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiBell className="w-4 h-4 text-indigo-400" /> Push
                  Notifications
                </div>
                <div className={sectionDesc}>
                  Receive real-time updates on your device.
                </div>
              </div>
              <Toggle checked={pushNotif} onChange={setPushNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiMail className="w-4 h-4 text-indigo-400" /> Email Alerts
                </div>
                <div className={sectionDesc}>
                  Get important alerts and reminders via email.
                </div>
              </div>
              <Toggle checked={emailNotif} onChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiAlertCircle className="w-4 h-4 text-indigo-400" /> Do Not
                  Disturb
                </div>
                <div className={sectionDesc}>
                  Mute all notifications during focus time.
                </div>
              </div>
              <Toggle checked={dnd} onChange={setDnd} />
            </div>
          </div>
        </section>
        {/* Privacy & Security Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiShield className={iconStyle} /> Privacy & Security
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiKey className="w-4 h-4 text-indigo-400" /> Two-Factor
                  Authentication
                </div>
                <div className={sectionDesc}>
                  Add an extra layer of security to your account.
                </div>
              </div>
              <Toggle checked={twoFA} onChange={setTwoFA} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiLock className="w-4 h-4 text-indigo-400" /> App Permissions
                </div>
                <div className={sectionDesc}>
                  Control which apps can access your data.
                </div>
              </div>
              <Toggle checked={permissions} onChange={setPermissions} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiActivity className="w-4 h-4 text-indigo-400" /> Data &
                Activity Logs
              </div>
              <div className={sectionDesc}>
                View your recent activity and data usage logs.
              </div>
            </div>
          </div>
        </section>
        {/* General Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiGlobe className={iconStyle} /> General
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiGlobe className="w-4 h-4 text-indigo-400" /> Language &
                  Region
                </div>
                <div className={sectionDesc}>
                  Set your language and regional preferences.
                </div>
              </div>
              <Dropdown
                value={lang}
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "de", label: "German" },
                ]}
                onChange={setLang}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiClock className="w-4 h-4 text-indigo-400" /> Time Zone
                </div>
                <div className={sectionDesc}>Choose your local time zone.</div>
              </div>
              <Dropdown
                value={tz}
                options={[
                  { value: "UTC", label: "UTC" },
                  { value: "PST", label: "Pacific Time" },
                  { value: "EST", label: "Eastern Time" },
                  { value: "CET", label: "Central Europe" },
                ]}
                onChange={setTz}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiRefreshCw className="w-4 h-4 text-indigo-400" /> Auto
                  Updates
                </div>
                <div className={sectionDesc}>
                  Keep your app up to date automatically.
                </div>
              </div>
              <Toggle checked={autoUpdate} onChange={setAutoUpdate} />
            </div>
          </div>
        </section>
        {/* Support Section */}
        <section
          className={`${cardBg} ${cardShadow} ${cardRounded} p-6 group transition-all`}
        >
          <div className={sectionTitle}>
            <FiHelpCircle className={iconStyle} /> Support
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <FiHelpCircle className="w-4 h-4 text-indigo-400" /> Help Center
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FiMessageCircle className="w-4 h-4 text-indigo-400" /> Contact
              Support
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FiStar className="w-4 h-4 text-indigo-400" /> Rate the App
            </div>
          </div>
        </section>
      </main>
      {/* Micro-interaction styles */}
      <style>{`
        .group:hover { box-shadow: 0 4px 24px 0 rgba(99,102,241,0.08); }
        .group:active { box-shadow: 0 2px 8px 0 rgba(99,102,241,0.12); }
        .group:focus-within { box-shadow: 0 0 0 2px #6366f1; }
      `}</style>
    </div>
  );
}
