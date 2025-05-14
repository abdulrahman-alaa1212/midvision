import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Application and user settings (Placeholder).
        </p>
      </header>
      <Card className="shadow-sm">
        <CardHeader className="items-center text-center">
          <SettingsIcon className="h-12 w-12 text-accent mb-4" />
          <CardTitle>Settings Page</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Configure your application preferences and user profile here. This feature is under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
