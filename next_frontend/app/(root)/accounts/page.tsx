"use client";

import { useEffect, useState } from "react";
import AccountCard from "@/components/AccountCard";
import AccountSummary from "@/components/AccountSummary";
import AccountsHeader from "@/components/AccountsHeader";
import { useAuth } from "@clerk/nextjs";

interface AccountsPageProps {
  setCurrentPage: (page: string) => void;
}

export default function AccountsPage({ setCurrentPage }: AccountsPageProps) {
  const [showBalances, setShowBalances] = useState(true);

  // const accounts = [
  //   {
  //     id: 1,
  //     name: "Main Checking",
  //     bank: "Chase Bank",
  //     type: "Checking",
  //     balance: 5432.1,
  //     lastUpdate: "2 hours ago",
  //     status: "connected",
  //     gradient: "from-blue-500 to-cyan-600",
  //   },
  //   {
  //     id: 2,
  //     name: "Emergency Savings",
  //     bank: "Bank of America",
  //     type: "Savings",
  //     balance: 12543.75,
  //     lastUpdate: "1 day ago",
  //     status: "connected",
  //     gradient: "from-emerald-500 to-teal-600",
  //   },
  //   {
  //     id: 3,
  //     name: "Freedom Credit Card",
  //     bank: "Chase Bank",
  //     type: "Credit Card",
  //     balance: -1234.56,
  //     lastUpdate: "3 hours ago",
  //     status: "connected",
  //     gradient: "from-purple-500 to-pink-600",
  //   },
  //   {
  //     id: 4,
  //     name: "Investment Account",
  //     bank: "Wells Fargo",
  //     type: "Investment",
  //     balance: 8765.43,
  //     lastUpdate: "1 day ago",
  //     status: "syncing",
  //     gradient: "from-orange-500 to-red-600",
  //   },
  // ];

  const formatBalance = (balance: number) => {
    if (!showBalances) return "••••••";
    return balance < 0
      ? `-$${Math.abs(balance).toFixed(2)}`
      : `$${balance.toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-emerald-100 text-emerald-800";
      case "syncing":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const token = await getToken();
        const response = await fetch("http://localhost:8080/api/accounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data: Account[] = await response.json();
        setAccounts(data);
      } catch (err: any) {
        console.error("Failed to fetch accounts:", err);
        //setError(err.message || "Unknown error");
      }
    }

    fetchAccounts();
  }, []);

  // Calculate summary values dynamically if needed
  const totalAssets = accounts.reduce(
    (sum, acc) => (acc.balance > 0 ? sum + acc.balance : sum),
    0
  );
  const totalDebt = accounts.reduce(
    (sum, acc) => (acc.balance < 0 ? sum + Math.abs(acc.balance) : sum),
    0
  );
  const netWorth = totalAssets - totalDebt;

  return (
    <div className="pt-10 lg:pt-10 p-6 space-y-6">
      <AccountsHeader
        showBalances={showBalances}
        toggleShowBalances={() => setShowBalances(!showBalances)}
        onAddAccount={() => setCurrentPage("add-bank")}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            showBalances={showBalances}
            formatBalance={formatBalance}
            getStatusColor={getStatusColor}
          />
        ))}
      </div>

      <AccountSummary
        showBalances={showBalances}
        totalAssets={totalAssets}
        totalDebt={totalDebt}
        netWorth={netWorth}
      />
    </div>
  );
}
