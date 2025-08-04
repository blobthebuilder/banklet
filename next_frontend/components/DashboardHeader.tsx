import { BarChart3 } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-purple-100 rounded-lg">
        <BarChart3 className="w-6 h-6 text-purple-600" />
      </div>
      <div>
        <h1 className="text-4xl text-purple-700">Financial Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your financial health.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
