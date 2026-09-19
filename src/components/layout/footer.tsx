import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Footer() {
  const collections = await prisma.collection.findMany({ take: 4 });

  return (
    <footer className="w-full border-t border-border bg-background mt-auto py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="mb-6 inline-flex flex-col items-center sm:items-start gap-2">
            <div className="flex flex-col items-center gap-2">
              <img src="/ss_logo.png" alt="SS" className="h-20 md:h-28 object-contain mix-blend-multiply dark:mix-blend-normal" />
              <span className="font-semibold text-2xl tracking-[0.3em] uppercase text-foreground ml-[0.3em]">SCHEINEN</span>
            </div>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm mt-2">
            Curated collection of the finest mossanite, emeralds, lab diamonds, and precious stones for discerning tastes.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {collections.map(col => (
              <li key={col.id}>
                <Link href={`/shop/${col.id}`} className="hover:text-primary transition-colors">
                  {col.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="/refunds" className="hover:text-primary transition-colors">Return &amp; Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SCHEINEN CO. All rights reserved.
      </div>
    </footer>
  );
}
