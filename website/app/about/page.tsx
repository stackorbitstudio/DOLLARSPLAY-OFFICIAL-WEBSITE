import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function AboutPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>About DollarsPlay</h1>

        <p>
          Welcome to DollarsPlay, a gaming and rewards platform
          designed to bring games, activities and community
          experiences together.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to create an engaging platform where
          members can explore games, participate in tasks and
          connect through a referral community.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Interactive games and challenges</li>
          <li>Activities and tasks</li>
          <li>A multi-level referral community</li>
          <li>DollarsPlay Coin wallet system</li>
        </ul>

        <p>
          Some features are still being developed and will become
          available as the platform grows.
        </p>

        <Link href={`${BASE_PATH}/`}>
          Back to Home
        </Link>
      </section>
    </main>
  );
}
