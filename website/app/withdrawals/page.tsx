
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

type PaymentMethod =
  | "Easypaisa"
  | "JazzCash"
  | "SadaPay"
  | "Bank Transfer";

interface WalletData {
  coinBalance: number;
}

export default function WithdrawalsPage() {
  const [wallet, setWallet] = useState<WalletData>({
    coinBalance: 0,
  });

  const [method, setMethod] =
    useState<PaymentMethod>("Easypaisa");

  const [accountTitle, setAccountTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let unsubscribeWallet: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeWallet) {
        unsubscribeWallet();
        unsubscribeWallet = undefined;
      }

      if (!user) {
        setLoggedIn(false);
        setError("Please log in to view withdrawals.");
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      setLoading(true);
      setError("");

      unsubscribeWallet = onSnapshot(
        doc(db, "wallets", user.uid),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();

            setWallet({
              coinBalance: Number(data.coinBalance) || 0,
            });

            setError("");
          } else {
            setError("Wallet record was not found.");
          }

          setLoading(false);
        },
        (err) => {
          console.error("WITHDRAWAL WALLET ERROR:", err);
          setError("Unable to load your wallet. Please try again.");
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
        <span className="eyebrow">DOLLARSPLAY</span>

        <h1>Withdrawals</h1>

        <p className="auth-subtitle">
          Manage your withdrawal details and requests.
        </p>

        {loading && (
          <div className="auth-message">
            Loading your wallet...
          </div>
        )}

        {error && (
          <div className="auth-message error-message">
            {error}
          </div>
        )}

        {!loading && loggedIn && !error && (
          <>
            <div className="wallet-balance">
              <p>Available Coin Balance</p>
              <h2>{wallet.coinBalance.toLocaleString()}</h2>
              <span>DollarsPlay Coins</span>
            </div>

            <div className="wallet-history">
              <h2>Withdrawal Method</h2>

              <p>
                Select your preferred payment method.
              </p>

              <div className="withdrawal-methods">
                {(
                  [
                    "Easypaisa",
                    "JazzCash",
                    "SadaPay",
                    "Bank Transfer",
                  ] as PaymentMethod[]
                ).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      method === item
                        ? "withdrawal-method selected"
                        : "withdrawal-method"
                    }
                    onClick={() => setMethod(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="wallet-history">
              <h2>Payment Account Details</h2>

              <label className="withdrawal-label">
                Account Holder Name
              </label>

              <input
                className="withdrawal-input"
                type="text"
                value={accountTitle}
                onChange={(e) =>
                  setAccountTitle(e.target.value)
                }
                placeholder="Enter account holder name"
              />

              <label className="withdrawal-label">
                {method === "Bank Transfer"
                  ? "Bank Account Number / IBAN"
                  : "Mobile Account Number"}
              </label>

              <input
                className="withdrawal-input"
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value)
                }
                placeholder={
                  method === "Bank Transfer"
                    ? "Enter your IBAN"
                    : "03XXXXXXXXX"
                }
              />

              <label className="withdrawal-label">
                Withdrawal Amount (Coins)
              </label>

              <input
                className="withdrawal-input"
                type="number"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Enter coin amount"
              />

              <button
                type="button"
                className="withdrawal-submit"
                disabled
              >
                Withdrawal Requests Coming Soon
              </button>

              <p className="auth-subtitle">
                Withdrawal requests will be activated after
                the secure payment and admin approval system
                is ready. No request or payment is being
                submitted at this stage.
              </p>
            </div>

            <div className="wallet-history">
              <h2>Withdrawal History</h2>
              <p>
                Your withdrawal requests and their statuses
                will appear here once the system is activated.
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

      <style jsx>{`
        .withdrawal-methods {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 16px;
        }

        .withdrawal-method {
          padding: 13px 8px;
          border: 1px solid #555;
          border-radius: 10px;
          background: transparent;
          color: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .withdrawal-method.selected {
          border-color: #39e75f;
          background: rgba(57, 231, 95, 0.12);
          color: #39e75f;
        }

        .withdrawal-label {
          display: block;
          margin: 16px 0 7px;
          font-size: 14px;
          font-weight: 600;
        }

        .withdrawal-input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 13px;
          border: 1px solid #777;
          border-radius: 9px;
          background: transparent;
          color: inherit;
          font-size: 16px;
        }

        .withdrawal-submit {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          border: 0;
          border-radius: 9px;
          background: #555;
          color: white;
          font-weight: 700;
          opacity: 0.8;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}
