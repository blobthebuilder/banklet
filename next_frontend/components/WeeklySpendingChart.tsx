import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function WeeklySpendingChart({ data }: WeeklySpendingChartProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Weekly Spending Pattern</CardTitle>
        <CardDescription>
          Analyze your spending habits throughout the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="day"
                stroke="#64748b"
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                formatter={(value: number) => [`$${value}`, "Amount"]}
              />
              <YAxis stroke="#64748b" />
              <Bar
                dataKey="amount"
                fill="#10b981" // Solid green color
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
