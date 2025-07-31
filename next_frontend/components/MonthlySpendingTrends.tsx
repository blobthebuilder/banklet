import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Monthly Financial Trends</CardTitle>
        <CardDescription>
          Track your income, spending, and savings over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="month"
                stroke="#64748b"
              />
              <YAxis stroke="#64748b" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="#ef4444"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#8b5cf6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Savings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
