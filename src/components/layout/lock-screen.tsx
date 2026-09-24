"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";

export function LockScreen({ message, showBackButton = true }: { message?: string; showBackButton?: boolean }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-4">
      {showBackButton && (
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      )}
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center max-w-md text-center space-y-8"
      >
        <div className="flex flex-col items-center gap-2">
          <img 
            src="/logo.png" 
            alt="SCHEINEN" 
            className="h-20 md:h-24 object-contain dark:invert opacity-90"
          />
          <h1 className="font-bold tracking-[0.4em] uppercase text-xl md:text-2xl mt-4">
            SCHEINEN
          </h1>
        </div>
        
        <div className="h-[1px] w-12 bg-border/80"></div>
        
        <div className="space-y-4">
          <p className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground">
            {message || "PREPARING FOR NEW DROP"}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
            <Lock className="w-3 h-3" />
            <span className="tracking-widest uppercase">Store Locked</span>
          </div>
        </div>
      </motion.div>

      {/* Admin Login Link at the very bottom, very subtle */}
      <div className="absolute bottom-8">
        <Link href="/login" className="text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-muted-foreground transition-colors">
          Admin Access
        </Link>
      </div>
    </div>
  );
}
