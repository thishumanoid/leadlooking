'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/utils/constants/navlinks';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import MaxWidthWrapper from '../global/MaxWidthWrapper';
import MobileNavbar from './mobile-navbar';
import AnimationContainer from '../global/animation-container';
// import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Logo from '../global/YourLogo';
// import { appName } from '@/config';
import config from '@/config';

const Navbar = () => {
  const user = false;
  const pathname = usePathname();
  const isAuthPage = pathname.includes('auth');

  return (
    <header className="sticky top-0 inset-x-0 h-14 w-full border-background/80 bg-background/80 z-[99999]">
      <AnimationContainer reverse delay={0.1} className="size-full">
        <MaxWidthWrapper className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center gap-2">
              <Logo height="32" width="32" />
              <span className="text-lg font-normal font-heading">{config.appName ?? ''}</span>
            </Link>

            {/* Desktop Navigation */}
            {!isAuthPage && (
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.title}>
                      {link.menu ? (
                        <>
                          <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-transparent">
                            {link.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul
                              className={cn(
                                'grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl',
                                link.title === 'Features'
                                  ? 'lg:grid-cols-[.75fr_1fr]'
                                  : 'lg:grid-cols-2'
                              )}
                            >
                              {link.title === 'Features' && (
                                <li className="row-span-4">
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href="/"
                                      className="flex h-full w-full flex-col justify-end rounded-lg p-4 no-underline outline-none focus:shadow-md"
                                    >
                                      <h6 className="mb-2 mt-4 text-lg font-medium">
                                        All Features
                                      </h6>
                                      <p className="text-sm leading-tight text-muted-foreground">
                                        Comments and engage
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              )}
                              {link.menu.map((menuItem) => (
                                <ListItem
                                  key={menuItem.title}
                                  title={menuItem.title}
                                  href={menuItem.href}
                                  icon={menuItem.icon}
                                >
                                  {menuItem.tagline}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'bg-transparent hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            {link.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Auth Actions */}
          {!isAuthPage && (
            <div className="hidden lg:flex items-center">
              {user ? (
                <Link href="/dashboard" className={buttonVariants({ size: 'sm' })}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/sign-in" className={buttonVariants({ size: 'sm' })}>
                  Sign Up
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
              )}
            </div>
          )}

          <MobileNavbar />
        </MaxWidthWrapper>
      </AnimationContainer>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            'block space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2 text-neutral-300">
            <Icon className="h-4 w-4" />
            <h6 className="text-sm font-medium leading-none">{title}</h6>
          </div>
          <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default Navbar;
