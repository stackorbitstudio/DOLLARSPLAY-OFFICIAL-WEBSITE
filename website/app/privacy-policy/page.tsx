import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function PrivacyPolicyPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Privacy Policy</h1>

        <p>
          DollarsPlay respects your privacy. This page explains
          how information may be collected and used when you
          access our platform.
        </p>

        <h2>Information We Collect</h2>
        <p>
          Depending on the features you use, information may
          include your display name, email address, profile
          picture, country, currency preference and account activity.
        </p>

        <h2>How We Use Information</h2>
        <ul>
          <li>To create and manage user accounts.</li>
          <li>To provide platform features and support.</li>
          <li>To maintain wallet and activity records.</li>
          <li>To protect the platform against misuse.</li>
        </ul>

        <h2>Information Security</h2>
        <p>
          We aim to protect user information through appropriate
          security measures. No online service can guarantee
          absolute security.
        </p>

        <h2>Sharing of Information</h2>
        <p>
          Personal information is not intended to be publicly
          displayed. Limited information may be processed by
          service providers required to operate the platform.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may contact our support team regarding your account
          information or privacy questions.
        </p>

        <p>
          This policy must be reviewed and finalized before the
          platform launches publicly.
        </p>

        <Link href={`${BASE_PATH}/`}>Back to Home</Link>
      </section>
    </main>
  );
}
