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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-indigo-950 dark:to-zinc-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="relative w-full max-w-md">
        {/* Card with modern glassmorphism */}
        <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 p-8 sm:p-10">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-50" />

          <div className="relative">
            {/* Logo and Brand */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40 animate-pulse" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <FiCheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Taskora
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Welcome back! Sign in to continue
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-indigo-500 transition-colors">
                  <FiMail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-2 ${
                    error && !email
                      ? "border-red-500"
                      : "border-zinc-200 dark:border-zinc-700"
                  } text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  aria-label="Email address"
                />
                {error && !email && (
                  <span className="text-xs text-red-500 mt-1 block">
                    Enter a valid email.
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-indigo-500 transition-colors">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-2 ${
                    error && !password
                      ? "border-red-500"
                      : "border-zinc-200 dark:border-zinc-700"
                  } text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors"
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
                {error && !password && (
                  <span className="text-xs text-red-500 mt-1 block">
                    Enter your password.
                  </span>
                )}
              </div>
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((r) => !r)}
                    className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5" />
                  Login successful!
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] cursor-pointer"
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
                    <span>Logging in...</span>
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/Dashboard"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-all group cursor-pointer"
                aria-label="Login with Google"
              >
                <FaGoogle className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Google
                </span>
              </Link>
              <button
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-all group cursor-pointer"
                aria-label="Login with Apple"
              >
                <FaApple className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Apple
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
