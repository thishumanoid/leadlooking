import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar Skeleton */}
      <div className="hidden border-r md:block md:w-64 lg:w-72 shrink-0">
        <div className="flex h-16 items-center px-4 border-b">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="p-4 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <div className="pt-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Skeleton */}
        <header className="flex h-16 items-center justify-between gap-2 border-b px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-md" /> {/* Trigger/Icon */}
            <Skeleton className="h-6 w-32 ml-2" /> {/* Title */}
          </div>
          <Skeleton className="size-8 rounded-full" /> {/* User Button */}
        </header>

        {/* Content Area Skeleton */}
        <div className="flex-1 space-y-4 p-4 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Skeleton className="col-span-4 h-[400px] rounded-xl" />
            <Skeleton className="col-span-3 h-[400px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
