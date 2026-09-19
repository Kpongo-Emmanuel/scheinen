"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CommerceHero() {
  return (
    <div className="w-full relative flex flex-col justify-center min-h-[85vh] bg-background border-b border-border overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-8"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
            The New Standard
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tighter uppercase text-foreground leading-[1.1]">
            Elegance <br className="hidden sm:block" />
            <span className="text-muted-foreground font-light italic tracking-tight lowercase">redefined.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Discover a curated collection of fine mossanite, emeralds, lab diamonds, and precious stones crafted for the discerning eye.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button size="lg" asChild className="rounded-none h-14 px-8 uppercase tracking-widest text-xs font-semibold w-full sm:w-auto">
              <Link href="/shop">
                Shop The Collection
              </Link>
            </Button>
            <Link 
              href="/collections" 
              className="group flex items-center text-xs font-semibold uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
            >
              View Lookbook 
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
