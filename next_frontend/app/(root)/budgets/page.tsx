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

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food & Dining",
      budget: 800,
      spent: 645,
      icon: Utensils,
      color: "#8b5cf6",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 2,
      category: "Transportation",
      budget: 400,
      spent: 320,
      icon: Car,
      color: "#06b6d4",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      category: "Shopping",
      budget: 300,
      spent: 285,
      icon: ShoppingCart,
      color: "#10b981",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      category: "Entertainment",
      budget: 200,
      spent: 165,
      icon: Gamepad2,
      color: "#f59e0b",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: 5,
      category: "Bills & Utilities",
      budget: 600,
      spent: 580,
      icon: Home,
      color: "#ef4444",
      gradient: "from-red-500 to-pink-600",
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
        gradient: "from-purple-500 to-pink-600",
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
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg">
            <PieChart className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Budgets
            </h1>
            <p className="text-muted-foreground">
              Create and manage your spending budgets
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-orange-600 hover:to-yellow-600 transition-all duration-300">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
                Set up a spending budget for a category
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setNewBudget({ ...newBudget, category: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Coffee">Coffee</SelectItem>
                    <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                    <SelectItem value="Health">Health & Fitness</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Monthly Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="500"
                  value={newBudget.budget}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, budget: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleCreateBudget}
                className="w-full">
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budget Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl text-primary">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl text-orange-600">
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl text-emerald-600">
                  ${remaining.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Usage</p>
                <p className="text-2xl text-blue-600">
                  {Math.round((totalSpent / totalBudget) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${budget.gradient} bg-opacity-10`}>
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

      {/* Budget Analysis */}
      <Tabs
        defaultValue="overview"
        className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Budget Overview</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
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
                      <RechartsPieChart
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value">
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </RechartsPieChart>
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
                        <span className="text-sm font-medium">
                          ${budget.spent}
                        </span>
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
        </TabsContent>

        <TabsContent value="trends">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
