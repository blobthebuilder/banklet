"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

export default function BudgetsTrends({ monthlyData }: BudgetsTrendsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Budget vs Actual Spending</CardTitle>
        <CardDescription>
          Compare your budgeted amounts with actual spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%">
            <BarChart data={monthlyData}>
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
                dataKey="budgeted"
                fill="#8b5cf6"
                name="Budgeted"
              />
              <Bar
                dataKey="spent"
                fill="#06b6d4"
                name="Actual Spent"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Budgeted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-sm">Actual Spent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
