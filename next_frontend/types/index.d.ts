declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

type Transaction = {
  id: string;
  userGoogleID: string;
  accountID: string;
  category: string;
  date: string;
  authorizedDate: string;
  name: string;
  amount: number;
  currencyCode: string;
  pendingTransactionID: string | null;
};

interface AccountBalance {
  AccountID: string;
  Name: string;
  Current: number;
  Available: number;
  Currency: string;
}

interface KeyMetricsCardProps {
  title: string;
  value: string;
  valueColor?: string;
  icon: React.ReactNode;
  trendIcon: React.ReactNode;
  trendText: string;
  trendColor: string;
  gradient: string;
}

type InsightsCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
};

type MonthlyTrend = {
  month: string;
  spending: number;
  income: number;
  savings: number;
};

interface MonthlyTrendsChartProps {
  data: MonthlyTrend[];
}

type CategorySpending = {
  name: string;
  value: number;
  color: string;
};

interface CategorySpendingChartProps {
  data: CategorySpending[];
}

type WeeklySpending = {
  day: string;
  amount: number;
};

interface WeeklySpendingChartProps {
  data: WeeklySpending[];
}

interface AnalyticsChartsProps {
  monthlyTrends: Array<any>;
  categorySpending: Array<any>;
  weeklySpending: Array<any>;
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

interface QuickConnectCardProps {
  popularBanks: string[];
}

interface AddBankCardProps {
  popularBanks: string[];
}

interface Account {
  id: number;
  name: string;
  bank: string;
  type: string;
  balance: number;
  lastUpdate: string;
  status: string;
  gradient: string;
}

interface AccountCardProps {
  account: Account;
  showBalances: boolean;
  formatBalance: (balance: number) => string;
  getStatusColor: (status: string) => string;
}

interface AccountSummaryProps {
  showBalances: boolean;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
}
