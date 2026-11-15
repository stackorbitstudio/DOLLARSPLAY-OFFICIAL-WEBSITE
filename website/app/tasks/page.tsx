
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const LOGIN_URL =
  "https://stackorbitstudio.github.io/DOLLARSPLAY-OFFICIAL-WEBSITE-/login/";

const tasks = [
  {
    icon: "📅",
    title: "Daily Check-in",
    description: "Visit DOLLARSPLAY daily.",
    reward: "Reward system coming soon",
  },
  {
    icon: "🎬",
    title: "Watch Videos",
    description: "Watch available videos and complete tasks.",
    reward: "Reward system coming soon",
  },
  {
    icon: "📱",
    title: "Social Tasks",
    description: "Complete approved social media activities.",
    reward: "Reward system coming soon",
  },
  {
    icon: "⭐",
    title: "Special Tasks",
    description: "Take part in special platform activities.",
    reward: "Reward system coming soon",
  },
];

export default function TasksPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.replace(LOGIN_URL);
        return;
      }

      if (!user.emailVerified) {
        await signOut(auth);
        window.location.replace(LOGIN_URL);
      }
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

  return (
    <main className="min-h-screen bg-[#090611] text-white px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/dashboard/"
          className="text-lime-400 text-sm"
        >
          ← Back to Dashboard
        </Link>

        <div className="text-center mt-10 mb-10">
          <h1 className="text-3xl font-extrabold">
            DOLLARS<span className="text-lime-400">PLAY</span>
          </h1>

          <h2 className="text-2xl font-bold mt-5">
            Tasks <span className="text-lime-400">Zone</span>
          </h2>

          <p className="text-gray-400 mt-2">
            Complete tasks and explore new opportunities.
          </p>
        </div>

        <div className="rounded-2xl border border-lime-400/30 bg-[#151326] p-5 mb-7 text-center">
          <p className="text-gray-400 text-sm">Task Rewards</p>
          <p className="text-lime-400 font-bold text-lg mt-2">
            Coming Soon
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Verified task completion and secure coin rewards are being prepared.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="rounded-2xl border border-purple-700/40 bg-[#160e27] p-6"
            >
              <div className="text-4xl mb-4">{task.icon}</div>

              <h3 className="text-xl font-bold">
                {task.title}
              </h3>

              <p className="text-sm text-gray-400 mt-3">
                {task.description}
              </p>

              <div className="mt-5 rounded-xl bg-[#0c0716] p-3">
                <p className="text-sm text-lime-400">
                  {task.reward}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
  }
          
