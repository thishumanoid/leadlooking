import supabaseAdmin from '@/lib/supabase/supabaseAdmin';
import { logger } from '@trigger.dev/sdk';



// interface Keyword {
//   id: string;
//   keyword: string;
//   campaign_id?: string;
//   user_id?: string | null;
// }

// interface Campaign {
//   id: string;
//   name: string | null;
//   description: string | null;
//   website_url: string | null;
//   config?: any;
//   created_at?: string | null;
//   user_id?: string;
// }

interface CampaignWithKeywords {
  campaign: Campaign;
  keywords: Keyword[];
}

export async function fetchCampaignsWithKeywords(isCron: boolean = false): Promise<CampaignWithKeywords[]> {
  try {
    // Fetch all campaigns
    const { data: campaigns, error: campaignsError } = await supabaseAdmin
      .from('campaigns')
      .select('*');

    if (campaignsError) {
      console.error('❌ Error fetching campaigns:', campaignsError);
      throw campaignsError;
    }

    if (!campaigns || campaigns.length === 0) {
      console.log('⚠️ No campaigns found');
      return [];
    }

    console.log(`✅ Found ${campaigns.length} campaigns: `, campaigns);

    // Fetch keywords for all campaigns
    const campaignsWithKeywords = [];

    for (const campaign of campaigns) {

      const isEligible = await isEligibleUserID(campaign.user_id);

      if (isCron && !isEligible) {
        logger.info(`❌Campaign ${campaign.id} is not eligible for cron job`);
        continue;
      };

      const { data: keywords, error: keywordsError } = await supabaseAdmin
        .from('keywords')
        .select('id, keyword')
        .eq('campaign_id', campaign.id);

      if (keywordsError) {
        console.error(`❌ Error fetching keywords for campaign ${campaign.id}:`, keywordsError);
        continue;
      }

      if (keywords && keywords.length > 0) {
        campaignsWithKeywords.push({
          campaign,
          keywords,
        });
      }
    }

    return campaignsWithKeywords as CampaignWithKeywords[];
  } catch (error) {
    console.error('❌ Fatal error in fetchCampaignsWithKeywords:', error);
    throw error;
  }
}

export async function fetchSingleCampaignWithKeywords(
  campaignId: string
): Promise<CampaignWithKeywords | null> {
  try {
    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError) {
      console.error(`❌ Error fetching campaign ${campaignId}:`, campaignError);
      return null;
    }

    if (!campaign) {
      console.log(`⚠️ Campaign ${campaignId} not found`);
      return null;
    }

    const { data: keywords, error: keywordsError } = await supabaseAdmin
      .from('keywords')
      .select('id, keyword')
      .eq('campaign_id', campaign.id);

    if (keywordsError) {
      console.error(`❌ Error fetching keywords for campaign ${campaignId}:`, keywordsError);
      return { campaign, keywords: [] };
    }

    return {
      campaign,
      keywords: keywords || [],
    } as CampaignWithKeywords;
  } catch (error) {
    console.error(`❌ Fatal error in fetchSingleCampaignWithKeywords for ${campaignId}:`, error);
    throw error;
  }
}

export async function fetchAnalyzedPostIds(
  campaignId: string,
  redditIds: string[]
): Promise<string[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('analyzed_posts')
      .select('reddit_id')
      .eq('campaign_id', campaignId)
      .in('reddit_id', redditIds);

    if (error) {
      console.error(`❌ Error fetching analyzed posts for campaign ${campaignId}:`, error);
      return [];
    }

    return data?.map((row) => row.reddit_id) || [];
  } catch (error) {
    console.error(`❌ Fatal error fetching analyzed posts for campaign ${campaignId}:`, error);
    return [];
  }
}



export async function isEligibleUserID(userID: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select()
      .eq('user_id', userID)
      .single();


    if (data) {
      const premiumStatus = data.subscription_status.trim().toLowerCase();

      if (premiumStatus === 'active' || premiumStatus === 'trialing' || premiumStatus === 'paid') return true;
    }

    if (error) return false;
  } catch (error) {
    return false;
  }
}