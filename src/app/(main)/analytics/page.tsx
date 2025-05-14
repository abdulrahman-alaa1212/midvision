import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and reporting (Placeholder).
        </p>
      </header>
      <Card className="shadow-sm">
        <CardHeader className="items-center text-center">
          <BarChart3 className="h-12 w-12 text-accent mb-4" />
          <CardTitle>Analytics Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This section will provide in-depth analytics for your AR/MR projects.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
