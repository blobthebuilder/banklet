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

interface GoalsHeaderProps {
  newGoal: {
    title: string;
    description: string;
    target: string;
    targetDate: string;
    category: string;
  };
  setNewGoal: (goal: GoalsHeaderProps["newGoal"]) => void;
  handleCreateGoal: () => void;
}

interface GoalsOverviewCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string; // Tailwind color (e.g., text-emerald-600)
}

interface GoalsCardProps {
  goal: any;
  getProgress: (current: number, target: number) => number;
  getTimeLeft: (targetDate: string) => string;
  getMonthlyRequired: (
    current: number,
    target: number,
    targetDate: string
  ) => number;
}

interface BudgetsHeaderProps {
  newBudget: { category: string; budget: string };
  setNewBudget: (budget: { category: string; budget: string }) => void;
  handleCreateBudget: () => void;
}

interface BudgetsCardsProps {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
}

interface BudgetsOverviewProps {
  budgets: { id: number; category: string; spent: number; color: string }[];
  totalSpent: number;
}

interface BudgetsTrendsProps {
  monthlyData: { month: string; budgeted: number; spent: number }[];
}

interface Budget {
  id: number;
  category: string;
  budget: number;
  spent: number;
  icon: any;
  color: string;
}

interface BudgetCategoryCardProps {
  budget: Budget;
  getBudgetStatus: (
    spent: number,
    budget: number
  ) => {
    status: string;
    color: string;
    bg: string;
  };
}

type CategoryChartProps = {
  data: CategorySpending[];
};
