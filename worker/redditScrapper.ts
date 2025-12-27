import axios from 'axios';
import { cleanText, delay, truncateText } from '@/utils/functions/helpers';
import { analysePost } from './ai/analysePost';
import { sendLeadEmail } from './email/mailtrap';

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  chatURL: string;
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

async function scanRedditForKeywords(keywords: string[], limit: number = 5): Promise<RedditPost[]> {
  const allPosts: RedditPost[] = [];
  const seenPostIds = new Set();

  const baseUrl = 'https://www.reddit.com/search.json';

  for (const keyword of keywords) {
    try {
      console.log(`Searching for keyword: "${keyword}"`);

      const response = await axios.get<RedditSearchResponse>(baseUrl, {
        params: {
          q: `"${keyword}"`,
          sort: 'new',
          limit: limit,
        },
        headers: {
          'User-Agent': 'RedditKeywordScanner/1.0',
        },
      });

      const posts = response.data.data.children;

      for (const post of posts) {
        const postData = post.data;

        if (seenPostIds.has(postData.id)) {
          continue;
        }

        seenPostIds.add(postData.id);

        allPosts.push({
          id: postData.id,
          title: postData.title,
          selftext: truncateText(cleanText(postData.selftext), 700),
          author: postData.author,
          chatURL: '',
          subreddit: postData.subreddit,
          created_utc: postData.created_utc,
          url: postData.url,
          permalink: `https://www.reddit.com${postData.permalink}`,
          score: postData.score,
          num_comments: postData.num_comments,
          matchedKeyword: keyword,
        });
      }

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

export const EXAMPLE = {
  title: '',
  content: ``,
  keywords: ['looking for CRM'],
  productDescription:
    'A Joky CRM that helps you manage customer relationships, track interactions, and organize sales in one place—so you can build stronger connections and grow your business.',
};

export default async function runReddit() {
  const keywords = EXAMPLE.keywords;
  const productDescription = EXAMPLE.productDescription;

  const posts = await scanRedditForKeywords(keywords, 2);

  for (const post of posts) {
    const postLabels = await analysePost(post.title, post.selftext, productDescription, keywords);

    if (postLabels.leadScore > 40) {
      const chatURL = await getUserChatURL(post.author)
      console.log('chatURL:', chatURL)
      sendLeadEmail(post.permalink, chatURL)
    }

    console.log('📄📄postLabels: ', postLabels);

    console.log('------------------------------------------------------------');
    // console.log(`Title: ${post.title}`);
    // console.log(`Subreddit: r/${post.subreddit}`);
    // console.log(`Author: u/${post.author}`);
    // console.log(`Matched: "${post.matchedKeyword}"`);
    console.log(`permalink: ${post.permalink}`);
    // console.log(`URL: ${post.url}`);
    // console.log(`Post Text: ${post.selftext}`)
    // console.log(`Posted: ${new Date(post.created_utc * 1000).toLocaleString()}`);
    console.log('------------------------------------------------------------');

    console.log('delllayyyy start');

    await delay(10000);
    console.log('delllayyyy end');
  }
}


async function getUserChatURL(username: string): Promise<string> {
  try {
    const response = await fetch(`https://www.reddit.com/user/${username}/about.json`);
    const data = await response.json();
    const userId = data.data.id;
    return `https://chat.reddit.com/user/t2_${userId}`;
  } catch (error) {
    console.error(`Failed to fetch user ID for ${username}:`, error);
    return '';
  }
}
