import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function BudgetCategoryCard({
  budget,
  getBudgetStatus,
}: BudgetCategoryCardProps) {
  const percentage = (budget.spent / budget.budget) * 100;
  const status = getBudgetStatus(budget.spent, budget.budget);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: budget.color + "20" }}>
              <budget.icon
                className="w-5 h-5"
                style={{ color: budget.color }}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{budget.category}</CardTitle>
              <CardDescription>Monthly budget</CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${status.color} ${status.bg}`}>
            {status.status === "over"
              ? "Over Budget"
              : status.status === "warning"
              ? "Warning"
              : "On Track"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spent</span>
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </div>
          <Progress
            value={Math.min(percentage, 100)}
            className="h-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${budget.spent.toLocaleString()}</span>
            <span>${budget.budget.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className={`font-medium ${status.color}`}>
              ${Math.max(0, budget.budget - budget.spent).toLocaleString()}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Daily Average</p>
            <p className="font-medium">${(budget.spent / 30).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1">
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1">
            Edit Budget
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
