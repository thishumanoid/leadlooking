import { logger, schedules } from '@trigger.dev/sdk/v3';
import runReddit from '@/worker/redditScrapper';

export const redditScrapperTask = schedules.task({
  id: 'reddit-scrapper-task',
  // Run every 6 minutes
  cron: '*/6 * * * *',
  maxDuration: 3600, // 1 hour
  run: async (payload, { ctx }) => {
    logger.info('Starting Reddit lead extraction task...');
    await runReddit();
    logger.info('Reddit lead extraction task completed.');
  },
});
