
"use client";

import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { loginUser, logoutUser } from "../../lib/auth";
import { auth } from "../../lib/firebase";

const HOME_URL = "/DOLLARSPLAY-OFFICIAL-WEBSITE-/";
const DASHBOARD_URL = "/DOLLARSPLAY-OFFICIAL-WEBSITE-/dashboard/";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const credential = await loginUser(email, password);
      await credential.user.reload();

      if (!credential.user.emailVerified) {
        await logoutUser();
        setError("Please verify your email before logging in.");
        return;
      }

      window.location.replace(DASHBOARD_URL);
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
      ) {
        setError("Incorrect Gmail or password.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setSuccess("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const credential = await signInWithPopup(auth, provider);
      await credential.user.reload();

      if (!credential.user.emailVerified) {
        await logoutUser();
        setError("Please verify your Google email first.");
        return;
      }

      window.location.replace(DASHBOARD_URL);
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (code === "auth/popup-closed-by-user") {
        setError("Google login was cancelled.");
      } else if (code === "auth/unauthorized-domain") {
        setError("This website domain is not authorized in Firebase.");
      } else if (code === "auth/account-exists-with-different-credential") {
        setError("This email already uses another login method. Please use Gmail and password.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your Gmail address first.");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        email.trim().toLowerCase()
      );
      setSuccess("Password reset link sent. Please check your Gmail inbox.");
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? String(err.code)
          : "";

      if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else {
        setError("Could not send reset email. Please try again.");
      }
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#08090d] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-[#b99a48]/50 bg-[#11141b] p-6 sm:p-8 shadow-2xl shadow-black/60">

        <a
          href={HOME_URL}
          className="inline-block mb-7 text-sm font-semibold text-[#b9d58b] hover:text-[#e5c66b]"
        >
          ← Back to Home
        </a>

        <div className="text-center mb-8">
          <img
            src="/DOLLARSPLAY-OFFICIAL-WEBSITE-/logo.png"
            alt="DollarsPlay Logo"
            className="w-20 h-20 mx-auto mb-3 object-contain"
          />

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-[#e7c66b]">
            DOLLARS PLAY
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Play. Earn. Win Rewards.
          </p>

          <h2 className="mt-7 text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-400">
            Login to your DollarsPlay account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#b9d58b] mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full h-14 rounded-lg border border-[#b99a48]/70 bg-[#0c0f15] px-4 text-white text-base outline-none focus:border-[#e5c66b]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#b9d58b] mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full h-14 rounded-lg border border-[#b99a48]/70 bg-[#0c0f15] px-4 text-white text-base outline-none focus:border-[#e5c66b]"
            />

            <div className="text-right mt-3">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-sm font-semibold text-[#e5c66b] hover:underline disabled:opacity-50"
              >
                {resetLoading ? "Sending reset link..." : "Forgot Password?"}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#9acb52] to-[#e5c66b] py-4 text-lg font-extrabold text-black transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-700" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-700" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full rounded-lg border border-[#b99a48]/60 bg-[#171b23] py-3.5 text-white font-semibold hover:bg-[#222936] disabled:opacity-50"
        >
          {googleLoading ? "Connecting to Google..." : "🌐 Continue with Google"}
        </button>

        <p className="mt-7 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/DOLLARSPLAY-OFFICIAL-WEBSITE-/signup/"
            className="font-bold text-[#e5c66b] hover:underline"
          >
            Create Account
          </a>
        </p>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
    }
        
