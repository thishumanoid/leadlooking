import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';
import { isEligibleUser } from '@/lib/supabase/helpers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { campaignId, userEmail } = await request.json();

    console.log('request recived: ', campaignId);

    if (!campaignId) {
      console.error('❌ Missing campaignId in request body');
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }
    const isEligible = await isEligibleUser(userEmail);
    console.log('isEligible', isEligible);
    const transformedLeads = await getLeads(campaignId);

    if (!isEligible) {
      const restrictedLeads = (transformedLeads || []).map((lead: any) => ({
        id: lead.id,
        subreddit: lead.subreddit,
        matchStrength: lead.matchStrength,
        timestamp: lead.timestamp,
        isPremiumLocked: true,
      }));

      const strongMatches = (transformedLeads || []).filter(
        (l: any) => l.matchStrength === 'strong'
      ).length;
      const partialMatches = (transformedLeads || []).filter(
        (l: any) => l.matchStrength === 'partial'
      ).length;

      return NextResponse.json({
        leads: restrictedLeads,
        isPremium: false,
        totalCount: transformedLeads?.length || 0,
        strongMatches,
        partialMatches,
      });
    }

    return NextResponse.json({ leads: transformedLeads, isPremium: true });
  } catch (error) {
    console.error('❌ Fatal error in get-leads route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function getLeads(campaignId: string) {
  try {
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
      return null;
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

    return transformedLeads;
  } catch (error) {
    return null;
  }
}
