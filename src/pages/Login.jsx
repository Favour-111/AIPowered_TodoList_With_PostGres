import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiCheckCircle, FiMail, FiLock } from "react-icons/fi";
import "../auth.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
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
      console.log(res.data);

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
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
            Welcome to <span className="font-semibold">Taskora</span>
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed font-light">
            Elevate your productivity with intelligent task management designed
            for modern professionals.
          </p>
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Secure & Encrypted</span>
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
              Sign In
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={`w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border ${
                    error && !email
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-500"
                  } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none transition-colors duration-200 font-light`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3.5 bg-white dark:bg-zinc-900 border ${
                    error && !password
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-500"
                  } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 rounded-lg outline-none transition-colors duration-200 font-light pr-12`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((r) => !r)}
                  className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-500 focus:ring-offset-0"
                />
                <span className="font-light">Remember me</span>
              </label>
              <a
                href="#"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-light transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 text-sm font-light">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-light flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5" />
                <span>Login successful!</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              disabled={!email || !password || loading}
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
                  <span>Signing in...</span>
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 font-light uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/Dashboard"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer"
              aria-label="Login with Google"
            >
              <FaGoogle className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm font-light text-zinc-700 dark:text-zinc-300">
                Google
              </span>
            </Link>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer"
              aria-label="Login with Apple"
            >
              <FaApple className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm font-light text-zinc-700 dark:text-zinc-300">
                Apple
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400 font-light">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-zinc-900 dark:text-white hover:underline transition-all"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
