import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { renderCustomizedLabel } from "@/lib/PieChartUtils";

export function CategorySpendingChart({ data }: CategorySpendingChartProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>See where your money goes each month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%">
              <RechartsPieChart>
                <Pie
                  className="outline-none"
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}>
                  {data.map((entry, index) => (
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
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {data.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">${category.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
