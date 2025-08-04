import { useAuth } from "@clerk/nextjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),

    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

export const normalizeTransaction = (t: any) => ({
  id: t.ID,
  userGoogleID: t.UserGoogleID,
  accountID: t.AccountID,
  category: t.Category,
  date: t.Date,
  authorizedDate: t.AuthorizedDate,
  name: t.Name,
  amount: t.Amount,
  currencyCode: t.CurrencyCode,
  pendingTransactionID: t.PendingTransactionID,
  status: t.AuthorizedDate ? "Completed" : "Pending",
});

const RAW_TO_NORMALIZED: Record<string, string> = {
  OTHER: "Other",
  GENERAL_SERVICES: "Bills & Utilities",
  LOAN_PAYMENTS: "Bills & Utilities",
  GENERAL_MERCHANDISE: "Shopping",
  TRANSFER_OUT: "Other",
  FOOD_AND_DRINK: "Food & Dining",
  ENTERTAINMENT: "Entertainment",
  PERSONAL_CARE: "Other",
  TRANSPORTATION: "Transportation",
  TRAVEL: "Other",
  // INCOME is intentionally missing to filter it out later
};

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#8b5cf6",
  Transportation: "#06b6d4",
  Shopping: "#10b981",
  Entertainment: "#f59e0b",
  "Bills & Utilities": "#ef4444",
  Other: "#6b7280",
};

// Utility function to get a color for a category
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "#6b7280"; // default gray if not found
}

export function normalizeCategories(
  rawData: Array<{ Category: string; TotalSpent: number }>
): CategorySpending[] {
  const filtered = rawData.filter((item) => item.Category !== "INCOME");

  const groupedMap = new Map<string, { total: number; color: string }>();

  filtered.forEach(({ Category, TotalSpent }) => {
    const normalizedName = RAW_TO_NORMALIZED[Category] || "Other";
    const color = CATEGORY_COLORS[normalizedName] || CATEGORY_COLORS["Other"];

    if (groupedMap.has(normalizedName)) {
      groupedMap.get(normalizedName)!.total += TotalSpent;
    } else {
      groupedMap.set(normalizedName, { total: TotalSpent, color });
    }
  });

  const result = Array.from(groupedMap, ([name, { total, color }]) => ({
    name,
    value: total,
    color,
  }));

  // Sort alphabetically by name
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}
