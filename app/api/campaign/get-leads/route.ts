import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { campaignId } = await request.json();

    console.log('request recived: ', campaignId);

    if (!campaignId) {
      console.error('❌ Missing campaignId in request body');
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }

    // Fetch leads (campaign_leads joined with reddit_posts) using supabaseAdmin
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('campaign_leads')
      .select(
        `
        id,
        lead_score,
        intent,
        reddit_post_id,
        reddit_posts (*)
      `
      )
      .eq('campaign_id', campaignId);

    if (leadError) {
      console.error('❌ Error fetching campaign leads:', leadError);
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }

    const transformedLeads = (leadData || [])
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
          leadScore: Number(item.lead_score || 0),
          leadIntent: String(item.intent || 'unclear'),
        };
      })
      .filter((l: any) => l !== null);

    return NextResponse.json({ leads: transformedLeads });
  } catch (error) {
    console.error('❌ Fatal error in get-leads route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
