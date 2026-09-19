import { CommerceHero } from "@/components/ui/commerce-hero";
import { getStoreLockStatus } from "@/lib/store-lock";
import { LockScreen } from "@/components/layout/lock-screen";

export default async function Home() {
  const { locked, message } = await getStoreLockStatus();
  if (locked) return <LockScreen message={message} />;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CommerceHero />
    </main>
  );
}
