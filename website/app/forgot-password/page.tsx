"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, cleanEmail);
      setMessage(
        "If an account exists for this email, a password reset link has been sent."
      );
    } catch {
      setMessage(
        "If an account exists for this email, a password reset link has been sent."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Forgot Password?</h1>
        <p>
          Enter your registered email address. We will send you a link to
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          {message && <p role="status">{message}</p>}
          {error && <p role="alert">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p>
          Remember your password?{" "}
          <Link href={`${BASE_PATH}/login/`}>Back to Login</Link>
        </p>
      </section>
    </main>
  );
    }
