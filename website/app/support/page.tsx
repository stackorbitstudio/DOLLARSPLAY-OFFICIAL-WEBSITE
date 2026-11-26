import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

const topics = [
  {
    title: "Account Support",
    description: "Help with registration, login and email verification.",
  },
  {
    title: "Wallet Support",
    description: "Information about DollarsPlay Coin and wallet records.",
  },
  {
    title: "Withdrawal Support",
    description: "Help with withdrawal eligibility and account verification.",
  },
  {
    title: "Games and Tasks",
    description: "Assistance with games, challenges and platform tasks.",
  },
  {
    title: "Referral Support",
    description: "Help with referral links and referral network questions.",
  },
];

export default function SupportPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Support Center</h1>

        <p>
          Find help with your DollarsPlay account and platform features.
        </p>

        {topics.map((topic) => (
          <article key={topic.title}>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
          </article>
        ))}

        <p>
          For additional assistance, visit our Contact Us page.
        </p>

        <Link href={`${BASE_PATH}/contact/`}>
          Contact Support
        </Link>

        <p>
          <Link href={`${BASE_PATH}/faq/`}>
            Frequently Asked Questions
          </Link>
        </p>

        <Link href={`${BASE_PATH}/`}>
          Back to Home
        </Link>
      </section>
    </main>
  );
                    }
