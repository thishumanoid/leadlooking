'use client';

import { motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';

export function ScanningLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 relative overflow-hidden">
      {/* Background pulsing effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="w-64 h-64 rounded-full border-2 border-primary"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 1,
          }}
          className="w-64 h-64 rounded-full border-2 border-primary absolute"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="bg-background border-2 border-primary/50 p-4 rounded-full relative shadow-lg shadow-primary/20">
            <Search className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-1 border-t-2 border-primary rounded-full"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Scanning Reddit...
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            We're analyzing thousands of discussions to find your perfect leads. This usually takes
            2-3 minutes.
          </p>
        </div>

        <div className="flex px-4 py-2 bg-muted/50 rounded-full border border-border/50 items-center gap-3 mt-4">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground tabular-nums">
            Analyzing recent posts...
          </span>
        </div>
      </div>
    </div>
  );
}
