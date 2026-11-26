import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function LeaderboardPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Leaderboard</h1>

        <p>
          Discover top-performing members of the DollarsPlay
          community.
        </p>

        <div>
          <h2>Top Players</h2>
          <p>Player rankings will appear here.</p>
        </div>

        <div>
          <h2>Top Referrers</h2>
          <p>Referral rankings will appear here.</p>
        </div>

        <div>
          <h2>Top Earners</h2>
          <p>Eligible earnings rankings will appear here.</p>
        </div>

        <p>
          Rankings are not yet connected to live platform data.
        </p>

        <Link href={`${BASE_PATH}/dashboard/`}>
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
