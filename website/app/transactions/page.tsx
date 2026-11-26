"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const BASE_PATH = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

interface Transaction {
  id: string;
  type?: string;
  amount?: number;
  description?: string;
  status?: string;
  createdAt?: { toDate?: () => Date };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      const user = auth.currentUser;

      if (!user) {
        window.location.href = `${BASE_PATH}/login/`;
        return;
      }

      try {
        const transactionsQuery = query(
          collection(db, "wallets", user.uid, "transactions"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(transactionsQuery);

        setTransactions(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          })) as Transaction[]
        );
      } catch {
        setError("Unable to load transaction history.");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  return (
    <main className="page-container">
      <section className="auth-card">
        <h1>Transaction History</h1>
        <p>View your DollarsPlay wallet activity.</p>

        {loading && <p>Loading transactions...</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && transactions.length === 0 && (
          <p>No transactions found.</p>
        )}

        {transactions.map((transaction) => (
          <article key={transaction.id}>
            <h2>{transaction.type || "Transaction"}</h2>
            <p>Amount: {transaction.amount ?? 0} Coins</p>
            <p>{transaction.description || "No description"}</p>
            <p>Status: {transaction.status || "Unknown"}</p>
            <p>
              {transaction.createdAt?.toDate
                ? transaction.createdAt.toDate().toLocaleString()
                : "Date unavailable"}
            </p>
          </article>
        ))}

        <Link href={`${BASE_PATH}/wallet/`}>
          Back to Wallet
        </Link>
      </section>
    </main>
  );
    }
