'use client';

import { usePathname } from 'next/navigation';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { UserButton } from '@clerk/nextjs';
import SupabaseProvider from '@/hooks/supabase-provider';
// Map routes to titles
const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/campaigns': 'Campaigns',
  '/leads': 'Leads',
  '/settings': 'Settings',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pageTitle = routeTitles[pathname] || 'Dashboard';

  return (
    <SupabaseProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 size-5 stroke-1 text-secondary" />
              <h1 className="text-lg font-semibold ml-2">{pageTitle}</h1>
            </div>
            <UserButton />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
          
        </SidebarInset>
      </SidebarProvider>
    </SupabaseProvider>
  );
}
