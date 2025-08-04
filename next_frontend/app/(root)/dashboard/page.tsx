import { FinancialOverview } from "@/components/FinancialOverview";
import { SpendingChart } from "@/components/SpendingChart";
import CategoryChart from "@/components/CategoryChart";
import RecentTransactions from "@/components/RecentTransactions";
import { BarChart3 } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import { normalizeCategories } from "@/lib/utils";
import { normalize } from "path";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Send to backend to ensure user exists there
  await fetch("http:/localhost:8080/api/sync-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`, // or Clerk JWT
    },
    body: JSON.stringify({
      email: user.emailAddresses[0].emailAddress,
      googleID: user.id,
    }),
  });

  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch("http://localhost:8080/api/transactions/category", {
    headers: {
      Authorization: `Bearer ${token}`, // server-side auth
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category data: ${res.status}`);
  }

  const data = await res.json();
  const transactionsArray = data.transactions || [];
  const categorySpending = normalizeCategories(transactionsArray);

  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      {/* Light purplish background */}
      <DashboardHeader />
      <div className="container mx-auto p-6 space-y-8">
        {/* Financial Overview Cards */}
        <FinancialOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <SpendingChart />
          <CategoryChart data={categorySpending} />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
}
