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
