"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const mockTransactions = [
  {
    id: 1,
    date: "2025-01-25",
    description: "Grocery Store",
    category: "Food & Dining",
    amount: -87.32,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-01-24",
    description: "Salary Deposit",
    category: "Income",
    amount: 3200.0,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-01-23",
    description: "Gas Station",
    category: "Transportation",
    amount: -45.67,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-01-22",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    status: "Completed",
  },
  {
    id: 5,
    date: "2025-01-21",
    description: "Coffee Shop",
    category: "Food & Dining",
    amount: -4.25,
    status: "Pending",
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "Completed"
                        ? "default"
                        : "secondary"
                    }>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`text-right ${
                    transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                  {transaction.amount >= 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
