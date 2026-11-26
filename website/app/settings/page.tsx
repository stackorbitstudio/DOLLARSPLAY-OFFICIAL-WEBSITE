"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setLoading(true);
      setError("");
      await signOut(auth);
      window.location.href = `${BASE_PATH}/login/`;
    } catch {
      setError("Unable to log out. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Account Settings</h1>

        <p>Manage your DollarsPlay account.</p>

        <h2>Profile</h2>
        <p>Update your display name and profile picture.</p>
        <Link href={`${BASE_PATH}/profile/`}>Manage Profile</Link>

        <h2>Password</h2>
        <p>Request a password reset using your registered email.</p>
        <Link href={`${BASE_PATH}/forgot-password/`}>
          Reset Password
        </Link>

        <h2>Email Verification</h2>
        <p>Manage your email verification status.</p>
        <Link href={`${BASE_PATH}/verify-email/`}>
          Verify Email
        </Link>

        <h2>Privacy</h2>
        <Link href={`${BASE_PATH}/privacy-policy/`}>
          Privacy Policy
        </Link>

        <h2>Account Access</h2>

        {error && <p role="alert">{error}</p>}

        <button onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Log Out"}
        </button>

        <p>
          <Link href={`${BASE_PATH}/dashboard/`}>
            Back to Dashboard
          </Link>
        </p>
      </section>
    </main>
  );
          }
