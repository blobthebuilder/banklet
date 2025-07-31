import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function SecurityInfoCard() {
  return (
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
            🔒 <strong>Bank-level encryption:</strong> Your data is protected
            with 256-bit SSL encryption
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
  );
}
