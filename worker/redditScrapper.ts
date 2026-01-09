import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import * as cheerio from 'cheerio';
import { cleanText } from '@/utils/functions/helpers';
import { analysePost } from './ai/analysePost';
import {
  fetchCampaignsWithKeywords,
  fetchSingleCampaignWithKeywords,
  fetchAnalyzedPostIds,
} from './supabase/getSupabaseAdmin';
import {
  upsertRedditPost,
  updateCampaignLastScanned,
  createCampaignLead,
  markPostAsAnalyzed,
} from './supabase/upsertSupabaseAdmin';
import { filterDublicates, filterOldPosts, filterAnalyzedPosts, RedditLeadFilter } from './filters';

import { wait } from '@trigger.dev/sdk';
import { sendDigestEmail } from './mailtrap/mailtrap';

import { isEligibleUserID } from './supabase/getSupabaseAdmin';

// let filter: RedditLeadFilter;

async function scanRedditForKeyword(
  campaignId: string,
  keyword: string,
  filter: RedditLeadFilter
): Promise<RedditPostInsert[]> {
  const posts: RedditPostInsert[] = [];
  const baseUrl = 'https://www.reddit.com/search.rss';
  try {
    console.log(`Searching for keyword via RSS: "${keyword}"`);

    const response = await axios.get(baseUrl, {
      params: {
        q: `${keyword}`,
        sort: 'new',
        limit: 50,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const jsonObj = parser.parse(response.data);
    const entries = jsonObj.feed?.entry;

    if (!entries) {
      console.log('⚠️ No entries found in RSS feed');
      return [];
    }

    const entryList = Array.isArray(entries) ? entries : [entries];
    console.log('✅ total posts fetched: ', entryList.length);

    for (const entry of entryList) {
      // Extract reddit_id (t3_ prefix removal)
      const reddit_id = entry.id?.replace('t3_', '') || '';

      // Extract author (/u/ prefix removal)
      const author = entry.author?.name?.replace('/u/', '') || 'unknown';

      // Extract subreddit
      const subreddit = entry.category?.['@_term'] || '';

      // Clean content HTML using cheerio
      const contentHtml = entry.content?.['#text'] || entry.content || '';
      const $ = cheerio.load(contentHtml);
      const contentText = $.text().trim();

      posts.push({
        reddit_id,
        subreddit,
        author,
        title: entry.title,
        content: cleanText(contentText),
        url: entry.link?.['@_href'] || entry.link || '',
        created_at_reddit: entry.updated || entry.published || new Date().toISOString(),
      });
    }

    posts.sort(
      (a, b) =>
        new Date(b.created_at_reddit || 0).getTime() - new Date(a.created_at_reddit || 0).getTime()
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error searching for keyword "${keyword}":`, error.message);
      if (error.response?.status === 429) {
        console.error('Rate limit exceeded. Consider adding longer delays.');
      }
    } else {
      console.error(`Unexpected error for keyword "${keyword}":`, error);
    }
  }

  const recentPosts = filterOldPosts(posts);
  const uniquePosts = filterDublicates(recentPosts);
  const potentialPosts = filter.filterPosts(uniquePosts);

  const redditIdsToFilter = potentialPosts
    .map((p) => p.reddit_id)
    .filter((id): id is string => !!id);

  const alreadyAnalyzedIds = await fetchAnalyzedPostIds(campaignId, redditIdsToFilter);

  const freshPosts = filterAnalyzedPosts(potentialPosts, alreadyAnalyzedIds);

  console.log(
    `\n📊 Results: ${freshPosts.length} out of ${uniquePosts.length} posts remaining for analysis\n`
  );

  return freshPosts;
}

async function processKeywordForCampaign(
  campaign: Campaign,
  keyword: Keyword,
  filter: RedditLeadFilter
) {
  console.log(`📍 Processing: Campaign "${campaign.name}" | Keyword "${keyword.keyword}"`);

  const posts = await scanRedditForKeyword(campaign.id, keyword.keyword, filter);

  if (posts.length === 0) {
    console.log(`⚠️ No new posts found`);
    return [];
  }

  const foundLeads: any[] = [];

  const fullDescription = `${campaign.name} | ${campaign.description}`;

  for (const post of posts) {
    try {
      // AI
      const postLabels = await analysePost(post, fullDescription, keyword.keyword);

      if (postLabels.leadScore > 50) {
        console.log(`✨Found Lead, SCORE: ${postLabels.leadScore} Post: ${post.url}`);

        // SUPABASE
        const postId = await upsertRedditPost(post, '');

        if (!postId) {
          console.log(`❌ Failed to upsert post: ${post.url}`);
          continue;
        }

        const created = await createCampaignLead(
          campaign.id,
          keyword.keyword,
          postId,
          campaign.user_id,
          postLabels
        );

        if (created) {
          foundLeads.push({
            ...post,
            leadScore: postLabels.leadScore,
            intent: postLabels.intent,
            keyword: keyword.keyword,
          });
          console.log(`✅ ADDED IN DB: r/${post.subreddit} - ${post.title!.substring(0, 50)}...`);
        }
      } else {
        console.log(`❌ LOW AI SCORE: ${postLabels.leadScore} Post: ${post.url}`);
      }

      await markPostAsAnalyzed(campaign.id, post.reddit_id!);
    } catch (error) {
      console.log(error);
    }
  }

  const isPremium = await isEligibleUserID(campaign.user_id);

  if (isPremium && foundLeads.length > 0) {
    const notifyEmail = (campaign as any).notify_email;
    if (notifyEmail) {
      const leadsForEmail = foundLeads.map((lead) => ({
        title: lead.title,
        subreddit: lead.subreddit,
        url: lead.url,
        leadScore: lead.leadScore,
        content: lead.content,
        createdAt: lead.created_at_reddit,
      }));
      await sendDigestEmail(notifyEmail, keyword.keyword, leadsForEmail, campaign.id);
    } else {
      console.log(`⚠️ No notify_email found for campaign "${campaign.name}". Skipping email.`);
    }
  }

  console.log(`  📊 Results: ${foundLeads.length} new leads created from ${posts.length} posts`);
  return foundLeads;
}

export default async function runReddit() {
  try {
    console.log('running v2')
    // Step 1: Fetch all campaigns with keywords
    const campaignsWithKeywords = await fetchCampaignsWithKeywords();

    if (campaignsWithKeywords.length === 0) {
      console.log('⚠️ No campaigns with keywords found. Exiting.');
      return;
    }

    let totalLeads = 0;
    const totalKeywords = campaignsWithKeywords.reduce((sum, cwk) => sum + cwk.keywords.length, 0);

    console.log(
      `📊 Processing ${totalKeywords} keywords across ${campaignsWithKeywords.length} campaigns`
    );

    for (const { campaign, keywords } of campaignsWithKeywords) {
      const filter = new RedditLeadFilter(campaign.description ?? '');

      for (const keyword of keywords) {
        const leads = await processKeywordForCampaign(campaign, keyword, filter);
        totalLeads += leads.length;
      }

      await updateCampaignLastScanned(campaign.id);
      console.log(`✅ Updated last_scanned for campaign: "${campaign.name}"`);

      // await wait.for({ minutes: 11 });
    }

    console.log(`✅ Extraction Complete!`);
    console.log(`📈 Total new leads created: ${totalLeads}`);
    console.log(`🔍 Keywords processed: ${totalKeywords}`);
    return;
  } catch (error) {
    console.error('\n❌ Fatal error in runRedditLeadExtraction:', error);
    throw error;
  }
}

export async function runRedditScanForCampaign(campaignId: string) {
  try {
    const data = await fetchSingleCampaignWithKeywords(campaignId);

    if (!data) {
      console.log(`⚠️ Campaign ${campaignId} not found or has no keywords.`);
      return [];
    }

    const { campaign, keywords } = data;
    const filter = new RedditLeadFilter(campaign.description ?? '');
    // const allFoundLeads: any[] = [];

    console.log(`Scanning campaign: ${campaign.name} with ${keywords.length} keywords`);

    for (const keyword of keywords) {
      const leads = await processKeywordForCampaign(campaign, keyword, filter);
      // allFoundLeads.push(...leads);
    }

    await updateCampaignLastScanned(campaign.id);

    return true;
  } catch (error) {
    console.error(`❌ Error in runRedditScanForCampaign for ${campaignId}:`, error);
    throw error;
  }
}
