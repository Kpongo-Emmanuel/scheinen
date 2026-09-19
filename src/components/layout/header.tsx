"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBasket, Menu, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/useCart";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { name: "Shop All", href: "/shop" },
  { name: "Collections", href: "/collections" },
];

export function Header() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useCart((state) => state.items);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-24 md:h-32 flex items-center justify-between relative">
        
        {/* Left Nav */}
        <nav className="hidden md:flex flex-1 items-center gap-8">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-xs font-semibold tracking-widest uppercase hover:text-muted-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex-1 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-background border-r border-border/50">
              <SheetHeader className="p-6 border-b border-border/50 text-center">
                <SheetTitle asChild>
                  <button onClick={() => { router.push("/"); setIsMobileMenuOpen(false); }} className="inline-flex flex-col items-center gap-2 mx-auto">
                    <img src="/ss_logo.png" alt="SS" className="h-10 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <span className="font-semibold text-lg tracking-[0.3em] uppercase text-foreground ml-[0.3em]">SCHEINEN</span>
                  </button>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col p-4 gap-2">
                <form action="/search" method="GET" className="relative flex items-center mb-4">
                  <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
                  <input 
                    type="search" 
                    name="q"
                    placeholder="Search products..." 
                    className="w-full h-10 pl-9 pr-4 rounded-md border border-border bg-muted/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </form>
                {navigation.map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => { router.push(item.href); setIsMobileMenuOpen(false); }}
                    className="px-4 py-3 text-left text-sm font-semibold tracking-widest uppercase hover:bg-accent rounded-md transition-colors w-full"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              
              <Separator />
              
              <div className="p-6">
                {session ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Account ({session.user?.name || session.user?.email})
                    </p>
                    {session.user?.role === "ADMIN" && (
                      <Button onClick={() => { router.push("/admin"); setIsMobileMenuOpen(false); }} variant="outline" className="w-full justify-start h-12 rounded-none">
                        Admin Dashboard
                      </Button>
                    )}
                    <Button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} variant="secondary" className="w-full justify-between h-12 rounded-none">
                      Log Out <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => { router.push("/login"); setIsMobileMenuOpen(false); }} className="w-full justify-between h-12 rounded-none uppercase tracking-widest text-xs">
                    Log In <ArrowUpRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex flex-col items-center gap-1 sm:gap-2">
            <img src="/ss_logo.png" alt="SS" className="h-10 sm:h-14 md:h-16 object-contain mix-blend-multiply dark:mix-blend-normal" />
            <span className="font-semibold text-sm sm:text-lg md:text-xl tracking-[0.3em] uppercase text-foreground ml-[0.3em]">SCHEINEN</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-6">
          <form action="/search" method="GET" className="hidden lg:flex relative items-center">
            <Search className="w-4 h-4 absolute left-0 text-muted-foreground" />
            <input 
              type="search" 
              name="q"
              placeholder="Search..." 
              className="h-8 pl-6 pr-0 bg-transparent border-b border-transparent hover:border-border focus:border-foreground text-xs uppercase tracking-widest focus:outline-none transition-all w-[100px] xl:w-[150px]"
            />
          </form>

          <Button variant="ghost" size="icon" asChild className="relative hover:bg-transparent hover:text-muted-foreground transition-colors">
            <Link href="/cart">
              <ShoppingBasket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div className="flex items-center gap-4">
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin" className="text-xs font-semibold tracking-widest uppercase hover:text-muted-foreground transition-colors">
                    Admin
                  </Link>
                )}
                <button onClick={() => signOut()} className="text-xs font-semibold tracking-widest uppercase hover:text-muted-foreground transition-colors">
                  Log Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-xs font-semibold tracking-widest uppercase hover:text-muted-foreground transition-colors">
                Log In
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
