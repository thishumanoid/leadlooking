'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RedditIcon from './global/RedditIcon';

export function LeadLookingStickyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show banner after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[100001] bg-[#0E101A] border-b border-white/10 shadow-2xl"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[56px] py-2 flex items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 shrink">
              <div className="hidden sm:flex w-7 h-7 rounded-sm bg-[#FC4503] items-center justify-center text-white scale-90 shrink-0">
                <RedditIcon />
              </div>
              <p className="text-white font-bold text-xs sm:text-[15px] tracking-tight leading-tight sm:leading-normal text-center sm:text-left">
                Find high-intent customers on Reddit.
              </p>
            </div>

            <Link href="/sign-up" className="shrink-0">
              <Button
                size="sm"
                className="h-8 px-3 sm:px-4 bg-primary font-bold rounded-sm text-xs sm:text-[13px] transition-all whitespace-nowrap"
              >
                {'Find Customers ->'}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
