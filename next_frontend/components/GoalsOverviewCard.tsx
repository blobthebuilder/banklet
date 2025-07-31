"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export default function GoalsOverviewCard({
  title,
  value,
  icon: Icon,
  colorClass,
}: GoalsOverviewCardProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl ${colorClass}`}>{value}</p>
          </div>
          <div className={`p-3 bg-gradient-to-r rounded-lg`}>
            <Icon className={`w-5 h-5 ${colorClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
