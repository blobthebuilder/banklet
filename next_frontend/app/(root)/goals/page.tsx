"use client";

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
import GoalsCard from "@/components/GoalsCard";
import GoalsOverviewCard from "@/components/GoalsOverviewCard";
import GoalsHeader from "@/components/GoalsHeader";

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
    <div className="pt-10 lg:pt-10 p-6 space-y-6 bg-[#d6f1e3]">
      <GoalsHeader
        newGoal={newGoal}
        setNewGoal={setNewGoal}
        handleCreateGoal={handleCreateGoal}
      />

      {/* Goals Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <GoalsOverviewCard
          title="Total Goals"
          value={goals.length}
          icon={Target}
          colorClass="text-primary"
        />
        <GoalsOverviewCard
          title="Completed"
          value={completedGoals}
          icon={CheckCircle}
          colorClass="text-emerald-600"
        />
        <GoalsOverviewCard
          title="Total Saved"
          value={`$${totalSaved.toLocaleString()}`}
          icon={DollarSign}
          colorClass="text-blue-600"
        />
        <GoalsOverviewCard
          title="Overall Progress"
          value={`${Math.round((totalSaved / totalTarget) * 100)}%`}
          icon={TrendingUp}
          colorClass="text-purple-600"
        />
      </div>

      {/* Goals Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <GoalsCard
            key={goal.id}
            goal={goal}
            getProgress={getProgress}
            getTimeLeft={getTimeLeft}
            getMonthlyRequired={getMonthlyRequired}
          />
        ))}
      </div>
    </div>
  );
}
