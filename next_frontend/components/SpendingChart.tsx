"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";

const mockSpendingData = [
  { month: "Jan", spending: 2400, income: 3200 },
  { month: "Feb", spending: 1398, income: 3200 },
  { month: "Mar", spending: 9800, income: 3200 },
  { month: "Apr", spending: 3908, income: 3500 },
  { month: "May", spending: 4800, income: 3500 },
  { month: "Jun", spending: 3800, income: 3500 },
  { month: "Jul", spending: 4300, income: 3800 },
];

export function SpendingChart() {
  return (
    <Card className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="group-hover:text-primary transition-colors duration-300">
            Spending vs Income Trends
          </CardTitle>
        </div>
        <CardDescription>
          Monthly comparison of your spending and income over the last 7 months
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <ResponsiveContainer
          width="100%"
          height={350}>
          <AreaChart data={mockSpendingData}>
            <defs>
              <linearGradient
                id="spendingGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="incomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="month"
              stroke="#64748b"
            />
            <YAxis stroke="#64748b" />
            <Tooltip
              formatter={(value, name) => [
                `$${value}`,
                name === "spending" ? "Spending" : "Income",
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#spendingGradient)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#incomeGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
