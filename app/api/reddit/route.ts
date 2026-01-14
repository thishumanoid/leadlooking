// import { analysePost } from '@/worker/ai/analysePost';
import runReddit from '@/worker/redditScrapper';
import { exampleKeywordGenerator } from '@/worker/ai/generateKeywords';
// import { sendLeadEmail } from '@/worker/email/mailtrap';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import * as cheerio from 'cheerio';
import { cleanText } from '@/utils/functions/helpers';
import {
  filterDublicates,
  filterOldPosts,
  filterAnalyzedPosts,
  RedditLeadFilter,
} from '@/worker/filters';
// import { wait } from '@trigger.dev/sdk';

export async function POST(request: Request) {
  const websiteUrl = 'https://faceless.so/?ref=trustmrr';

  const metadata = await scrapeMetadata(websiteUrl);
  console.log('metadata', metadata);

  if (metadata?.description) {
  console.log('running dynamic')
    const keywords = await exampleKeywordGenerator(metadata?.description || '');
    console.log(keywords);
    return new Response();
  }

  const staticMetadata = {
    description:
      'Userbase is the easiest way to add user accounts and data persistence to your static site. All Userbase features are accessible through a very simple JavaScript SDK, directly from the browser. No backend necessary.',
  };
  console.log('running static');
  const keywords = await exampleKeywordGenerator(staticMetadata?.description || '');
  console.log(keywords);

  // const filter = new RedditLeadFilter(metadata?.description || '');
  // let finalPosts = [];

  // for (const keyword of keywords!) {
  //   const filteredPosts = await scanRedditForKeyword(keyword, filter);
  //   finalPosts.push(...filteredPosts);
  // }
  return new Response();
}

async function scanRedditForKeyword(keyword: string, filter: RedditLeadFilter) {
  const posts = [];
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

  console.log(
    `\n📊 Results: ${potentialPosts.length} out of ${posts.length} posts remaining for analysis\n`
  );

  return potentialPosts;
}

export async function scrapeMetadata(url: string): Promise<
  | {
      name: string;
      description: string;
      image?: string;
    }
  | undefined
> {
  try {
    const normalizeUrl = (url: string): string | null => {
      const trimmed = url.trim();
      if (!trimmed) return null;
      let normalized = trimmed;
      if (!/^https?:\/\//i.test(normalized)) {
        normalized = 'https://' + normalized;
      }
      try {
        new URL(normalized);
        return normalized;
      } catch {
        return null;
      }
    };

    const finalUrl = normalizeUrl(url);

    if (!finalUrl) {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/campaign/scrape-metatags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: finalUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to scrape metadata');
    }

    const data = await response.json();
    console.log(`✓ Fetched metadata from ${finalUrl}`);

    return data;
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    throw new Error('Could not fetch website metadata. Please enter details manually.');
  }
}
