import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCheckCircle, FiMail, FiLock, FiUser } from "react-icons/fi";
import "../auth.css";
import { Link } from "react-router-dom";

const passwordStrength = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = passwordStrength(password);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-zinc-300 dark:bg-zinc-700";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = () => {
    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    if (!name || !email || !password || password !== confirm || strength < 2) {
      setError("Please fill all fields correctly.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          full_name: name,
          email,
          password,
        }
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex overflow-hidden">
      {/* Left Side - Branding & Visual */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-900 items-center justify-center overflow-hidden">
        {/* Subtle animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg px-12 text-center">
          <div className="mb-8 inline-block">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <FiCheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
            Start your journey with{" "}
            <span className="font-semibold">Taskora</span>
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed font-light">
            Join thousands of professionals who trust Taskora to streamline
            their workflow and achieve more.
          </p>
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Free to start • No credit card required</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-md">
          <div className="mb-10">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-zinc-900 dark:from-zinc-800 dark:to-zinc-900 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-light text-zinc-900 dark:text-white">
                Taskora
              </span>
            </div>

            <h2 className="text-3xl font-light text-zinc-900 dark:text-white mb-3 tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
              Fill in your details to get started
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors duration-200 font-light"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors duration-200 font-light"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors duration-200 font-light pr-12"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2 -mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-light text-zinc-600 dark:text-zinc-400">
                    Password Strength
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      strength === 1
                        ? "text-red-600 dark:text-red-400"
                        : strength === 2
                        ? "text-orange-600 dark:text-orange-400"
                        : strength === 3
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()} ${
                      strength === 1
                        ? "w-1/4"
                        : strength === 2
                        ? "w-2/4"
                        : strength === 3
                        ? "w-3/4"
                        : "w-full"
                    }`}
                  />
                </div>
                {strength < 2 && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-light">
                    Use at least 8 characters with uppercase, numbers, and
                    symbols.
                  </p>
                )}
              </div>
            )}

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors duration-200 font-light"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 text-sm font-light">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-light flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5" />
                <span>Account created successfully! Redirecting...</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating account...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Terms & Privacy */}
          <p className="mt-6 text-xs text-center text-zinc-500 dark:text-zinc-500 font-light leading-relaxed">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Privacy Policy
            </a>
          </p>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400 font-light">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-zinc-900 dark:text-white hover:underline transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
