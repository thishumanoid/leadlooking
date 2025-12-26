// import axios from 'axios';

// async function extractReddit() {
//   const response = await axios.get('https://www.reddit.com/search.json', {
//     params: {
//       q: '"need SEO expert"',
//       sort: 'new',
//       limit: 5,
//     },
//   });

//   const results = await response.data

//   console.log(results.data.children);
// }

// extractReddit();

import Snoowrap from 'snoowrap';

async function extractRedditPosts(keyword, config, options) {
  const { subreddit = 'all', limit = 25, time = 'day', sort = 'new' } = options;

  // Initialize Reddit client
  const r = new Snoowrap({
    userAgent: config.userAgent,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: config.refreshToken,
  });

  try {
    // Search for posts
    const searchResults = await r.search({
      query: keyword,
      subreddit: subreddit,
      limit: limit,
      time: time,
      sort: sort,
      restrictSr: subreddit !== 'all',
    });

    // Format and return results
    const posts = searchResults.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author.name,
      subreddit: post.subreddit.display_name,
      url: post.url,
      selftext: post.selftext,
      created_utc: post.created_utc,
      score: post.score,
      num_comments: post.num_comments,
      permalink: `https://reddit.com${post.permalink}`,
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const config = {
    userAgent: 'YourApp/1.0.0',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
  };

  try {
    const posts = await extractRedditPosts('Need a graphic designer', config, {
      subreddit: 'all',
      limit: 10,
      time: 'day',
      sort: 'new',
    });

    console.log(`Found ${posts.length} posts:`);
    posts.forEach((post) => {
      console.log(`\n---\nTitle: ${post.title}`);
      console.log(`Subreddit: r/${post.subreddit}`);
      console.log(`Author: u/${post.author}`);
      console.log(`Score: ${post.score} | Comments: ${post.num_comments}`);
      console.log(`Link: ${post.permalink}`);
      console.log(`Posted: ${new Date(post.created_utc * 1000).toLocaleString()}`);
    });
  } catch (error) {
    console.error('Failed to extract posts:', error);
  }
}

// Uncomment to run
// main();
