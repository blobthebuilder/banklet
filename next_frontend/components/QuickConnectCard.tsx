import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuickConnectCard({
  popularBanks,
}: QuickConnectCardProps) {
  return (
    <Card className="border-border/50 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-600">Quick Connect</CardTitle>
        <CardDescription>Popular banks for instant connection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {popularBanks.slice(0, 4).map((bank) => (
            <Button
              key={bank}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-blue-100 hover:border-blue-300">
              {bank}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
