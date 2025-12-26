import axios from 'axios';
import { cleanText } from '@/utils/functions/helpers';

interface RedditPost {
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
  matchedKeyword: string;
}

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



async function scanRedditForKeywords(
  keywords: string[],
  limit: number = 10
): Promise<RedditPost[]> {
  const allPosts: RedditPost[] = [];
  const seenPostIds = new Set<string>();

  // Reddit API base URL
  const baseUrl = 'https://www.reddit.com/search.json';

  for (const keyword of keywords) {
    try {
      console.log(`Searching for keyword: "${keyword}"`);

      // Make request to Reddit's search API
      const response = await axios.get<RedditSearchResponse>(baseUrl, {
        params: {
          q: `"${keyword}"`,
          sort: 'new',
          limit: 5,
          // t: 'all',
        },
        headers: {
          'User-Agent': 'RedditKeywordScanner/1.0',
        },
      });

      // Process the results
      const posts = response.data.data.children;


      for (const post of posts) {
        const postData = post.data;

        // Skip if we've already seen this post (from another keyword)
        if (seenPostIds.has(postData.id)) {
          continue;
        }

        seenPostIds.add(postData.id);

        // Add post to results
        allPosts.push({
          id: postData.id,
          title: postData.title,
          selftext: cleanText(postData.selftext) ,
          author: postData.author,
          subreddit: postData.subreddit,
          created_utc: postData.created_utc,
          url: postData.url,
          permalink: `https://www.reddit.com${postData.permalink}`,
          score: postData.score,
          num_comments: postData.num_comments,
          matchedKeyword: keyword,
        });
      }

      // Add delay between requests to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
  }

  // Sort all posts by creation time (newest first)
  allPosts.sort((a, b) => b.created_utc - a.created_utc);

  return allPosts;
}

// Example usage:
export default async function runReddit() {
  const keywords = ['SEO specialist wanted'];

  const posts = await scanRedditForKeywords(keywords, 5);

  console.log(`Found ${posts.length} posts`);

  // Display first few results
  posts.slice(0, 5).forEach((post) => {
    console.log('------------------------------------------------------------');
    console.log(`Title: ${post.title}`);
    console.log(`Subreddit: r/${post.subreddit}`);
    console.log(`Author: u/${post.author}`);
    // console.log(`Matched: "${post.matchedKeyword}"`);
    console.log(`URL: ${post.permalink}`);
    console.log(`Post Text: ${post.selftext}`)
    console.log(`Posted: ${new Date(post.created_utc * 1000).toLocaleString()}`);
    console.log('------------------------------------------------------------');
  });
}



