import axios from 'axios';
import { cleanText } from '@/utils/functions/helpers';
import { analysePost } from './ai/analysePost';
import { sendLeadEmail } from './email/mailtrap';
import { RedditLeadFilter, filterDublicates, filterOldPosts } from './filters';
import { fetchCampaignsWithKeywords } from './supabase/getSupabaseAdmin';
import { upsertRedditPost, updateCampaignLastScanned } from './supabase/upsertSupabaseAdmin';
import { createCampaignLead } from './supabase/upsertSupabaseAdmin';
import { getUserChatURL } from './helpers';
import { wait } from '@trigger.dev/sdk';

let filter: RedditLeadFilter;

interface RedditSearchResponse {
  data: {
    children: Array<{
      data: {
        id: string;
        title: string;
        selftext: string;
        author: string;
        subreddit: string;
        created_utc: number;
        url: string;
        permalink: string;
        score: number;
        num_comments: number;
      };
    }>;
  };
}

async function scanRedditForKeyword(keyword: string): Promise<RedditPostInsert[]> {
  const posts: RedditPostInsert[] = [];
  const baseUrl = 'https://www.reddit.com/search.json';

  try {
    console.log(`Searching for keyword: "${keyword}"`);

    /// figure out the final url and match it with reddit app's url
    const response = await axios.get<RedditSearchResponse>(baseUrl, {
      params: {
        q: `${keyword}`,
        sort: 'new',
        limit: 10,
      },
      headers: {
        'User-Agent': 'RedditKeywordScanner/1.0',
      },
    });

    const children = response.data.data.children;
    console.log('✅ posts fetched: ', children.length);

    for (const post of children) {
      const postData = post.data;

      posts.push({
        reddit_id: postData.id,
        subreddit: postData.subreddit,
        author: postData.author,
        title: postData.title,
        content: cleanText(postData.selftext),
        url: `https://www.reddit.com${postData.permalink}`,
        created_at_reddit: new Date(postData.created_utc * 1000).toISOString(),
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

  const cleanPosts = filterDublicates(posts);
  const recentPosts = filterOldPosts(cleanPosts);
  const potentialPosts = filter.filterPosts(recentPosts);

  console.log(
    `\n📊 Results: ${potentialPosts.length} out of ${cleanPosts.length} posts passed the filter\n`
  );

  return potentialPosts;
}

async function processKeywordForCampaign(campaign: Campaign, keyword: Keyword) {
  console.log(`📍 Processing: Campaign "${campaign.name}" | Keyword "${keyword.keyword}"`);

  const posts = await scanRedditForKeyword(keyword.keyword);

  if (posts.length === 0) {
    console.log(`⚠️ No new posts found`);
    return 0;
  }

  let newLeadsCount = 0;

  const fullDescription = `${campaign.name} | ${campaign.description}`;

  for (const post of posts) {
    try {
      const postLabels = await analysePost(post, fullDescription, keyword.keyword);

      if (postLabels.leadScore > 50) {
        console.log(`✨Found High Score Post: ${post.url}`);
        console.log(`✨Score: ${postLabels.leadScore}`);
        console.log(`✨Intent: ${postLabels.intent}`);

        // const chatURL = await getUserChatURL(post.author!);
        sendLeadEmail(post.url, '');

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
          newLeadsCount++;
          console.log(`✅ New lead: r/${post.subreddit} - ${post.title!.substring(0, 50)}...`);
        }
      } else {
        console.log(`❌ Skipping low score post: ${post.url}`);
        console.log(`❌ Score: ${postLabels.leadScore}`);
        console.log(`❌ Intent: ${postLabels.intent}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(`  📊 Results: ${newLeadsCount} new leads created from ${posts.length} posts`);
  return newLeadsCount;
}

export default async function runReddit() {
  try {
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
      filter = new RedditLeadFilter(campaign.description ?? '');

      for (const keyword of keywords) {
        const leadsCreated = await processKeywordForCampaign(campaign, keyword);
        totalLeads += leadsCreated;

        await wait.for({ minutes: 10 });
      }

      // Update last_scanned for the campaign
      await updateCampaignLastScanned(campaign.id);
      console.log(`✅ Updated last_scanned for campaign: "${campaign.name}"`);
    }

    console.log(`✅ Extraction Complete!`);
    console.log(`📈 Total new leads created: ${totalLeads}`);
    console.log(`🔍 Keywords processed: ${totalKeywords}`);
  } catch (error) {
    console.error('\n❌ Fatal error in runRedditLeadExtraction:', error);
    throw error;
  }
}
