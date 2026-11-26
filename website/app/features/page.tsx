import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

const features = [
  {
    title: "Interactive Games",
    description:
      "Explore engaging games and challenges on the DollarsPlay platform.",
  },
  {
    title: "Tasks and Activities",
    description:
      "Discover activities and complete eligible tasks.",
  },
  {
    title: "Multi-Level Referrals",
    description:
      "Build your referral network through a structured five-level system.",
  },
  {
    title: "DollarsPlay Coin",
    description:
      "Track your internal platform coin balance through your wallet.",
  },
  {
    title: "Wallet Management",
    description:
      "View your coin balance, earnings and transaction history.",
  },
  {
    title: "Withdrawals",
    description:
      "Access withdrawal features after completing required verification.",
  },
  {
    title: "Community Chat",
    description:
      "Connect with eligible members through upline and downline group spaces.",
  },
  {
    title: "Profile Management",
    description:
      "Manage your display name and profile picture.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>DollarsPlay Features</h1>

        <p>
          Discover the features planned for the DollarsPlay
          gaming and rewards platform.
        </p>

        {features.map((feature) => (
          <article key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}

        <p>
          Some features are still under development and will
          become available as they are completed.
        </p>

        <Link href={`${BASE_PATH}/signup/`}>
          Get Started
        </Link>

        <p>
          <Link href={`${BASE_PATH}/`}>
            Back to Home
          </Link>
        </p>
      </section>
    </main>
  );
  }
