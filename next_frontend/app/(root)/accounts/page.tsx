"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard, PlusCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AccountsPageProps {
  setCurrentPage: (page: string) => void;
}

export default function AccountsPage({ setCurrentPage }: AccountsPageProps) {
  const [showBalances, setShowBalances] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Main Checking",
      bank: "Chase Bank",
      type: "Checking",
      balance: 5432.1,
      lastUpdate: "2 hours ago",
      status: "connected",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      name: "Emergency Savings",
      bank: "Bank of America",
      type: "Savings",
      balance: 12543.75,
      lastUpdate: "1 day ago",
      status: "connected",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      name: "Freedom Credit Card",
      bank: "Chase Bank",
      type: "Credit Card",
      balance: -1234.56,
      lastUpdate: "3 hours ago",
      status: "connected",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "Investment Account",
      bank: "Wells Fargo",
      type: "Investment",
      balance: 8765.43,
      lastUpdate: "1 day ago",
      status: "syncing",
      gradient: "from-orange-500 to-red-600",
    },
  ];

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

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
            <Wallet className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Accounts
            </h1>
            <p className="text-muted-foreground">
              Manage your connected bank accounts and cards
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="flex items-center gap-2">
            {showBalances ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showBalances ? "Hide" : "Show"} Balances
          </Button>
          <Button
            onClick={() => setCurrentPage("add-bank")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card
            key={account.id}
            className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${account.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${account.gradient} bg-opacity-10`}>
                  {account.type === "Credit Card" ? (
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Wallet className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <Badge className={getStatusColor(account.status)}>
                  {account.status}
                </Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors duration-300">
                {account.name}
              </CardTitle>
              <CardDescription>
                {account.bank} • {account.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div
                className={`text-2xl mb-2 ${
                  account.balance < 0 ? "text-red-600" : "text-emerald-600"
                }`}>
                {formatBalance(account.balance)}
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Last updated {account.lastUpdate}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-primary/5">
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-3 hover:bg-primary/5">
                  ⚙️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Account Summary */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5">
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>
            Overview of all your connected accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl text-emerald-600 mb-1">
                {showBalances ? "$25,506.72" : "••••••"}
              </div>
              <div className="text-sm text-muted-foreground">Total Assets</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl text-red-600 mb-1">
                {showBalances ? "$1,234.56" : "••••••"}
              </div>
              <div className="text-sm text-muted-foreground">Total Debt</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl text-primary mb-1">
                {showBalances ? "$24,272.16" : "••••••"}
              </div>
              <div className="text-sm text-muted-foreground">Net Worth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
