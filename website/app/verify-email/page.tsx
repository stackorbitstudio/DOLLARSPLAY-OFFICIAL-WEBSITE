"use client";

import { useState } from "react";
import Link from "next/link";
import { sendEmailVerification, reload } from "firebase/auth";
import { auth } from "../../lib/firebase";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function resendEmail() {
    setMessage("");
    setError("");

    const user = auth.currentUser;

    if (!user) {
      setError("Please log in to your account first.");
      return;
    }

    try {
      setLoading(true);
      await sendEmailVerification(user);
      setMessage("A new verification email has been sent.");
    } catch {
      setError("Unable to send the email. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function checkVerification() {
    setMessage("");
    setError("");

    const user = auth.currentUser;

    if (!user) {
      setError("Please log in to your account first.");
      return;
    }

    try {
      setLoading(true);
      await reload(user);

      if (auth.currentUser?.emailVerified) {
        window.location.href = `${BASE_PATH}/dashboard/`;
      } else {
        setError("Your email is not verified yet. Please check your inbox.");
      }
    } catch {
      setError("Unable to check verification status. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Verify Your Email</h1>

        <p>
          Please check your inbox and click the verification link
          sent to your registered email address.
        </p>

        {message && <p role="status">{message}</p>}
        {error && <p role="alert">{error}</p>}

        <button onClick={resendEmail} disabled={loading}>
          {loading ? "Please wait..." : "Resend Verification Email"}
        </button>

        <button onClick={checkVerification} disabled={loading}>
          I Have Verified My Email
        </button>

        <p>
          <Link href={`${BASE_PATH}/login/`}>Back to Login</Link>
        </p>
      </section>
    </main>
  );
}
