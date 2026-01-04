import { task } from '@trigger.dev/sdk';
import { runRedditScanForCampaign } from '@/worker/redditScrapper';

export const campaignScanTask = task({
  id: 'campaign-scan-task',
  maxDuration: 300,
  run: async (payload: { campaignId: string }) => {
    const leadsFound = await runRedditScanForCampaign(payload.campaignId);

    return leadsFound;
  },
});
