import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function NotificationsPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Notifications</h1>

        <p>
          Stay updated with important DollarsPlay account
          announcements and platform activities.
        </p>

        <div>
          <h2>Account Updates</h2>
          <p>No account notifications to display.</p>
        </div>

        <div>
          <h2>Games and Tasks</h2>
          <p>No new activity notifications.</p>
        </div>

        <div>
          <h2>Referral Updates</h2>
          <p>No referral notifications to display.</p>
        </div>

        <p>
          Live notifications will be connected after the
          notification system is implemented.
        </p>

        <Link href={`${BASE_PATH}/dashboard/`}>
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
