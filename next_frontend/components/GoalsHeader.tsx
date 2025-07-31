"use client";

import { Target, PlusCircle } from "lucide-react";
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

export default function GoalsHeader({
  newGoal,
  setNewGoal,
  handleCreateGoal,
}: GoalsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl text-emerald-600 bg-clip-text">Goals</h1>
          <p className="text-muted-foreground">
            Track your financial goals and milestones
          </p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-400 hover:bg-green-600 transition-all duration-300">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set up a new financial goal to track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                placeholder="e.g., Emergency Fund"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of your goal"
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="target">Target Amount</Label>
              <Input
                id="target"
                type="number"
                placeholder="10000"
                value={newGoal.target}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, target: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setNewGoal({ ...newGoal, category: value })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="major-purchase">Major Purchase</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleCreateGoal}
              className="w-full">
              Create Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
