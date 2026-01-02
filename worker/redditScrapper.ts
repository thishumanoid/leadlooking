import axios from 'axios';
import { cleanText, delay, truncateText } from '@/utils/functions/helpers';
import { analysePost } from './ai/analysePost';
import { sendLeadEmail } from './email/mailtrap';
import { RedditLeadFilter } from './filters';
import { fetchCampaignsWithKeywords } from './supabase/getSupabaseAdmin';
import { upsertRedditPost, updateCampaignLastScanned } from './supabase/upsertSupabaseAdmin';
// import type { RedditPost } from '@/types/globalTypes';
import { createCampaignLead } from './supabase/upsertSupabaseAdmin';

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
        limit: 50,
      },
      headers: {
        'User-Agent': 'RedditKeywordScanner/1.0',
      },
    });

    console.log('✅ reddit call finished');

    const children = response.data.data.children;

    for (const post of children) {
      const postData = post.data;

      posts.push({
        reddit_id: postData.id,
        subreddit: postData.subreddit,
        author: postData.author,
        title: postData.title,
        content: truncateText(cleanText(postData.selftext), 700),
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

  // const filterEngine = new LeadFilterEngine();

  // const config = {
  //   productDescription: 'a chrome browser extension',
  //   weights: {
  //     productDesc: 0.8, // Product relevance is most important
  //     intent: 0.4, // Intent matters moderately
  //     negative: 0.2, // Penalty for promotional/negative content
  //   },
  //   threshold: 0.5, // Minimum score to pass (adjust based on your needs)
  //   debug: true, // Set to true to see scoring details
  // };

  // Create filter instance
  // const filter = new RedditLeadFilter(config);

  // Filter the posts
  // const filteredPosts = filter.filterPosts(allPosts);

  // console.log(
  //   `\n📊 Results: ${filteredPosts.length} out of ${allPosts.length} posts passed the filter\n`
  // );

  // console.log('👉👉Filterrrrrr: ', filteredPosts);
  console.log('👉👉finnal Posts: ', posts);
  return posts;
}

async function processKeywordForCampaign(campaign: Campaign, keyword: Keyword) {
  console.log(`\n📍 Processing: Campaign "${campaign.name}" | Keyword "${keyword.keyword}"`);

  const posts = await scanRedditForKeyword(keyword.keyword);

  if (posts.length === 0) {
    console.log(`⚠️ No new posts found`);
    return 0;
  }

  let newLeadsCount = 0;

  for (const post of posts) {
    const postId = await upsertRedditPost(post);

    if (!postId) {
      continue;
    }

    const created = await createCampaignLead(
      campaign.id,
      keyword.keyword,
      postId,
      campaign.user_id
    );

    if (created) {
      newLeadsCount++;
      console.log(`✅ New lead: r/${post.subreddit} - ${post.title!.substring(0, 50)}...`);
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
      for (const keyword of keywords) {
        const leadsCreated = await processKeywordForCampaign(campaign, keyword);
        totalLeads += leadsCreated;

        // Wait 2 seconds between requests
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  // console.log('all posts', posts)

  // for (const post of posts) {
  //   const postLabels = await analysePost(post.title, post.selftext, productDescription, keywords);

  //   if (postLabels.leadScore > 40) {
  //     const chatURL = await getUserChatURL(post.author)
  //     console.log('chatURL:', chatURL)
  //     sendLeadEmail(post.permalink, chatURL)
  //   }

  //   // console.log('📄📄postLabels: ', postLabels);

  //   console.log('------------------------------------------------------------');
  //   // console.log(`Title: ${post.title}`);
  //   // console.log(`Subreddit: r/${post.subreddit}`);
  //   // console.log(`Author: u/${post.author}`);
  //   // console.log(`Matched: "${post.matchedKeyword}"`);
  //   console.log(`permalink: ${post.permalink}`);
  //   // console.log(`URL: ${post.url}`);
  //   // console.log(`Post Text: ${post.selftext}`)
  //   // console.log(`Posted: ${new Date(post.created_utc * 1000).toLocaleString()}`);
  //   console.log('------------------------------------------------------------');

  //   console.log('delllayyyy start');

  //   await delay(10000);
  //   console.log('delllayyyy end');
  // }
}
