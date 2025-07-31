import React from "react";

export function InsightsCard({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
}: InsightsCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${bgColor} border-border/50`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
