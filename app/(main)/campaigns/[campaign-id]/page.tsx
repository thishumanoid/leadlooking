'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/supabase-provider';
import { useParams } from 'next/navigation';

import { RefreshCw, Edit, Trash2, Zap, Clock, CoffeeIcon } from 'lucide-react';
import LeadList, { Lead } from '@/components/leadList';
import { Badge } from '@/components/ui/badge';
import { CampaignDialog } from '@/components/campaignDialog';

// Sample data for demonstration

export default function CampaignsPage() {
  const params = useParams();
  const campaignId = params?.['campaign-id'] as string;
  const { supabase, isLoaded } = useSupabase();
  const [activeTab, setActiveTab] = useState('leads');
  const [campaign, setCampaign] = useState<any>(null);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded || !campaignId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch campaign details
        const { data: campaignData, error: campaignError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();

        if (campaignError) throw campaignError;
        setCampaign(campaignData);

        // Fetch keywords directly from keywords table
        const { data: keywordData, error: keywordError } = await supabase
          .from('keywords')
          .select('id, keyword')
          .eq('campaign_id', campaignId);

        if (keywordError) throw keywordError;
        setKeywords(keywordData || []);

        // Fetch leads (campaign_leads joined with reddit_posts)
        const { data: leadData, error: leadError } = await supabase
          .from('campaign_leads')
          .select(
            `
            *,
            reddit_posts (*),
            keywords (keyword)
          `
          )
          .eq('campaign_id', campaignId)
          .order('discovered_at', { ascending: false });

        if (leadError) throw leadError;

        const transformedLeads: Lead[] = leadData.map((l: any) => ({
          id: l.id,
          platform: 'Reddit',
          subreddit: l.reddit_posts?.subreddit || 'unknown',
          author: l.reddit_posts?.author || 'anonymous',
          title: l.reddit_posts?.title || 'No Title',
          preview: (l.reddit_posts?.content || '').substring(0, 200) + '...',
          fullText: l.reddit_posts?.content || '',
          timestamp: new Date(l.discovered_at || l.reddit_posts?.created_at_reddit || new Date()),
          matchStrength: (l.lead_score || 0) >= 70 ? 'strong' : 'partial',
          isNew: l.discovered_at
            ? new Date().getTime() - new Date(l.discovered_at).getTime() < 24 * 60 * 60 * 1000
            : false,
          upvotes: 0, // Not currently in schema but expected by UI
          comments: 0, // Not currently in schema but expected by UI
          postUrl: l.reddit_posts?.url || '#',
        }));

        setLeads(transformedLeads);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [campaignId, isLoaded]);

  const handleEditSuccess = (updatedCampaign: any) => {
    setCampaign(updatedCampaign);
    if (updatedCampaign.keywords) {
      setKeywords(updatedCampaign.keywords);
    }
    setIsEditDialogOpen(false);
  };

  const formatNextSync = (date: string | null) => {
    if (!date) return 'Not scheduled';
    const now = new Date();
    const diffInMs = new Date(date).getTime() - now.getTime();
    if (diffInMs < 0) return 'Any moment now';
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `in ${hours} hours, ${minutes} minutes`;
  };

  if (isLoading || !isLoaded) {
    return <div className="p-8 text-center text-muted-foreground">Loading campaign...</div>;
  }

  if (!campaign) {
    return <div className="p-8 text-center text-muted-foreground">Campaign not found.</div>;
  }

  const strongMatches = leads.filter((l) => l.matchStrength === 'strong').length;
  const partialMatches = leads.filter((l) => l.matchStrength === 'partial').length;

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold bg-clip-text ">{campaign.name}</h1>
            <p className="text-muted-foreground max-w-2xl">{campaign.description}</p>
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
              onClick={() => setIsEditDialogOpen(true)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                  <div className="text-4xl font-bold">{strongMatches}</div>
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
                  <div className="text-4xl font-bold">{partialMatches}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Sync */}
          {/* <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
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
          </Card> */}

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
              <div className="text-2xl font-bold">{formatNextSync(campaign.created_at)}</div>
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
          <LeadList leads={leads} />
        </TabsContent>

        <TabsContent value="keywords" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
              <CardDescription>Manage the keywords this campaign is tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {keywords.map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <span className="font-medium">{keyword.keyword}</span>
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

      <CampaignDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleEditSuccess}
        campaign={campaign}
        existingKeywords={keywords.map((k) => k.keyword)}
      />
    </div>
  );
}
