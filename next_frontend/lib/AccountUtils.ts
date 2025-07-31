// utils/accountUtils.ts
export const formatBalance = (balance: number, showBalances: boolean) => {
  if (!showBalances) return "••••••";
  return balance < 0
    ? `-$${Math.abs(balance).toFixed(2)}`
    : `$${balance.toFixed(2)}`;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
      return "bg-emerald-100 text-emerald-800";
    case "syncing":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
