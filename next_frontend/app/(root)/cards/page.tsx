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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  PlusCircle,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  TrendingUp,
  Calendar,
  Percent,
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function CardsPage() {
  const [showCardNumbers, setShowCardNumbers] = useState(false);

  const cards = [
    {
      id: 1,
      name: "Chase Freedom Unlimited",
      type: "Credit Card",
      number: "4532 1234 5678 9012",
      balance: 1234.56,
      limit: 5000,
      available: 3765.44,
      dueDate: "Jan 15, 2025",
      minPayment: 45.0,
      rewards: "1.5% Cash Back",
      gradient: "from-blue-500 to-cyan-600",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "American Express Gold",
      type: "Credit Card",
      number: "3782 822463 10005",
      balance: 2567.89,
      limit: 8000,
      available: 5432.11,
      dueDate: "Jan 20, 2025",
      minPayment: 76.0,
      rewards: "4x Points on Dining",
      gradient: "from-amber-500 to-orange-600",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "Wells Fargo Debit",
      type: "Debit Card",
      number: "5555 4444 3333 2222",
      balance: 2345.67,
      limit: 0,
      available: 2345.67,
      dueDate: null,
      minPayment: null,
      rewards: null,
      gradient: "from-emerald-500 to-teal-600",
      textColor: "text-white",
    },
  ];

  const cardSpending = [
    { month: "Jan", chase: 1200, amex: 800, wells: 400 },
    { month: "Feb", chase: 1100, amex: 900, wells: 350 },
    { month: "Mar", chase: 1300, amex: 750, wells: 500 },
    { month: "Apr", chase: 1000, amex: 850, wells: 300 },
    { month: "May", chase: 1150, amex: 950, wells: 450 },
    { month: "Jun", chase: 1250, amex: 700, wells: 400 },
  ];

  const rewardsData = [
    { category: "Dining", points: 1250, cashback: 0 },
    { category: "Gas", points: 450, cashback: 23.5 },
    { category: "Groceries", points: 890, cashback: 45.2 },
    { category: "Travel", points: 2340, cashback: 0 },
    { category: "Other", points: 340, cashback: 67.8 },
  ];

  const formatCardNumber = (number: string) => {
    if (!showCardNumbers) {
      return `•••• •••• •••• ${number.slice(-4)}`;
    }
    return number;
  };

  const calculateUtilization = (balance: number, limit: number) => {
    if (limit === 0) return 0;
    return (balance / limit) * 100;
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 30) return "text-emerald-600";
    if (utilization < 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg">
            <CreditCard className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cards
            </h1>
            <p className="text-muted-foreground">
              Manage your credit and debit cards
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCardNumbers(!showCardNumbers)}
            className="flex items-center gap-2">
            {showCardNumbers ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showCardNumbers ? "Hide" : "Show"} Numbers
          </Button>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-red-600 hover:to-orange-600 transition-all duration-300">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden relative`}>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}></div>
            <CardContent className={`relative z-10 p-6 ${card.textColor}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium">{card.type}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-1">
                    <Lock className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm opacity-90">Card Number</p>
                  <p className="text-lg font-mono tracking-wider">
                    {formatCardNumber(card.number)}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-90">Card Name</p>
                  <p className="font-medium">{card.name}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-90">
                      {card.type === "Credit Card" ? "Balance" : "Available"}
                    </p>
                    <p className="text-xl font-medium">
                      ${card.balance.toFixed(2)}
                    </p>
                  </div>
                  {card.limit > 0 && (
                    <div className="text-right">
                      <p className="text-sm opacity-90">Available</p>
                      <p className="text-lg font-medium">
                        ${card.available.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {card.limit > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credit Utilization</span>
                      <span>
                        {calculateUtilization(card.balance, card.limit).toFixed(
                          1
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={calculateUtilization(card.balance, card.limit)}
                      className="h-2 bg-white/20"
                    />
                  </div>
                )}

                {card.rewards && (
                  <div className="text-sm opacity-90">
                    <span className="font-medium">Rewards:</span> {card.rewards}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Card Details */}
      <Tabs
        defaultValue="spending"
        className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="rewards">Rewards & Points</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="spending">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Monthly Spending by Card</CardTitle>
              <CardDescription>
                Compare spending across all your cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer
                  width="100%"
                  height="100%">
                  <BarChart data={cardSpending}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                    />
                    <YAxis stroke="#64748b" />
                    <Bar
                      dataKey="chase"
                      fill="#3b82f6"
                      name="Chase Freedom"
                    />
                    <Bar
                      dataKey="amex"
                      fill="#f59e0b"
                      name="Amex Gold"
                    />
                    <Bar
                      dataKey="wells"
                      fill="#10b981"
                      name="Wells Fargo"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Chase Freedom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm">Amex Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Wells Fargo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Rewards Summary</CardTitle>
                <CardDescription>
                  Your earned rewards this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">5,270</p>
                    <p className="text-sm text-muted-foreground">
                      Points Earned
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">
                      $136.50
                    </p>
                    <p className="text-sm text-muted-foreground">Cash Back</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Rewards by Category</CardTitle>
                <CardDescription>Breakdown of your rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rewardsData.map((reward, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">{reward.category}</span>
                      <div className="text-right">
                        {reward.points > 0 && (
                          <span className="text-sm font-medium text-amber-600">
                            {reward.points} pts
                          </span>
                        )}
                        {reward.cashback > 0 && (
                          <span className="text-sm font-medium text-emerald-600">
                            ${reward.cashback}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Stay on top of your credit card payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cards
                  .filter((card) => card.dueDate)
                  .map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} bg-opacity-10`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{card.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Due {card.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${card.minPayment}</p>
                        <p className="text-sm text-muted-foreground">
                          Minimum Payment
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
