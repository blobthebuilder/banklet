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

import { normalizeTransaction } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function RecentTransactions() {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    "http://localhost:8080/api/transactions/list?limit=5",
    {
      headers: {
        Authorization: `Bearer ${token}`, // server-side auth
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  const data = await res.json();
  const transactions = data.transactions.map(normalizeTransaction);

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
            {transactions.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.name}</TableCell>
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
