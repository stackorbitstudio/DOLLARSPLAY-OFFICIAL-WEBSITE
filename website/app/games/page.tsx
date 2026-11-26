
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const BASE = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

const games = [
  {
    name: "Tap Challenge",
    description: "Tap as many times as you can in 10 seconds.",
    icon: "👆",
    status: "Available",
    link: `${BASE}/games/tap-challenge/`,
  },
  {
    name: "Coming Soon",
    description: "A new exciting game is on the way.",
    icon: "🎯",
    status: "Coming Soon",
    link: "",
  },
  {
    name: "Coming Soon",
    description: "More games will be added soon.",
    icon: "🧩",
    status: "Coming Soon",
    link: "",
  },
];

export default function GamesPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return;

      if (!user) {
        setAuthorized(false);
        window.location.replace(`${BASE}/login/`);
        return;
      }

      if (!user.emailVerified) {
        setAuthorized(false);
        await signOut(auth);

        if (active) {
          window.location.replace(`${BASE}/login/`);
        }
        return;
      }

      setAuthorized(true);
      setLoading(false);
    });

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && !auth.currentUser) {
        window.location.replace(`${BASE}/login/`);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      active = false;
      unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  if (loading || !authorized) {
    return (
      <main className="min-h-screen bg-[#090611] flex items-center justify-center text-lime-400">
        Loading Games...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href={`${BASE}/dashboard/`}
          className="text-lime-400 text-sm"
        >
          ← Back to Dashboard
        </Link>

        <div className="text-center mt-10 mb-10">
          <h1 className="text-3xl font-extrabold">
            DOLLARS<span className="text-lime-400">PLAY</span>
          </h1>

          <h2 className="text-2xl font-bold mt-5">
            Games <span className="text-lime-400">Zone</span>
          </h2>

          <p className="text-gray-400 mt-2">
            Choose your favourite game and start playing!
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {games.map((game, index) => (
            <div
              key={index}
              className="rounded-2xl border border-purple-700/40 bg-[#160e27] p-6 text-center"
            >
              <div className="text-5xl mb-5">{game.icon}</div>

              <h3 className="text-xl font-bold">{game.name}</h3>

              <p className="text-sm text-gray-400 mt-3 mb-5">
                {game.description}
              </p>

              {game.link ? (
                <Link
                  href={game.link}
                  className="block rounded-xl bg-lime-400 py-3 font-bold text-black"
                >
                  PLAY NOW
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full rounded-xl bg-purple-900/50 py-3 text-gray-400"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-gray-500 mt-10">
          More exciting games are coming to DOLLARSPLAY.
        </p>
      </div>
    </main>
  );
  }
            
