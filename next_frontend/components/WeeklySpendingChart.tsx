import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
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
              <YAxis stroke="#64748b" />
              <Bar
                dataKey="amount"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient
                  id="colorGradient"
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
                    stopColor="#06b6d4"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
