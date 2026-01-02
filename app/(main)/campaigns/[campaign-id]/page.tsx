'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/supabase-provider';
import { useParams } from 'next/navigation';

import { RefreshCw, Edit, Trash2, Zap, Clock, CoffeeIcon } from 'lucide-react';
import LeadList, { Lead } from '@/components/leadList';
import { CampaignDialog } from '@/components/campaignDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
            id,
            lead_score,
            reddit_post_id,
            reddit_posts (*)
          `
          )
          .eq('campaign_id', campaignId);

        if (leadError) throw leadError;

        const transformedLeads: Lead[] = (leadData || [])
          .map((item: any) => {
            const post = item.reddit_posts;
            if (!post) return null;

            return {
              id: post.id,
              platform: 'Reddit',
              subreddit: post.subreddit || 'unknown',
              author: post.author || 'anonymous',
              title: post.title || 'No Title',
              preview: (post.content || '').substring(0, 200) + '...',
              fullText: post.content || '',
              timestamp: post.created_at_reddit ? new Date(post.created_at_reddit) : new Date(),
              matchStrength: (item.lead_score || 0) >= 70 ? 'strong' : 'partial',
              isNew: post.created_at_reddit
                ? new Date().getTime() - new Date(post.created_at_reddit).getTime() <
                  24 * 60 * 60 * 1000
                : false,
              postUrl: post.url || '#',
            } as Lead;
          })
          .filter((l): l is Lead => l !== null);

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

  const handleDeleteCampaign = async () => {
    if (!campaignId) return;

    try {
      // 1. Delete associated leads (delink from campaign_leads)
      const { error: leadsError } = await supabase
        .from('campaign_leads')
        .delete()
        .eq('campaign_id', campaignId);

      if (leadsError) throw leadsError;

      // 2. Delete associated keywords
      const { error: keywordsError } = await supabase
        .from('keywords')
        .delete()
        .eq('campaign_id', campaignId);

      if (keywordsError) throw keywordsError;

      // 3. Delete the campaign itself
      const { error: campaignError } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId);

      if (campaignError) throw campaignError;

      toast.success('Campaign deleted successfully');
      router.push('/campaigns');
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
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

  const formatLastScanned = (date: string | null) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

    return d.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5 text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the campaign "{campaign.name}" and all its
                    associated keywords. Reddit posts will NOT be deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteCampaign}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                  <div className="text-4xl font-bold">{strongMatches}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partial Matches */}
          <Card className="relative overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-orange-500">
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
          <Card className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-blue-500">
                <RefreshCw className="w-4 h-4" />
                Last Scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    campaign.last_scanned ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
                  }`}
                />
                <div className="text-2xl font-bold">{formatLastScanned(campaign.last_scanned)}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {campaign.last_scanned ? 'Scan completed' : 'Initial scan pending'}
              </div>
            </CardContent>
          </Card>

          {/* Next Sync */}
          <Card className="relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2 text-purple-500">
                <Clock className="w-4 h-4" />
                Next Scan
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
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                className="w-full mt-4"
                variant="outline"
              >
                <Edit size={15} className="mr-2" />
                Edit Keyword
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
