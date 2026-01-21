'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FaReddit } from 'react-icons/fa';
import RedditIcon from './global/RedditIcon';

export function LeadLookingAd() {
  return (
    <div className="my-10 not-prose">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors duration-200">
        <div className="flex items-center gap-5">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500">
            <RedditIcon />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-foreground">Find your next customer on Reddit</h4>
            <p className="text-muted-foreground text-sm max-w-md">
              LeadLooking tracks Reddit on autopilot and notifies you the second someone needs your
              solution.
            </p>
          </div>
        </div>

        <Link href="/sign-up" className="w-full md:w-auto">
          <Button className="w-full md:w-auto px-8 h-11 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
            Try LeadLooking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
