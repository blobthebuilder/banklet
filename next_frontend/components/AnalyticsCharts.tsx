"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CategorySpendingChart } from "./CategorySpendingChart";
import { WeeklySpendingChart } from "./WeeklySpendingChart";
import { MonthlyTrendsChart } from "./MonthlySpendingTrends";

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  monthlyTrends,
  categorySpending,
  weeklySpending,
}) => {
  return (
    <Tabs
      defaultValue="trends"
      className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
        <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="trends">
        <MonthlyTrendsChart data={monthlyTrends} />
      </TabsContent>

      <TabsContent value="categories">
        <CategorySpendingChart data={categorySpending} />
      </TabsContent>

      <TabsContent value="weekly">
        <WeeklySpendingChart data={weeklySpending} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsCharts;
