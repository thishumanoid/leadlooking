import { task, logger } from '@trigger.dev/sdk';
import { runRedditScanForCampaign } from '@/worker/redditScrapper';

export const campaignScanTask = task({
  id: 'campaign-scan-task',
  maxDuration: 700,
  run: async (payload: { campaignId: string }) => {
    logger.info('v3 task');
    const leadsFound = await runRedditScanForCampaign(payload.campaignId);

    return leadsFound;
  },
});
