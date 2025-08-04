import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calendar,
  Target,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import { KeyMetricsCard } from "@/components/KeyMetricsCard";
import { InsightsCard } from "@/components/InsightsCard";

import AnalyticsCharts from "@/components/AnalyticsCharts";

export default function AnalyticsPage() {
  const monthlyTrends = [
    { month: "Jan", spending: 3200, income: 4500, savings: 1300 },
    { month: "Feb", spending: 2800, income: 4500, savings: 1700 },
    { month: "Mar", spending: 3500, income: 4500, savings: 1000 },
    { month: "Apr", spending: 3100, income: 4500, savings: 1400 },
    { month: "May", spending: 2900, income: 4500, savings: 1600 },
    { month: "Jun", spending: 3300, income: 4500, savings: 1200 },
  ];

  const categorySpending = [
    { name: "Food & Dining", value: 1200, color: "#8b5cf6" },
    { name: "Transportation", value: 800, color: "#06b6d4" },
    { name: "Shopping", value: 600, color: "#10b981" },
    { name: "Entertainment", value: 400, color: "#f59e0b" },
    { name: "Bills & Utilities", value: 900, color: "#ef4444" },
    { name: "Other", value: 300, color: "#6b7280" },
  ];

  const weeklySpending = [
    { day: "Mon", amount: 125 },
    { day: "Tue", amount: 89 },
    { day: "Wed", amount: 165 },
    { day: "Thu", amount: 95 },
    { day: "Fri", amount: 210 },
    { day: "Sat", amount: 145 },
    { day: "Sun", amount: 78 },
  ];

  const insights = [
    {
      title: "High Spending Alert",
      description: "You've spent 23% more on dining this month",
      type: "warning",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Savings Goal Achievement",
      description: "You're on track to reach your emergency fund goal",
      type: "success",
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Investment Opportunity",
      description: "Consider investing your surplus $500 this month",
      type: "info",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  const avg = (arr: number[]) =>
    Math.round(arr.reduce((sum, v) => sum + v, 0) / arr.length);
  const avgSpending = avg(monthlyTrends.map((m) => m.spending));
  const avgSavings = avg(monthlyTrends.map((m) => m.savings));
  const savingsRate = Math.round((avgSavings / 4500) * 100);

  const stats = [
    {
      title: "Average Monthly Spending",
      value: `$${avgSpending.toLocaleString()}`,
      valueColor: "text-primary",
      icon: <DollarSign className="w-5 h-5 text-primary" />,
      trendIcon: <TrendingDown className="w-4 h-4" />,
      trendText: "-8.2%",
      trendColor: "text-emerald-600",
      gradient: "from-primary/10 to-purple-500/10",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      valueColor: "text-emerald-600",
      icon: <Target className="w-5 h-5 text-emerald-600" />,
      trendIcon: <TrendingUp className="w-4 h-4" />,
      trendText: "+2.1%",
      trendColor: "text-emerald-600",
      gradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Top Category",
      value: "Food",
      valueColor: "text-purple-600",
      icon: <PieChart className="w-5 h-5 text-purple-600" />,
      trendIcon: <ArrowUpRight className="w-4 h-4" />,
      trendText: "+12%",
      trendColor: "text-red-600",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Budget Adherence",
      value: "87%",
      valueColor: "text-blue-600",
      icon: <Target className="w-5 h-5 text-blue-600" />,
      trendIcon: <TrendingUp className="w-4 h-4" />,
      trendText: "+5%",
      trendColor: "text-emerald-600",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
  ];

  return (
    <div className="pt-10 lg:pt-10 p-6 space-y-6 bg-[#d6f1e3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Advanced financial insights and trends
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <KeyMetricsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            valueColor={stat.valueColor}
            icon={stat.icon}
            trendIcon={stat.trendIcon}
            trendText={stat.trendText}
            trendColor={stat.trendColor}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Insights */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
              <InsightsCard
                key={idx}
                title={insight.title}
                description={insight.description}
                icon={insight.icon}
                color={insight.color}
                bgColor={insight.bgColor}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <AnalyticsCharts
        monthlyTrends={monthlyTrends}
        categorySpending={categorySpending}
        weeklySpending={weeklySpending}
      />
    </div>
  );
}
