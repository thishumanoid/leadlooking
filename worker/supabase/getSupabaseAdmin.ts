import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

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

export async function fetchCampaignsWithKeywords(): Promise<CampaignWithKeywords[]> {
  try {
    // Fetch all campaigns
    const { data: campaigns, error: campaignsError } = await supabaseAdmin
      .from('campaigns')
      .select('*')

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
