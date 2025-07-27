"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Wallet,
  CreditCard,
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
      gradient: "from-emerald-400 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Monthly Spending",
      value: "$4,200",
      change: "-8.2%",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "from last month",
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Monthly Income",
      value: "$6,800",
      change: "+12.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "from last month",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Savings Goal",
      value: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Target,
      description: "progress this month",
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group overflow-hidden relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm group-hover:text-primary transition-colors duration-300">
              {metric.title}
            </CardTitle>
            <div
              className={`p-2 rounded-lg bg-gradient-to-br ${metric.bgGradient} group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div
              className={`text-2xl mb-1 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent font-bold`}>
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
