'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import RedditIcon from './global/RedditIcon';

export function LeadLookingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[450px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex flex-col items-center text-center p-8 pt-12 space-y-6">
                {/* Visual Mockup */}
                <div className="relative w-full aspect-[16/10] bg-muted/30 rounded-2xl border border-border p-4 flex flex-col gap-3 overflow-hidden group">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border shadow-md"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <RedditIcon />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-muted-foreground tracking-wider">
                            r/startups
                          </span>
                          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <span className="text-[10px] text-muted-foreground">Just now</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        Looking for a no-code waitlist builder?
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border shadow-md"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <RedditIcon />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-muted-foreground tracking-wider">
                            r/startups
                          </span>
                          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <span className="text-[10px] text-muted-foreground">2 min ago</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        Need an SEO agency that specializes in SaaS
                      </p>
                    </div>
                  </motion.div>

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-none" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                    Find leads instantly.
                  </h2>
                  <p className="text-muted-foreground text-[15px]">
                    Get real-time lead notifications whenever someone needs your solution.
                  </p>
                </div>

                <div className="w-full space-y-3">
                  <Link href="/sign-up" className="block w-full">
                    <Button className="w-full h-12 text-base font-bold rounded-xl space-x-2 shadow-lg shadow-red-500/20 transition-all">
                      <span>Find Leads</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
