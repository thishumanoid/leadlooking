'use client';

import { Megaphone, Settings, Users, HelpCircle, MessageCircleHeart } from 'lucide-react';
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
  // {
  //   title: 'Dashboard',
  //   url: '/dashboard',
  //   icon: LayoutDashboard,
  // },
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
    </Sidebar>
  );
}
