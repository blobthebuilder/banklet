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
import {
  Target,
  PlusCircle,
  Home,
  Car,
  GraduationCap,
  Plane,
  Heart,
  Wallet,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Emergency Fund",
      description: "Build a 6-month emergency fund",
      target: 24000,
      current: 15600,
      targetDate: "2025-12-31",
      category: "savings",
      icon: Wallet,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 2,
      title: "House Down Payment",
      description: "Save for a 20% down payment on a $400k house",
      target: 80000,
      current: 32000,
      targetDate: "2026-06-30",
      category: "major-purchase",
      icon: Home,
      color: "blue",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      title: "New Car",
      description: "Save for a reliable used car",
      target: 25000,
      current: 18500,
      targetDate: "2025-04-30",
      category: "major-purchase",
      icon: Car,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "Vacation to Europe",
      description: "Two-week trip to Italy and France",
      target: 8000,
      current: 5200,
      targetDate: "2025-08-15",
      category: "lifestyle",
      icon: Plane,
      color: "orange",
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Master's Degree",
      description: "Save for graduate school tuition",
      target: 45000,
      current: 12000,
      targetDate: "2026-09-01",
      category: "education",
      icon: GraduationCap,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-600",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    targetDate: "",
    category: "",
  });

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTimeLeft = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months`;
    return `${Math.ceil(diffDays / 365)} years`;
  };

  const getMonthlyRequired = (
    current: number,
    target: number,
    targetDate: string
  ) => {
    const target_date = new Date(targetDate);
    const now = new Date();
    const monthsLeft = Math.max(
      1,
      Math.ceil(
        (target_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)
      )
    );
    return (target - current) / monthsLeft;
  };

  const categoryIcons = {
    savings: Wallet,
    "major-purchase": Home,
    lifestyle: Plane,
    education: GraduationCap,
    investment: TrendingUp,
    other: Target,
  };

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.targetDate) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        description: newGoal.description,
        target: parseFloat(newGoal.target),
        current: 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category,
        icon:
          categoryIcons[newGoal.category as keyof typeof categoryIcons] ||
          Target,
        color: "blue",
        gradient: "from-blue-500 to-cyan-600",
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        target: "",
        targetDate: "",
        category: "",
      });
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const completedGoals = goals.filter(
    (goal) => goal.current >= goal.target
  ).length;

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Goals
            </h1>
            <p className="text-muted-foreground">
              Track your financial goals and milestones
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 transition-all duration-300">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set up a new financial goal to track your progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of your goal"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="target">Target Amount</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="10000"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, category: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="major-purchase">
                      Major Purchase
                    </SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateGoal}
                className="w-full">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl text-primary">{goals.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl text-emerald-600">{completedGoals}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-2xl text-blue-600">
                  ${totalSaved.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>
                <p className="text-2xl text-purple-600">
                  {Math.round((totalSaved / totalTarget) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal.current, goal.target);
          const timeLeft = getTimeLeft(goal.targetDate);
          const monthlyRequired = getMonthlyRequired(
            goal.current,
            goal.target,
            goal.targetDate
          );

          return (
            <Card
              key={goal.id}
              className="border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${goal.gradient} bg-opacity-10`}>
                      <goal.icon className={`w-5 h-5 text-${goal.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {timeLeft}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="font-medium">
                      ${(goal.target - goal.current).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Monthly Needed
                    </p>
                    <p className="font-medium">${monthlyRequired.toFixed(0)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1">
                    Add Money
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1">
                    Edit Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
