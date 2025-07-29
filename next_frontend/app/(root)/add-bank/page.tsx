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
import { PlusCircle, Building, Shield, ArrowLeft } from "lucide-react";

interface AddBankPageProps {
  setCurrentPage: (page: string) => void;
}

export default function AddBankPage({ setCurrentPage }: AddBankPageProps) {
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
    // Mock bank connection - in real app this would connect to banking APIs
    alert("Bank account connected successfully!");
    setCurrentPage("accounts");
  };

  const popularBanks = [
    "Chase Bank",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "Capital One",
    "PNC Bank",
    "TD Bank",
    "US Bank",
  ];

  return (
    <div className="pt-20 lg:pt-24 p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage("dashboard")}
          className="flex items-center gap-2 hover:bg-primary/5">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
            <PlusCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Add Bank Account
            </h1>
            <p className="text-muted-foreground">
              Connect your bank account to track transactions automatically
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
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
                    onValueChange={(value) =>
                      handleInputChange("bankName", value)
                    }>
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
                  <Label htmlFor="accountNickname">
                    Account Nickname (Optional)
                  </Label>
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
        </div>

        {/* Security Info */}
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <Shield className="w-5 h-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>
                  🔒 <strong>Bank-level encryption:</strong> Your data is
                  protected with 256-bit SSL encryption
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  🏛️ <strong>Read-only access:</strong> We can only view your
                  transactions, never move money
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  🛡️ <strong>Never stored:</strong> We don't store your login
                  credentials
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-blue-600">Quick Connect</CardTitle>
              <CardDescription>
                Popular banks for instant connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {popularBanks.slice(0, 4).map((bank) => (
                  <Button
                    key={bank}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange("bankName", bank)}
                    className="text-xs hover:bg-blue-100 hover:border-blue-300">
                    {bank}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
