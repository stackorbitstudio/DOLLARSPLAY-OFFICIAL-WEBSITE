import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Register for free, verify your email and complete your profile.",
  },
  {
    number: "02",
    title: "Explore Games",
    description:
      "Discover available games and enjoy interactive challenges.",
  },
  {
    number: "03",
    title: "Complete Tasks",
    description:
      "Explore eligible tasks and follow their instructions.",
  },
  {
    number: "04",
    title: "Build Your Network",
    description:
      "Invite others using your personal referral link.",
  },
  {
    number: "05",
    title: "Manage Your Wallet",
    description:
      "View your DollarsPlay Coin balance and eligible rewards.",
  },
  {
    number: "06",
    title: "Request Withdrawals",
    description:
      "Complete required verification and request eligible withdrawals.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>How DollarsPlay Works</h1>

        <p>
          Follow these steps to get started with the DollarsPlay
          platform.
        </p>

        {steps.map((step) => (
          <article key={step.number}>
            <h2>
              {step.number}. {step.title}
            </h2>
            <p>{step.description}</p>
          </article>
        ))}

        <p>
          Some features are still under development. Availability
          and rewards depend on the published platform rules.
        </p>

        <Link href={`${BASE_PATH}/signup/`}>
          Create Your Account
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
