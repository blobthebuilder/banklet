"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function BudgetsCards({
  totalBudget,
  totalSpent,
  remaining,
}: BudgetsCardsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="border-border/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl text-primary">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl text-orange-600">
              ${totalSpent.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl text-emerald-600">
              ${remaining.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-emerald-100 rounded-lg">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Budget Usage</p>
            <p className="text-2xl text-blue-600">
              {Math.round((totalSpent / totalBudget) * 100)}%
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
