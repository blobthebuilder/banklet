"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Target,
} from "lucide-react";

export function FinancialOverview() {
  const metrics = [
    {
      title: "Current Balance",
      value: "$12,543",
      change: "+2.5%",
      changeType: "positive" as const,
      icon: Wallet,
      description: "from last month",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-700",
    },
    {
      title: "Monthly Spending",
      value: "$4,200",
      change: "-8.2%",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "from last month",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-700",
    },
    {
      title: "Monthly Income",
      value: "$6,800",
      change: "+12.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "from last month",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-700",
    },
    {
      title: "Savings Goal",
      value: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Target,
      description: "progress this month",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group overflow-hidden relative">
          <div
            className={`absolute inset-0 ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm group-hover:text-primary transition-colors duration-300">
              {metric.title}
            </CardTitle>
            <div
              className={`p-2 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-2xl mb-1 font-bold ${metric.textColor}`}>
              {metric.value}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex items-center">
                {metric.changeType === "positive" ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span
                  className={`${
                    metric.changeType === "positive"
                      ? "text-emerald-600"
                      : "text-red-600"
                  } mr-1 font-medium`}>
                  {metric.change}
                </span>
              </div>
              {metric.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
