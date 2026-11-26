import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function TermsPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Terms & Conditions</h1>

        <p>
          By accessing or using DollarsPlay, you agree to follow
          these Terms & Conditions.
        </p>

        <h2>1. Account Registration</h2>
        <p>
          Users must provide accurate registration information
          and keep their account credentials secure.
        </p>

        <h2>2. Acceptable Use</h2>
        <p>
          Users must not exploit bugs, manipulate games, create
          fraudulent accounts or interfere with platform operations.
        </p>

        <h2>3. Games and Tasks</h2>
        <p>
          Games and tasks must be completed according to their
          published rules. Rewards are subject to platform
          verification and applicable eligibility requirements.
        </p>

        <h2>4. DollarsPlay Coin</h2>
        <p>
          DollarsPlay Coin is an internal platform reward unit.
          Conversion rates and eligible uses are determined by
          the platform and may be updated.
        </p>

        <h2>5. Withdrawals</h2>
        <p>
          Withdrawal requests are subject to account verification,
          eligibility checks, available funds and the platform's
          published withdrawal rules.
        </p>

        <h2>6. Account Restrictions</h2>
        <p>
          Accounts involved in fraud, abuse or prohibited activity
          may be restricted or suspended, subject to applicable law.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          These terms may be updated as the platform develops.
          Updated terms will be published on this page.
        </p>

        <p>
          These draft terms require legal review before public launch.
        </p>

        <Link href={`${BASE_PATH}/`}>Back to Home</Link>
      </section>
    </main>
  );
          }
