import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage global store features, including Hype/Drop Mode.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Hype / Drop Mode</h2>
        <p className="text-sm text-muted-foreground mb-6">
          When enabled, the entire store will be locked behind a "Preparing for New Drop" screen. 
          Normal customers will not be able to browse or buy products. Because you are an Admin, you will 
          always bypass this lock so you can preview the site.
        </p>
        
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
