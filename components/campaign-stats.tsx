'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { RefreshCw, Zap, Clock, CoffeeIcon } from 'lucide-react';
import { Lead } from '@/components/leadList';
import { useSubscription } from '@/hooks/subscription';
import Link from 'next/link';

interface CampaignStatsProps {
  campaign: any;
  leads: Lead[];
}

export function CampaignStats({ campaign, leads }: CampaignStatsProps) {
  const [timeUntilNextScan, setTimeUntilNextScan] = useState<string>('');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const { isLoading, isPremium } = useSubscription();

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const nextScan = new Date();
      nextScan.setHours(18, 0, 0, 0);

      if (now >= nextScan) {
        nextScan.setDate(nextScan.getDate() + 1);
      }

      const diffInMs = nextScan.getTime() - now.getTime();
      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilNextScan(`in ${hours} hours, ${minutes} minutes`);

      // Progress bar logic: percentage of 24h cycle
      const lastScanCycle = new Date(nextScan);
      lastScanCycle.setDate(lastScanCycle.getDate() - 1);

      const totalCycleMs = 24 * 60 * 60 * 1000;
      const elapsedMs = now.getTime() - lastScanCycle.getTime();
      const progress = Math.min(100, Math.max(0, (elapsedMs / totalCycleMs) * 100));
      setScanProgress(progress);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatLastScanned = (date: string | null) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

    return d.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const strongMatches = leads.filter((l) => l.matchStrength === 'strong').length;
  const partialMatches = leads.filter((l) => l.matchStrength === 'partial').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Strong Matches */}
      <Card className="relative overflow-hidden border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl" />
        <CardHeader className="pb-1">
          <CardDescription className="flex items-center gap-2 text-green-500">
            <Zap className="w-4 h-4" />
            Strong Matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold">{strongMatches}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partial Matches */}
      <Card className="relative overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <CardHeader className="pb-1">
          <CardDescription className="flex items-center gap-2 text-orange-500">
            <CoffeeIcon className="w-4 h-4" />
            Partial Matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-bold">{partialMatches}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Sync */}
      <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <CardHeader className="pb-1">
          <CardDescription className="flex items-center gap-2 text-blue-500">
            <RefreshCw className="w-4 h-4" />
            Last Scan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                campaign.last_scanned ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
              }`}
            />
            <div className="text-2xl font-bold">{formatLastScanned(campaign.last_scanned)}</div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {campaign.last_scanned ? 'Scan completed' : 'Initial scan pending'}
          </div>
        </CardContent>
      </Card>

      {/* Next Sync */}
      <Card className="relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <CardHeader className="pb-1">
          <CardDescription className="flex items-center gap-2 text-purple-500">
            <Clock className="w-4 h-4" />
            Next Scan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isPremium && !isLoading ? (
            <div className="space-y-2">
              <div className="text-xl font-bold text-muted-foreground italic">Paused</div>
              <div className="text-xs text-purple-400 font-medium">
                Daily scans are available on Pro plans.{' '}
                <Link
                  href="/settings"
                  className="underline hover:text-purple-300 transition-colors"
                >
                  Upgrade now
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">{timeUntilNextScan || 'Calculating...'}</div>
              <div className="mt-2 w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
