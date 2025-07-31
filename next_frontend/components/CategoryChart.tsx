"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PieChart as PieChartIcon } from "lucide-react";
import { renderCustomizedLabel } from "@/lib/PieChartUtils";

const mockCategoryData = [
  { name: "Food & Dining", value: 1200, color: "#8b5cf6" },
  { name: "Transportation", value: 800, color: "#06b6d4" },
  { name: "Shopping", value: 600, color: "#10b981" },
  { name: "Entertainment", value: 400, color: "#f59e0b" },
  { name: "Bills & Utilities", value: 900, color: "#ef4444" },
  { name: "Other", value: 300, color: "#6b7280" },
];

export function CategoryChart() {
  const total = mockCategoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
            <PieChartIcon className="w-4 h-4 text-cyan-600" />
          </div>
          <CardTitle className="group-hover:text-primary transition-colors duration-300">
            Spending by Category
          </CardTitle>
        </div>
        <CardDescription>
          Your spending breakdown for this month (${total.toLocaleString()})
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <ResponsiveContainer
          width="100%"
          height={350}>
          <PieChart>
            <Pie
              className="outline-none"
              data={mockCategoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value">
              {mockCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {mockCategoryData.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}></div>
              <span className="text-sm text-muted-foreground truncate">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
