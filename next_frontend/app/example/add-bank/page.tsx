import AddBankCard from "@/components/AddBankCard";
import QuickConnectCard from "@/components/QuickConnectCard";
import SecurityInfoCard from "@/components/SecurityInfoCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBankPage() {
  const popularBanks = [
    "Chase Bank",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "Capital One",
    "PNC Bank",
    "TD Bank",
    "US Bank",
  ];

  return (
    <div className="min-h-screen bg-[#ceeefe]">
      <div className="pt-20 lg:pt-10 p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            prefetch>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-primary/5">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl text-blue-600">Add Bank Account</h1>
              <p className="text-muted-foreground">
                Connect your bank account to track transactions automatically
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AddBankCard popularBanks={popularBanks} />
          </div>

          <div className="space-y-6">
            <SecurityInfoCard />
            <QuickConnectCard popularBanks={popularBanks} />
          </div>
        </div>
      </div>
    </div>
  );
}
