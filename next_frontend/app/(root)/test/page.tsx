"use client"; // change

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlaidLink from "@/components/PlaidLink";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const router = useRouter();
  const [banks, setBanks] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<AccountBalance[]>([]);

  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchBanks = async () => {
      if (!isLoaded || !isSignedIn) {
        return;
      }
      const token = await getToken();
      try {
        const response = await fetch("http://localhost:8080/api/banks/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBanks(data);
        } else {
          console.error("Failed to fetch banks");
        }
      } catch (err) {
        console.error("Error fetching banks:", err);
      }
    };
    fetchBanks();
  }, [getToken, isLoaded, isSignedIn]);

  const handleLogout = async () => {
    const token = await getToken();
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRemoveBank = async (bankId: string) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:8080/api/banks/${bankId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setBanks((prev) => prev.filter((bank) => bank.id !== bankId));
      } else {
        console.error("Failed to remove bank");
      }
    } catch (err) {
      console.error("Error removing bank:", err);
    }
  };

  const syncTransactions = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:8080/api/transactions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // parse JSON body
      console.log("Transactions:", data);
    } catch (err) {
      console.error("Error getting transactions:", err);
    }
  };

  const displayTransactions = async () => {
    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:8080/api/transactions/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const normalized = data.transactions.map(normalizeTransaction);
      setTransactions(normalized);
    } catch (err) {
      console.error("Error getting transactions:", err);
    }
  };
  const normalizeTransaction = (t: any) => ({
    id: t.ID,
    userGoogleID: t.UserGoogleID,
    accountID: t.AccountID,
    category: t.Category,
    date: t.Date,
    authorizedDate: t.AuthorizedDate,
    name: t.Name,
    amount: t.Amount,
    currencyCode: t.CurrencyCode,
    pendingTransactionID: t.PendingTransactionID,
  });

  const getBalances = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("User token not available");
      }
      const res = await fetch("http://localhost:8080/api/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();

      setBalances(data);
    } catch (err) {
      console.error("Failed to fetch balances:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <PlaidLink variant="primary" />

      <button
        onClick={handleLogout}
        style={{ marginLeft: "1rem" }}>
        Logout
      </button>
      <button
        onClick={syncTransactions}
        style={{ marginLeft: "1rem" }}>
        Sync
      </button>
      <button
        onClick={displayTransactions}
        style={{ marginLeft: "1rem" }}>
        display
      </button>
      <button
        onClick={getBalances}
        style={{ marginLeft: "1rem" }}>
        balance
      </button>

      <h2>Connected Banks</h2>
      {banks.length === 0 ? (
        <p>No banks connected yet.</p>
      ) : (
        <ul>
          {banks.map((bank) => (
            <li
              key={bank.id}
              style={{ marginBottom: "0.5rem" }}>
              {bank.bank_name}
              <button
                onClick={() => handleRemoveBank(bank.id)}
                style={{ marginLeft: "1rem", color: "red" }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td className="border px-2 py-1">{txn.date}</td>
                <td className="border px-2 py-1">{txn.name}</td>
                <td className="border px-2 py-1">{txn.category}</td>
                <td className="border px-2 py-1">${txn.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Account Balances</h2>
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Account</th>
              <th className="border px-4 py-2">Current</th>
              <th className="border px-4 py-2">Available</th>
              <th className="border px-4 py-2">Currency</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((bal) => (
              <tr key={bal.AccountID}>
                <td className="border px-4 py-2">{bal.Name}</td>
                <td className="border px-4 py-2">{bal.Current}</td>
                <td className="border px-4 py-2">{bal.Available}</td>
                <td className="border px-4 py-2">{bal.Currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
