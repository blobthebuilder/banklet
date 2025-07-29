"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  AreaChart,
  Area,
} from "recharts";

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
    { name: "Other", value: 300, color: "#8b5cf6" },
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

  return (
    <div className="pt-20 lg:pt-24 p-6 space-y-6">
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
        <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Monthly Spending
                </p>
                <p className="text-2xl text-primary">$3,133</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">-8.2%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <p className="text-2xl text-emerald-600">29%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+2.1%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Category</p>
                <p className="text-2xl text-purple-600">Food</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">+12%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                <PieChart className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Budget Adherence
                </p>
                <p className="text-2xl text-blue-600">87%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+5%</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${insight.bgColor} border-border/50`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.color}`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs
        defaultValue="trends"
        className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Monthly Financial Trends</CardTitle>
              <CardDescription>
                Track your income, spending, and savings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer
                  width="100%"
                  height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                    />
                    <YAxis stroke="#64748b" />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#10b981"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="spending"
                      stroke="#ef4444"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Spending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Savings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                See where your money goes each month
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
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value">
                        {categorySpending.map((entry, index) => (
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
                  {categorySpending.map((category, index) => (
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
                        <span className="text-sm font-medium">
                          ${category.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Weekly Spending Pattern</CardTitle>
              <CardDescription>
                Analyze your spending habits throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer
                  width="100%"
                  height="100%">
                  <BarChart data={weeklySpending}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="#64748b"
                    />
                    <YAxis stroke="#64748b" />
                    <Bar
                      dataKey="amount"
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#06b6d4"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
