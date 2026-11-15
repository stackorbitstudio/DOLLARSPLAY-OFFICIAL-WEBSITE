
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

const LOGIN_URL =
  "https://stackorbitstudio.github.io/DOLLARSPLAY-OFFICIAL-WEBSITE-/login/";

export default function TapChallengePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return;

      if (!user) {
        setAuthorized(false);
        window.location.replace(LOGIN_URL);
        return;
      }

      if (!user.emailVerified) {
        setAuthorized(false);
        await signOut(auth);

        if (active) {
          window.location.replace(LOGIN_URL);
        }
        return;
      }

      setAuthorized(true);
      setLoading(false);
    });

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !auth.currentUser) {
        window.location.replace(LOGIN_URL);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      active = false;
      unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || !authorized) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, authorized]);

  useEffect(() => {
    if (isPlaying && timeLeft <= 0) {
      setTimeLeft(0);
      setIsPlaying(false);
      setFinished(true);
    }
  }, [timeLeft, isPlaying]);

  function startGame() {
    if (!authorized) return;

    setScore(0);
    setTimeLeft(10);
    setFinished(false);
    setIsPlaying(true);
  }

  function handleTap() {
    if (isPlaying && authorized) {
      setScore((previous) => previous + 1);
    }
  }

  if (loading || !authorized) {
    return (
      <main className="min-h-screen bg-[#090611] flex items-center justify-center text-lime-400">
        Loading Tap Challenge...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white px-5 py-8">
      <div className="max-w-lg mx-auto">
        <Link
          href="/games/"
          className="text-lime-400 text-sm"
        >
          ← Back to Games
        </Link>

        <div className="text-center mt-12">
          <h1 className="text-3xl font-extrabold">
            TAP <span className="text-lime-400">CHALLENGE</span>
          </h1>

          <p className="text-gray-400 mt-3">
            Tap as fast as you can in 10 seconds!
          </p>
        </div>

        <section className="grid grid-cols-2 gap-4 mt-10">
          <div className="rounded-2xl border border-purple-700/40 bg-[#160e27] p-5 text-center">
            <p className="text-gray-400 text-sm">Time Left</p>
            <p className="text-4xl font-extrabold text-lime-400 mt-2">
              {timeLeft}s
            </p>
          </div>

          <div className="rounded-2xl border border-purple-700/40 bg-[#160e27] p-5 text-center">
            <p className="text-gray-400 text-sm">Your Score</p>
            <p className="text-4xl font-extrabold text-white mt-2">
              {score}
            </p>
          </div>
        </section>

        <button
          onClick={handleTap}
          disabled={!isPlaying}
          className="w-full h-56 mt-8 rounded-3xl border-2 border-lime-400 bg-gradient-to-br from-purple-900 to-[#160e27] text-4xl font-extrabold text-lime-400 disabled:opacity-50 active:scale-95 transition"
        >
          {isPlaying ? "TAP!" : finished ? "TIME UP!" : "READY?"}
        </button>

        {finished && (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold text-lime-400">
              Game Over!
            </h2>
            <p className="text-gray-300 mt-2">
              Your final score: {score} taps
            </p>
          </div>
        )}

        <button
          onClick={startGame}
          disabled={isPlaying}
          className="w-full mt-6 rounded-xl bg-lime-400 py-4 font-bold text-black disabled:opacity-40"
        >
          {finished ? "PLAY AGAIN" : isPlaying ? "GAME RUNNING..." : "START GAME"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          This is a practice game. Coin rewards are not enabled yet.
        </p>
      </div>
    </main>
  );
      }
        
