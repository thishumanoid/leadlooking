import { logger, schedules } from '@trigger.dev/sdk/v3';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export const tryRedditRssTask = schedules.task({
  id: 'trying-reddit-rss',
  // Run every 6 minutes
  cron: '*/6 * * * *',
  maxDuration: 300, // 5 minutes
  run: async (payload, { ctx }) => {
    const keyword = 'track subscriptions';
    const rssUrl = `https://www.reddit.com/search.rss?q=${encodeURIComponent(keyword)}&sort=new`;

    logger.info(`Fetching RSS feed for keyword: "${keyword}"`, { url: rssUrl });

    try {
      const response = await axios.get(rssUrl, {
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
        logger.info('No posts found in RSS feed.');
        return { count: 0 };
      }

      // Handle both single entry and array of entries
      const entryList = Array.isArray(entries) ? entries : [entries];

      const posts = entryList.map((entry: any) => ({
        title: entry.title,
        link: entry.link?.['@_href'] || entry.link,
        author: entry.author?.name,
        updated: entry.updated,
        content: entry.content?.['#text'] || entry.content,
      }));

      logger.info(`Successfully fetched ${posts.length} posts via RSS`, { posts });

      return {
        count: posts.length,
        latestPost: posts[0]?.title,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('Error fetching Reddit RSS', {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      } else {
        logger.error('Unexpected error in RSS scraper', { error });
      }
      throw error;
    }
  },
});
