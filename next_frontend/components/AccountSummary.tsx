import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AccountSummaryProps {
  showBalances: boolean;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
}

export default function AccountSummary({
  showBalances,
  totalAssets,
  totalDebt,
  netWorth,
}: AccountSummaryProps) {
  return (
    <Card className="border-border/50 bg-gradient-to-r from-primary/5 via-purple-500/5 to-cyan-500/5">
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
        <CardDescription>
          Overview of all your connected accounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl text-emerald-600 mb-1">
              {showBalances ? `$${totalAssets.toFixed(2)}` : "••••••"}
            </div>
            <div className="text-sm text-muted-foreground">Total Assets</div>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl text-red-600 mb-1">
              {showBalances ? `$${totalDebt.toFixed(2)}` : "••••••"}
            </div>
            <div className="text-sm text-muted-foreground">Total Debt</div>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl text-primary mb-1">
              {showBalances ? `$${netWorth.toFixed(2)}` : "••••••"}
            </div>
            <div className="text-sm text-muted-foreground">Net Worth</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
