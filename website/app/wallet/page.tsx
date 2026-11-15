
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

interface WalletData {
  coinBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData>({
    coinBalance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeWallet: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeWallet) {
        unsubscribeWallet();
        unsubscribeWallet = undefined;
      }

      if (!user) {
        setError("Please log in to view your wallet.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      unsubscribeWallet = onSnapshot(
        doc(db, "wallets", user.uid),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();

            setWallet({
              coinBalance: Number(data.coinBalance) || 0,
              totalEarned: Number(data.totalEarned) || 0,
              totalWithdrawn: Number(data.totalWithdrawn) || 0,
            });

            setError("");
          } else {
            setError("Wallet record was not found.");
          }

          setLoading(false);
        },
        (err) => {
          console.error("WALLET ERROR:", err);
          setError("Unable to load wallet. Please try again later.");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeWallet) unsubscribeWallet();
    };
  }, []);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">DOLLARSPLAY WALLET</span>

        <h1>My Wallet</h1>

        <p className="auth-subtitle">
          View your DollarsPlay Coin balance and account totals.
        </p>

        {loading && (
          <div className="auth-message">
            Loading wallet...
          </div>
        )}

        {error && (
          <div className="auth-message error-message">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="wallet-balance">
              <p>Available Coin Balance</p>
              <h2>{wallet.coinBalance.toLocaleString()}</h2>
              <span>DollarsPlay Coins</span>
            </div>

            <div className="wallet-stats">
              <div className="wallet-stat">
                <span>Total Earned</span>
                <strong>
                  {wallet.totalEarned.toLocaleString()}
                </strong>
              </div>

              <div className="wallet-stat">
                <span>Total Withdrawn</span>
                <strong>
                  {wallet.totalWithdrawn.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="wallet-history">
              <h2>Transaction History</h2>
              <p>
                Your transaction history will appear here
                when the secure transaction system is activated.
              </p>
            </div>
          </>
        )}

        <Link
          href="/dashboard/"
          className="back-home"
        >
          ← Back to Dashboard
        </Link>
      </section>
    </main>
  );
    }
