
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

const LOGIN_URL =
  "https://stackorbitstudio.github.io/DOLLARSPLAY-OFFICIAL-WEBSITE-/login/";

export default function ReferralsPage() {
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.replace(LOGIN_URL);
        return;
      }

      if (!user.emailVerified) {
        await signOut(auth);
        window.location.replace(LOGIN_URL);
        return;
      }

      const code = user.uid;

      setReferralCode(code);
      setReferralLink(
        `${window.location.origin}/DOLLARSPLAY-OFFICIAL-WEBSITE-/signup/?ref=${encodeURIComponent(code)}`
      );

      setLoading(false);
    });

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !auth.currentUser) {
        window.location.replace(LOGIN_URL);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied successfully!");
    } catch {
      setMessage("Copy failed. Please copy the text manually.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#090611] flex items-center justify-center text-lime-400">
        Loading Referral Page...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white px-5 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard/"
          className="text-lime-400 text-sm"
        >
          ← Back to Dashboard
        </Link>

        <div className="text-center mt-10 mb-10">
          <div className="text-5xl mb-4">👥</div>

          <h1 className="text-3xl font-extrabold">
            Referral <span className="text-lime-400">Zone</span>
          </h1>

          <p className="text-gray-400 mt-3">
            Invite your friends to join DOLLARSPLAY.
          </p>
        </div>

        <section className="rounded-3xl border border-purple-700/40 bg-[#160e27] p-6">
          <h2 className="text-xl font-bold mb-3">
            Your Referral Code
          </h2>

          <div className="flex gap-2 items-center">
            <div className="min-w-0 flex-1 rounded-xl bg-[#0c0716] border border-purple-700/50 p-4 overflow-hidden">
              <p className="text-lime-400 text-sm break-all">
                {referralCode}
              </p>
            </div>

            <button
              onClick={() => copyText(referralCode)}
              className="rounded-xl bg-lime-400 px-4 py-4 font-bold text-black"
            >
              Copy
            </button>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-3">
            Your Referral Link
          </h2>

          <div className="rounded-xl bg-[#0c0716] border border-purple-700/50 p-4">
            <p className="text-sm text-gray-300 break-all">
              {referralLink}
            </p>
          </div>

          <button
            onClick={() => copyText(referralLink)}
            className="w-full mt-4 rounded-xl bg-lime-400 py-4 font-bold text-black"
          >
            Copy Referral Link
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Join DOLLARSPLAY",
                  text: "Join me on DOLLARSPLAY!",
                  url: referralLink,
                }).catch(() => {});
              } else {
                copyText(referralLink);
              }
            }}
            className="w-full mt-3 rounded-xl border border-purple-500 py-4 font-bold text-white"
          >
            Share With Friends
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-lime-400">
              {message}
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-purple-700/40 bg-[#160e27] p-5 mt-6">
          <h2 className="font-bold text-lg">
            Referral Rewards
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Referral tracking and coin rewards will be activated after secure signup integration.
          </p>
        </section>
      </div>
    </main>
  );
                                           }
          
