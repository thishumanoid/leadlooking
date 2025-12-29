'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateCampaignDialog } from '@/components/createCampaignDialog';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/supabase-provider';

interface Campaign {
  id: string;
  name: string;
  description: string;
  website_url: string;
  config: {
    ai_tone: string;
    message_length: string;
  };
  created_at: string;
  keywords: Array<{
    id: string;
    keyword: string;
  }>;
}

const CampaignsPage = () => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch campaigns on component mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);

      // Fetch campaigns with their keywords
      const { data: campaignsData, error: campaignsError } = await supabase
        .from('campaigns')
        .select(`
          id,
          name,
          description,
          website_url,
          config,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (campaignsError) throw campaignsError;

      console.log('⚡ supabase campaignsData', campaignsData);

      // Fetch keywords for each campaign
      const campaignsWithKeywords = await Promise.all(
        campaignsData.map(async (campaign) => {
          const { data: keywordsData, error: keywordsError } = await supabase
            .from('campaign_keywords')
            .select(`
              keyword_id,
              keywords (
                id,
                keyword
              )
            `)
            .eq('campaign_id', campaign.id);

          if (keywordsError) throw keywordsError;

          return {
            ...campaign,
            keywords: keywordsData.map((kw: any) => ({
              id: kw.keywords.id,
              keyword: kw.keywords.keyword,
            })),
          };
        })
      );

      setCampaigns(campaignsWithKeywords);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    router.push(`/campaigns/${campaignId}`);
  };

  const handleCreateCampaign = (newCampaign: Campaign) => {
    // Add new campaign to the top of the list
    setCampaigns([newCampaign, ...campaigns]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Empty State - Show when no campaigns */}
            {campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No campaigns yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Create your first campaign to start finding leads on Reddit
                </p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            ) : (
              /* Campaign Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    onClick={() => handleViewCampaign(campaign.id)}
                    className="group bg-card border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  >
                    {/* Campaign Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Active
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground transition-colors">
                          {campaign.name}
                        </h3>
                      </div>
                    </div>

                    {/* Product Description */}
                    {campaign.description && (
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {campaign.description}
                      </p>
                    )}

                    {/* Keywords */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        KEYWORDS ({campaign.keywords.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {campaign.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword.id}
                            className="px-2.5 py-1 text-xs rounded-md border font-medium"
                          >
                            {keyword.keyword}
                          </span>
                        ))}
                        {campaign.keywords.length > 3 && (
                          <span className="px-2.5 py-1 text-xs rounded-md border font-medium text-muted-foreground">
                            +{campaign.keywords.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full text-xs font-medium rounded-md transition-colors"
                      >
                        View Campaign
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Empty State Card - Add New Campaign */}
                <div
                  className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setShowCreateModal(true)}
                >
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    Create New Campaign
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Start monitoring Reddit for leads
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <CreateCampaignDialog
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreate={handleCreateCampaign}
      />
    </div>
  );
};

export default CampaignsPage;