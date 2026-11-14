
"use client";

import { useEffect, useState } from "react";

export default function TapChallengePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && timeLeft <= 0) {
      setIsPlaying(false);
      setFinished(true);
    }
  }, [timeLeft, isPlaying]);

  function startGame() {
    setScore(0);
    setTimeLeft(10);
    setFinished(false);
    setIsPlaying(true);
  }

  function handleTap() {
    if (isPlaying) {
      setScore((previous) => previous + 1);
    }
  }

  return (
    <main className="min-h-screen bg-[#090611] text-white px-5 py-8">
      <div className="max-w-lg mx-auto">

        <a
          href="/DOLLARSPLAY-OFFICIAL-WEBSITE-/games/"
          className="text-lime-400 text-sm"
        >
          ← Back to Games
        </a>

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
