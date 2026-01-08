'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ScanningLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = [
    {
      title: 'Scanning Reddit...',
      description: "We're analyzing thousands of discussions to find your perfect leads.",
    },
    {
      title: 'Analysing posts using AI...',
      description: 'Our AI is reading through posts to understand context and relevance.',
    },
    {
      title: 'Filtering irrelevant content...',
      description: 'Removing spam, self-promotion, and low-quality posts from the results.',
    },
    {
      title: 'Identifying potential leads...',
      description: 'Matching discussions with your specified keywords and intent.',
    },
    {
      title: 'Scoring leads based on relevance...',
      description: 'Ranking the best opportunities for you to engage with first.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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

        <div className="flex flex-col items-center gap-2 h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 text-center">
                {STEPS[currentStep].title}
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                {STEPS[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
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
