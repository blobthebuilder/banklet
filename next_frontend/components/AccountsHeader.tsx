import { Button } from "@/components/ui/button";
import { Wallet, PlusCircle, Eye, EyeOff } from "lucide-react";

interface AccountsHeaderProps {
  showBalances: boolean;
  toggleShowBalances: () => void;
  onAddAccount: () => void;
}

export default function AccountsHeader({
  showBalances,
  toggleShowBalances,
  onAddAccount,
}: AccountsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-400 rounded-lg">
          <Wallet className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl bg-purple-500 bg-clip-text text-transparent">
            My Accounts
          </h1>
          <p className="text-muted-foreground">
            Manage your connected bank accounts and cards
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleShowBalances}
          className="flex items-center gap-2">
          {showBalances ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showBalances ? "Hide" : "Show"} Balances
        </Button>
        <Button
          onClick={onAddAccount}
          className="bg-purple-400 hover:bg-purple-500 transition-all duration-300">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>
    </div>
  );
}
