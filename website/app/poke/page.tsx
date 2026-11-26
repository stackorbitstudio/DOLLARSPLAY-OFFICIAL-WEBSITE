import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function PokePage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Referral Poke</h1>

        <p>
          Send a friendly poke to eligible members of your
          referral network.
        </p>

        <article>
          <h2>Daily Poke Limit</h2>
          <p>
            Each member can send one poke within every 24-hour
            period.
          </p>
        </article>

        <article>
          <h2>Upline Network</h2>
          <p>
            Connect with eligible upline members within five levels.
          </p>
        </article>

        <article>
          <h2>Downline Network</h2>
          <p>
            Connect with eligible downline members within five levels.
          </p>
        </article>

        <button type="button" disabled>
          Send Poke — Coming Soon
        </button>

        <p>
          Poke history and the 24-hour restriction will be
          controlled by the trusted backend.
        </p>

        <Link href={`${BASE_PATH}/dashboard/`}>
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
          }
