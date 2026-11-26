"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { countries } from "../../lib/countries";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export default function CurrencySettingsPage() {
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCountry() {
      const user = auth.currentUser;

      if (!user) {
        window.location.href = `${BASE_PATH}/login/`;
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));

        if (snapshot.exists()) {
          const country = snapshot.data().country;
          setCountryCode(country?.code || "");
        }
      } catch {
        setMessage("Unable to load your country information.");
      } finally {
        setLoading(false);
      }
    }

    loadCountry();
  }, []);

  const selectedCountry = countries.find(
    (country) => country.code === countryCode
  );

  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Country & Currency Settings</h1>

        <p>
          Review the country and local currency selected
          during registration.
        </p>

        {loading ? (
          <p>Loading account information...</p>
        ) : (
          <>
            <h2>Registered Country</h2>
            <p>{selectedCountry?.name || "Not available"}</p>

            <h2>Local Currency</h2>
            <p>
              {selectedCountry
                ? `${selectedCountry.currencyCode} (${selectedCountry.currencySymbol})`
                : "Not available"}
            </p>

            <p>
              Country and currency changes require verification
              and secure account processing.
            </p>
          </>
        )}

        {message && <p role="alert">{message}</p>}

        <Link href={`${BASE_PATH}/withdrawals/`}>
          Go to Withdrawals
        </Link>

        <p>
          <Link href={`${BASE_PATH}/dashboard/`}>
            Back to Dashboard
          </Link>
        </p>
      </section>
    </main>
  );
            }
