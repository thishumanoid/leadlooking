'use client';

import React, { useState } from 'react';
import { Bell, Mail, Slack, CreditCard, Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useSubscription } from '@/hooks/subscription';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { isPremium, isLoading } = useSubscription();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-5 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your notifications and subscription preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Choose how you want to be notified when new leads are found
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-start gap-3 flex-1">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <Label
                      htmlFor="email-notifications"
                      className="text-base font-medium cursor-pointer"
                    >
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email alerts when leads matching your keywords are found
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              {/* Slack Notifications */}
              <div className="flex items-center justify-between space-x-4 opacity-60">
                <div className="flex items-start gap-3 flex-1">
                  <Slack className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-medium">Slack Notifications</Label>
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications in your Slack workspace
                    </p>
                  </div>
                </div>
                <Switch disabled />
              </div>
            </CardContent>
          </Card>

          {/* Subscription Section */}
          {isLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ) : isPremium ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Subscription</CardTitle>
                </div>
                <CardDescription>Manage your subscription plan and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Details */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Active Plan</p>
                      <p className="text-2xl font-bold">Pro Plan</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                      Active
                    </Badge>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      Included Benefits
                    </p>
                    <div className="space-y-2">
                      {[
                        'Find Unlimited Leads',
                        '5 Keywords Tracking',
                        '1 active campaign',
                        'Email notifications',
                        '24/7 Support',
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Renewal Date */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Your subscription will automatically renew
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link target="_blank" href="https://polar.sh/leadlooking/portal">
                  <Button className="w-full" variant="outline">
                    Manage Subscription
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
