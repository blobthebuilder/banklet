import { FinancialOverview } from "@/components/FinancialOverview";
import { SpendingChart } from "@/components/SpendingChart";
import { CategoryChart } from "@/components/CategoryChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BarChart3, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/20 to-cyan-50/20">
      <div className="container mx-auto p-6 space-y-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Financial Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your financial health.
              </p>
            </div>
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
