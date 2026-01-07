'use client';

import { Megaphone, Settings, MessageCircleHeart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/global/YourLogo';
import { Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/subscription';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Menu items.
const items = [
  {
    title: 'Campaigns',
    url: '/campaigns',
    icon: Megaphone,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Any Feedback',
    url: '/feedback',
    icon: MessageCircleHeart,
  },
];

function UpgradeCard() {
  return (
    <div className="px-3 py-2">
      <Link href="/upgrade">
        <Card className="group relative overflow-hidden bg-transparent border-dashed border-muted-foreground/20 hover:border-primary/30 transition-all shadow-none border">
          <CardContent className="">

            <h3 className="font-semibold text-sm text-foreground mb-1">Upgrade to Pro</h3>
            <p className="text-[12px] leading-snug text-muted-foreground mb-4">
              Find relevant conversations
            </p>

            <Button className="w-full h-8 text-[11px] font-bold shadow-sm transition-all active:scale-95">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { isPremium, isLoading } = useSubscription();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5 mt-2">
            <div className="flex items-center gap-2">
              <Logo width="24" height="24" />
              <span className="font-semibold text-base">LeadLooking</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {!isLoading && !isPremium && (
        <SidebarFooter className="pb-4">
          <UpgradeCard />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
