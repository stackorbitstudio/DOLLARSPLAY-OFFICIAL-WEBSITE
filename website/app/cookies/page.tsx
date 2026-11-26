import Link from "next/link";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function CookiePolicyPage() {
  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Cookie Policy</h1>

        <p>
          This page explains how DollarsPlay may use cookies
          and similar technologies.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small data files stored by websites
          on your device to support website functionality.
        </p>

        <h2>How We May Use Cookies</h2>
        <ul>
          <li>To support essential website functionality.</li>
          <li>To remember certain user preferences.</li>
          <li>To understand website performance.</li>
          <li>To improve the user experience.</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          Some services integrated into DollarsPlay may use
          their own cookies or similar technologies.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          You can manage or delete cookies through your
          browser settings. Disabling some cookies may affect
          website functionality.
        </p>

        <p>
          This policy must be updated to reflect the actual
          technologies used before public launch.
        </p>

        <Link href={`${BASE_PATH}/`}>Back to Home</Link>
      </section>
    </main>
  );
      }
