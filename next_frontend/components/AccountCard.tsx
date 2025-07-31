import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

export default function AccountCard({
  account,
  showBalances,
  formatBalance,
  getStatusColor,
}: AccountCardProps) {
  return (
    <Card
      key={account.id}
      className="border-border/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group overflow-hidden relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${account.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-center justify-between">
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${account.gradient} bg-opacity-10`}>
            {account.type === "Credit Card" ? (
              <CreditCard className="w-5 h-5 text-purple-600" />
            ) : (
              <Wallet className="w-5 h-5 text-purple-600" />
            )}
          </div>
          <span className={`badge ${getStatusColor(account.status)}`}>
            {account.status}
          </span>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors duration-300">
          {account.name}
        </CardTitle>
        <CardDescription>
          {account.bank} • {account.type}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div
          className={`text-2xl mb-2 ${
            account.balance < 0 ? "text-red-600" : "text-emerald-600"
          }`}>
          {formatBalance(account.balance)}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Last updated {account.lastUpdate}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-primary/5">
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3 hover:bg-primary/5">
            ⚙️
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
