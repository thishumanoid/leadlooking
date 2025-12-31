import supabaseAdmin from '@/lib/supabase/supabaseAdmin';


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
      .order('created_at', { ascending: false });

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
    const campaignsWithKeywords: CampaignWithKeywords[] = [];

    for (const campaign of campaigns) {
      const { data: keywordLinks, error: keywordsError } = await supabaseAdmin
        .from('campaign_keywords')
        .select(
          `
          keyword_id,
          keywords (
            id,
            keyword
          )
        `
        )
        .eq('campaign_id', campaign.id);

      if (keywordsError) {
        console.error(`❌ Error fetching keywords for campaign ${campaign.id}:`, keywordsError);
        continue;
      }

      const keywords = keywordLinks?.map((link: any) => link.keywords).filter(Boolean) || [];

      if (keywords.length > 0) {
        campaignsWithKeywords.push({
          campaign,
          keywords,
        });
      }
    }


    return campaignsWithKeywords;
  } catch (error) {
    console.error('❌ Fatal error in fetchCampaignsWithKeywords:', error);
    throw error;
  }
}
