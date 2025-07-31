"use client";

import { PieChart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BudgetsHeader({
  newBudget,
  setNewBudget,
  handleCreateBudget,
}: BudgetsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <PieChart className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl text-yellow-700">Budgets</h1>
          <p className="text-muted-foreground">
            Create and manage your spending budgets
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-yellow-600 hover:bg-orange-600 transition-all duration-300">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Set up a spending budget for a category
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setNewBudget({ ...newBudget, category: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Gas">Gas</SelectItem>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="Health">Health & Fitness</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                placeholder="500"
                value={newBudget.budget}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, budget: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleCreateBudget}
              className="w-full">
              Create Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
