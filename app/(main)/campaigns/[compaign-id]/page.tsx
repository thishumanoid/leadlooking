'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  RefreshCw,
  Edit,
  Trash2,
  Zap,
  Clock,
  CoffeeIcon
} from 'lucide-react';
import LeadList from '@/components/leadList';

// Sample data for demonstration
const SAMPLE_CAMPAIGN = {
  id: '1',
  name: 'SEO',
  description:
    "I'm an SEO specialist helping businesses improve their search rankings and website traffic",
  platforms: ['Reddit', 'X'],
  keywords: [
    'need CRM software',
    'looking for SEO help',
    'SEO specialist needed',
    'improve search rankings',
    'website traffic',
  ],
  lastSync: new Date(),
  nextSync: new Date(Date.now() + 23 * 60 * 60 * 1000 + 58 * 60 * 1000),
  strongMatches: 52,
  partialMatches: 47,
  strongMatchesChange: 12,
  partialMatchesChange: 7,
};


export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('leads');

  const formatNextSync = (date: Date) => {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `in ${hours} hours, ${minutes} minutes`;
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold bg-clip-text ">{SAMPLE_CAMPAIGN.name}</h1>
            <p className="text-muted-foreground max-w-2xl">{SAMPLE_CAMPAIGN.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <RefreshCw className="w-4 h-4" />
              Sync now
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Strong Matches */}
          <Card className="relative overflow-hidden border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-green-500">
                <Zap className="w-4 h-4" />
                Strong Matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold">{SAMPLE_CAMPAIGN.strongMatches}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partial Matches */}
          <Card className="relative overflow-hidden border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-yellow-500">
                <CoffeeIcon className="w-4 h-4" />
                Partial Matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold">{SAMPLE_CAMPAIGN.partialMatches}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Sync */}
          <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-blue-500">
                <RefreshCw className="w-4 h-4" />
                Last Sync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-2xl font-bold">Right now</div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Initial</div>
            </CardContent>
          </Card>

          {/* Next Sync */}
          <Card className="relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-purple-500">
                <Clock className="w-4 h-4" />
                Next Sync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNextSync(SAMPLE_CAMPAIGN.nextSync)}</div>
              <div className="mt-2 w-full bg-secondary rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full w-[15%]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid   grid-cols-3 bg-card border-none">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="ai-settings">AI Reply Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-6 space-y-4">
          

          <LeadList />
        </TabsContent>

        <TabsContent value="keywords" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
              <CardDescription>Manage the keywords this campaign is tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {SAMPLE_CAMPAIGN.keywords.map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <span className="font-medium">{keyword}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button className="w-full mt-4" variant="outline">
                + Add Keyword
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Reply Settings</CardTitle>
              <CardDescription>
                Configure how AI generates replies for this campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI reply settings will be configured here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
