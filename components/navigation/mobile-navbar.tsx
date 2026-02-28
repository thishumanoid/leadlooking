'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import config from '@/config';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/utils/constants/navlinks';
import { LucideIcon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const MobileNavbar = () => {
  const user = false;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleClick = (planName: string) => {
    console.log('event sent from navbar ✅');
  };

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:w-80">
          <SheetHeader className="px-6">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full pt-6 px-6">
            {/* Auth Button */}
            <div className="pb-6">
              
                <Link
                  href={config.chromeWebStoreUrl || '#'}
                  onClick={() => {
                    handleClick('navbar_mobile:get_started_btn:click');
                    handleClose();
                  }}
                  className={buttonVariants({ className: 'w-full' })}
                >
                  Get Started
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto -mx-6">
              <Accordion type="single" collapsible className="w-full px-6">
                {NAV_LINKS.map((link) => (
                  <AccordionItem key={link.title} value={link.title}>
                    {link.menu ? (
                      <>
                        <AccordionTrigger className="text-sm font-medium">
                          {link.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1">
                            {link.menu.map((menuItem) => (
                              <ListItem
                                key={menuItem.title}
                                title={menuItem.title}
                                href={menuItem.href}
                                icon={menuItem.icon}
                                onClick={handleClose}
                              >
                                {menuItem.tagline}
                              </ListItem>
                            ))}
                          </ul>
                        </AccordionContent>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="flex items-center w-full py-4 text-sm font-medium transition-colors hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={href!}
        ref={ref}
        className={cn(
          'block rounded-md p-3 transition-colors hover:bg-accent',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        {children && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {children}
          </p>
        )}
      </Link>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default MobileNavbar;