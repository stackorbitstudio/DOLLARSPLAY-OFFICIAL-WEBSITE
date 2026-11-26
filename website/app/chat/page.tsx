import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function ChatPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Referral Community Chat</h1>

        <p>
          Connect with eligible members in your referral network.
        </p>

        <article>
          <h2>Upline Group</h2>
          <p>
            A community space for eligible sponsors and upline
            members within five referral levels.
          </p>
          <button type="button" disabled>
            Open Upline Chat — Coming Soon
          </button>
        </article>

        <article>
          <h2>Downline Group</h2>
          <p>
            A community space for eligible members in your
            downline within five referral levels.
          </p>
          <button type="button" disabled>
            Open Downline Chat — Coming Soon
          </button>
        </article>

        <p>
          Community messages will follow DollarsPlay's moderation
          and privacy policies.
        </p>

        <Link href={`${BASE_PATH}/dashboard/`}>
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
    }
