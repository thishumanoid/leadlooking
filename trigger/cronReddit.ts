import { logger, schedules } from '@trigger.dev/sdk/v3';
import runReddit from '@/worker/redditScrapper';


export const redditScrapperTask = schedules.task({
  id: 'reddit-scrapper-global',
  // Run every day at 6 PM
  cron: '0 18 * * *',
  maxDuration: 3600, // 1 hour
  run: async (payload, { ctx }) => {

    logger.info('Starting Reddit lead extraction task...');
    await runReddit(true);
    logger.info('Reddit lead extraction task completed.');
  },
});
