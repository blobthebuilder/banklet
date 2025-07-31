import { Card, CardContent } from "@/components/ui/card";

export function KeyMetricsCard({
  title,
  value,
  valueColor = "text-primary",
  icon,
  trendIcon,
  trendText,
  trendColor,
  gradient,
}: KeyMetricsCardProps) {
  return (
    <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className={`text-2xl ${valueColor}`}>{value}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className={`w-4 h-4 ${trendColor}`}>{trendIcon}</div>
              <span className={`text-sm ${trendColor}`}>{trendText}</span>
            </div>
          </div>
          <div
            className={`p-3 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
