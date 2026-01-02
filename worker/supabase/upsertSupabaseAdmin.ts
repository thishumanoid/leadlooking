import supabaseAdmin from '@/lib/supabase/supabaseAdmin';
// import type { RedditPost } from '@/types/globalTypes';

export async function upsertRedditPost(post: RedditPostInsert) {
  try {
    const { data, error } = await supabaseAdmin
      .from('reddit_posts')
      .upsert(
        {
          reddit_id: post.reddit_id,
          subreddit: post.subreddit,
          author: post.author,
          title: post.title,
          content: post.content,
          url: post.url,
          created_at_reddit: post.created_at_reddit,
        },
        {
          onConflict: 'reddit_id',
          ignoreDuplicates: false,
        }
      )
      .select('id')
      .single();

    if (error) {
      console.error(`    ❌ Error upserting post ${post.reddit_id}:`, error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error(`    ❌ Fatal error upserting post ${post.reddit_id}:`, error);
    return null;
  }
}

/**
 * Creates a campaign lead connection
 */
export async function createCampaignLead(
  campaignId: string,
  keywordText: string,
  redditPostId: string,
  userId: string,
  leadScore: number = 0,
  intent: string = 'pending'
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('campaign_leads')
      .insert({
        campaign_id: campaignId,
        keyword: keywordText,
        reddit_post_id: redditPostId,
        user_id: userId,
        lead_score: leadScore,
        intent: intent,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error(`    ❌ Error creating campaign lead:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`    ❌ Fatal error creating campaign lead:`, error);
    return false;
  }
}

/**
 * Updates only the last_scanned column for a campaign
 */
export async function updateCampaignLastScanned(campaignId: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('campaigns')
      .update({
        last_scanned: new Date().toISOString(),
      })
      .eq('id', campaignId);

    if (error) {
      console.error(`    ❌ Error updating last_scanned for campaign ${campaignId}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`    ❌ Fatal error updating last_scanned for campaign ${campaignId}:`, error);
    return false;
  }
}
