import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function ContactPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Contact Us</h1>

        <p>
          Have a question or need help with DollarsPlay?
          We are here to assist you.
        </p>

        <h2>Customer Support</h2>
        <p>
          For account, technical or platform-related questions,
          please contact our support team.
        </p>

        <h2>Email Support</h2>
        <p>
          Our official support email address will be published here.
        </p>

        <p>
          Please do not share your password or sensitive account
          information when contacting support.
        </p>

        <Link href={`${BASE_PATH}/`}>
          Back to Home
        </Link>
      </section>
    </main>
  );
}
