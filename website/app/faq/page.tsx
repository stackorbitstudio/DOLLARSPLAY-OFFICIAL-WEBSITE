import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

const faqs = [
  {
    question: "What is DollarsPlay?",
    answer:
      "DollarsPlay is a gaming and rewards platform where members can explore games, complete tasks and build referral networks.",
  },
  {
    question: "Is registration free?",
    answer:
      "Yes, creating a DollarsPlay account is free.",
  },
  {
    question: "What is DollarsPlay Coin?",
    answer:
      "DollarsPlay Coin is the platform's internal reward unit.",
  },
  {
    question: "How can I earn coins?",
    answer:
      "Eligible games, tasks and referral activities may provide rewards according to platform rules.",
  },
  {
    question: "How do referrals work?",
    answer:
      "Members can invite others using their personal referral link. Referral rewards will follow the platform's published rules.",
  },
  {
    question: "How can I withdraw my rewards?",
    answer:
      "Withdrawals will be available to eligible members after the required account and currency verification.",
  },
  {
    question: "Why must I verify my email?",
    answer:
      "Email verification helps confirm ownership of your registered email address.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Use the Forgot Password option on the login page to request a password reset email.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Visit the Contact Us page for information about contacting the DollarsPlay support team.",
  },
];

export default function FAQPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Frequently Asked Questions</h1>

        <p>
          Find answers to common questions about DollarsPlay.
        </p>

        {faqs.map((faq, index) => (
          <article key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </article>
        ))}

        <p>
          Still need help? Visit our{" "}
          <Link href={`${BASE_PATH}/contact/`}>
            Contact Us
          </Link>{" "}
          page.
        </p>

        <Link href={`${BASE_PATH}/`}>
          Back to Home
        </Link>
      </section>
    </main>
  );
    }
