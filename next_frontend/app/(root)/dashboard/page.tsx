import { FinancialOverview } from "@/components/FinancialOverview";
import { SpendingChart } from "@/components/SpendingChart";
import { CategoryChart } from "@/components/CategoryChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      {/* Light purplish background */}
      <div className="container mx-auto p-6 space-y-8">
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

        {/* Financial Overview Cards */}
        <FinancialOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <SpendingChart />
          <CategoryChart />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
}
