"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  PlusCircle,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import BudgetsTrends from "@/components/BudgetsTrends";
import BudgetsOverview from "@/components/BudgetsOverview";
import BudgetsCards from "@/components/BudgetsCards";
import BudgetsHeader from "@/components/BudgetsHeader";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food & Dining",
      budget: 800,
      spent: 645,
      icon: Utensils,
      color: "#8b5cf6",
    },
    {
      id: 2,
      category: "Transportation",
      budget: 400,
      spent: 320,
      icon: Car,
      color: "#06b6d4",
    },
    {
      id: 3,
      category: "Shopping",
      budget: 300,
      spent: 285,
      icon: ShoppingCart,
      color: "#10b981",
    },
    {
      id: 4,
      category: "Entertainment",
      budget: 200,
      spent: 165,
      icon: Gamepad2,
      color: "#f59e0b",
    },
    {
      id: 5,
      category: "Bills & Utilities",
      budget: 600,
      spent: 580,
      icon: Home,
      color: "#ef4444",
    },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    budget: "",
  });

  const monthlyData = [
    { month: "Jan", budgeted: 2300, spent: 1995 },
    { month: "Feb", budgeted: 2300, spent: 2150 },
    { month: "Mar", budgeted: 2300, spent: 2400 },
    { month: "Apr", budgeted: 2300, spent: 2050 },
    { month: "May", budgeted: 2300, spent: 2200 },
    { month: "Jun", budgeted: 2300, spent: 1995 },
  ];

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100)
      return { status: "over", color: "text-red-600", bg: "bg-red-50" };
    if (percentage >= 80)
      return { status: "warning", color: "text-amber-600", bg: "bg-amber-50" };
    return { status: "good", color: "text-emerald-600", bg: "bg-emerald-50" };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remaining = totalBudget - totalSpent;

  const handleCreateBudget = () => {
    if (newBudget.category && newBudget.budget) {
      const budget = {
        id: budgets.length + 1,
        category: newBudget.category,
        budget: parseFloat(newBudget.budget),
        spent: 0,
        icon: ShoppingCart,
        color: "#8b5cf6",
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: "", budget: "" });
    }
  };

  const pieChartData = budgets.map((budget) => ({
    name: budget.category,
    value: budget.spent,
    color: budget.color,
  }));

  return (
    <div className="pt-10 lg:pt-10 p-6 space-y-6">
      <BudgetsHeader
        newBudget={newBudget}
        setNewBudget={setNewBudget}
        handleCreateBudget={handleCreateBudget}
      />

      <BudgetsCards
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        remaining={remaining}
      />

      {/* Budget Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const status = getBudgetStatus(budget.spent, budget.budget);

          return (
            <Card
              key={budget.id}
              className="border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-opacity-10">
                      <budget.icon
                        className="w-5 h-5"
                        style={{ color: budget.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {budget.category}
                      </CardTitle>
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
                    <span className="font-medium">
                      {percentage.toFixed(1)}%
                    </span>
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
                      $
                      {Math.max(
                        0,
                        budget.budget - budget.spent
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Daily Average
                    </p>
                    <p className="font-medium">
                      ${(budget.spent / 30).toFixed(2)}
                    </p>
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
        })}
      </div>
      <Tabs
        defaultValue="overview"
        className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Budget Overview</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BudgetsOverview
            budgets={budgets}
            totalSpent={totalSpent}
          />
        </TabsContent>

        <TabsContent value="trends">
          <BudgetsTrends monthlyData={monthlyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
