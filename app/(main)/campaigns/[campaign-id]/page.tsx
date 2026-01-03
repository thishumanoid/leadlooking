'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/supabase-provider';
import { useParams } from 'next/navigation';

import { RefreshCw, Edit, Trash2 } from 'lucide-react';
import LeadList, { Lead } from '@/components/leadList';
import { CampaignDialog } from '@/components/campaignDialog';
import { CampaignStats } from '@/components/campaign-stats';
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
import KeywordsGuide from '@/components/keywordsGuide';

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
    if (!campaignId) return;

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
              chatUrl: post.chat_url || '#',
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
  }, [campaignId]);

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

  if (isLoading || !isLoaded) {
    return <div className="p-8 text-center text-muted-foreground">Loading campaign...</div>;
  }

  if (!campaign) {
    return <div className="p-8 text-center text-muted-foreground">Campaign not found.</div>;
  }

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
            {/* <Button
              variant="outline"
              className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <RefreshCw className="w-4 h-4" />
              Sync now
            </Button> */}
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

        <CampaignStats campaign={campaign} leads={leads} />
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-card border-none">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
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
                className=" mt-4"
                variant="primary"
              >
                <Edit size={15} className="mr-2" />
                Edit Keywords
              </Button>
            </CardContent>
          </Card>
          <br />
          <KeywordsGuide />
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
