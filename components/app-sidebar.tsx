'use client';

import { LayoutDashboard, Megaphone, Settings, Users, HelpCircle, Crown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/global/YourLogo';

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
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Campaigns',
    url: '/campaigns',
    icon: Megaphone,
  },
  // {
  //   title: 'Leads',
  //   url: '/leads',
  //   icon: Users,
  // },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const userPlan = 'Starter';
  const campaignsUsed = 1;
  const campaignsLimit = 1;
  const keywordsUsed = 5;
  const keywordsLimit = 5;

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

      <SidebarFooter className="p-4">
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>{userPlan} Plan</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Campaigns</span>
                <span className="font-medium">
                  {campaignsUsed}/{campaignsLimit}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(campaignsUsed / campaignsLimit) * 100}%` }}
                />
              </div>
            </div>

            {/* Keywords Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Keywords</span>
                <span className="font-medium">
                  {keywordsUsed}/{keywordsLimit}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(keywordsUsed / keywordsLimit) * 100}%` }}
                />
              </div>
            </div>

            <Link href="/feedback">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 flex items-center justify-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Need Help?
              </Button>
            </Link>
          </CardContent>
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
}
