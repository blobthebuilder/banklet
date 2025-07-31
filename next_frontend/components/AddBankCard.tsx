"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Building } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddBankCard({ popularBanks }: AddBankCardProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bankName: "",
    accountType: "",
    accountNumber: "",
    routingNumber: "",
    accountNickname: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bank account connected successfully!");
    router.push("accounts");
  };

  return (
    <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          Bank Account Information
        </CardTitle>
        <CardDescription>
          Enter your bank account details to connect securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Select
              onValueChange={(value) => handleInputChange("bankName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {popularBanks.map((bank) => (
                  <SelectItem
                    key={bank}
                    value={bank}>
                    {bank}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange("accountType", value)
              }>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                type="text"
                placeholder="Enter routing number"
                value={formData.routingNumber}
                onChange={(e) =>
                  handleInputChange("routingNumber", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNickname">Account Nickname (Optional)</Label>
            <Input
              id="accountNickname"
              type="text"
              placeholder="e.g., Main Checking, Emergency Savings"
              value={formData.accountNickname}
              onChange={(e) =>
                handleInputChange("accountNickname", e.target.value)
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
            <PlusCircle className="w-4 h-4 mr-2" />
            Connect Bank Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
