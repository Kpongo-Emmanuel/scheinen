import { CommerceHero } from "@/components/ui/commerce-hero";
import { prisma } from "@/lib/prisma";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CommerceHero />
    </main>
  );
}
