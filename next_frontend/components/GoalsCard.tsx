"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";

export default function GoalsCard({
  goal,
  getProgress,
  getTimeLeft,
  getMonthlyRequired,
}: GoalsCardProps) {
  const progress = getProgress(goal.current, goal.target);
  const timeLeft = getTimeLeft(goal.targetDate);
  const monthlyRequired = getMonthlyRequired(
    goal.current,
    goal.target,
    goal.targetDate
  );

  return (
    <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-gradient-to-r ${goal.gradient} bg-opacity-10`}>
              <goal.icon className={`w-5 h-5 text-${goal.color}-600`} />
            </div>
            <div>
              <CardTitle className="text-lg">{goal.title}</CardTitle>
              <CardDescription>{goal.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            {timeLeft}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress.toFixed(1)}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${goal.current.toLocaleString()}</span>
            <span>${goal.target.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="font-medium">
              ${(goal.target - goal.current).toLocaleString()}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Needed</p>
            <p className="font-medium">${monthlyRequired.toFixed(0)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1">
            Add Money
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1">
            Edit Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
