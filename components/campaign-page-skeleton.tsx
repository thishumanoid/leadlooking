'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CampaignPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header Section Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3 w-2/3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-card/50">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tabs Section Skeleton */}
      <div className="w-full">
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid grid-cols-2 bg-card border-none">
            <TabsTrigger value="leads" disabled>
              Leads
            </TabsTrigger>
            <TabsTrigger value="keywords" disabled>
              Keywords
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border/50 flex items-center gap-3">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-28" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
