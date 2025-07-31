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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

export default function BudgetsOverview({
  budgets,
  totalSpent,
}: BudgetsOverviewProps) {
  const pieChartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.spent,
    color: budget.color,
  }));

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Budget Distribution</CardTitle>
        <CardDescription>
          How your spending is distributed across categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}>
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: budget.color }}></div>
                  <span className="text-sm">{budget.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">${budget.spent}</span>
                  <span className="text-xs text-muted-foreground block">
                    {Math.round((budget.spent / totalSpent) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
