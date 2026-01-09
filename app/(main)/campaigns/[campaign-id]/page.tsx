/// campaigns/[campaign-id]/page.tsx:

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/supabase-provider';
import { useParams } from 'next/navigation';

// Added Zap, Crown, Mail to imports
import { Edit, Trash2, Zap, Bell, Mail } from 'lucide-react';
import LeadList, { Lead } from '@/components/leadList';
import { CampaignDialog } from '@/components/campaignDialog';
import { CampaignStats } from '@/components/campaign-stats';
import { useSearchParams } from 'next/navigation';
import { useRealtimeRun } from '@trigger.dev/react-hooks';
import { ScanningLoader } from '@/components/scanning-loader';
import { ConfettiSideCannons } from '@/components/confetti-side-cannons';
import { ScanResultsDialog } from '@/components/scan-results-dialog';
import { useUser } from '@clerk/nextjs';
import { CampaignPageSkeleton } from '@/components/campaign-page-skeleton';

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
import { useSubscription } from '@/hooks/subscription';
import Link from 'next/link';

export default function CampaignsPage() {
  const params = useParams();
  const campaignId = params?.['campaign-id'] as string;
  const { supabase, isLoaded } = useSupabase();
  const [activeTab, setActiveTab] = useState('leads');
  const [campaign, setCampaign] = useState<any>(null);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { isPremium: isSubscriptionPremium } = useSubscription();

  // Trigger.dev hook implementation
  const searchParams = useSearchParams();
  const runId = searchParams?.get('runId');
  const accessToken = searchParams?.get('token');

  const { run } = useRealtimeRun(runId ?? undefined, {
    accessToken: accessToken ?? '',
    enabled: !!runId,
  });

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

        // Fetch leads using the new API endpoint
        const response = await fetch('/api/campaign/get-leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campaignId: campaignId,
            userEmail: user?.emailAddresses[0].emailAddress,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data = await response.json();
        console.log('data', data);
        setLeads(data.leads || []);
        setIsPremium(data.isPremium ?? true);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [campaignId]);

  // Watch for run completion to refetch leads
  useEffect(() => {
    if (run?.status === 'COMPLETED') {
      // Refetch leads logic
      const refetchLeads = async () => {
        setIsLoading(true); // Maybe not full page load, but update leads
        try {
          // Fetch leads using the new API endpoint
          const response = await fetch('/api/campaign/get-leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              campaignId: campaignId,
              userEmail: user?.emailAddresses[0].emailAddress,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch leads');
          }

          const data = await response.json();
          const transformedLeads = data.leads || [];
          console.log('transformedLeads', transformedLeads);
          setLeads(transformedLeads);
          setIsPremium(data.isPremium ?? true);

          if (transformedLeads.length > 0) {
            setShowConfetti(true);
            setShowResultsDialog(true);
          } else {
            toast.info('Scan completed. No new leads found matching your criteria.');
          }

          // Clear URL param?
          router.replace(`/campaigns/${campaignId}`);
        } catch (error) {
          console.error('Refetch error', error);
        } finally {
          setIsLoading(false);
        }
      };

      refetchLeads();
    }
  }, [run?.status]);

  const isScanning =
    run?.status === 'EXECUTING' || run?.status === 'WAITING' || run?.status === 'QUEUED';

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

  if (!isLoaded) {
    return <CampaignPageSkeleton />;
  }

  if (isLoading) {
    return <CampaignPageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-[1600px] mx-auto">
      <ConfettiSideCannons autoFire={showConfetti} />
      <ScanResultsDialog
        open={showResultsDialog}
        onOpenChange={setShowResultsDialog}
        strongMatches={leads.filter((l) => l.matchStrength === 'strong').length}
        potentialMatches={leads.filter((l) => l.matchStrength === 'partial').length}
      />
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold bg-clip-text ">{campaign.name}</h1>
            {/* <p className="text-muted-foreground max-w-2xl border border-gray-200/10 rounded px-2 py-1 inline-block border-b">
              {campaign.website_url}
            </p> */}
          </div>
          <div className="flex items-center gap-2">
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
                    associated keywords.
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

        {!isSubscriptionPremium && (
          <div className="rounded-xl border bg-transparent p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Icon Wrapper */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-transparent text-primary dark:text-primary-foreground">
                <Bell className="h-6 w-6" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg leading-none">Autopilot Mode is off</h3>
                </div>

                <p className="text-sm text-muted-foreground">
                  With Premium, LeadLooking will scan reddit everyday and send new leads to{' '}
                  <span className="inline-flex items-center font-medium text-foreground mx-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {campaign.notify_email || 'your email'}
                  </span>
                </p>
              </div>
              <Link href="/upgrade">
                <Button>
                  {/* <Crown className="mr-2 h-4 w-4" /> */}
                  Enable Autopilot
                </Button>
              </Link>
            </div>
          </div>
        )}

        <CampaignStats campaign={campaign} leads={leads} />
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-card border-none">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-6 space-y-4">
          {isScanning ? <ScanningLoader /> : <LeadList leads={leads} isPremium={isPremium} />}
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
              <Button onClick={() => setIsEditDialogOpen(true)} className=" mt-4" variant="primary">
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
