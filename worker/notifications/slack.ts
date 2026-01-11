import { WebClient } from '@slack/web-api';

export async function sendSlackNotification(
  slackAccessToken: string,
  slackChannelId: string,
  redditPosts: any[],
  campaignId?: string
) {
  if (!slackAccessToken || !slackChannelId) {
    console.log('No Slack integration found for user');
    return;
  }

  const message = createSlackMessage(redditPosts, campaignId);

  // 2. Send Message
  const slack = new WebClient(slackAccessToken);

  try {
    await slack.chat.postMessage({
      channel: slackChannelId,
      text: `⚡ *New Lead Found!* \n\n${message}`,
    });
    console.log('Slack notification sent!');
  } catch (error) {
    console.error('Failed to send Slack message:', error);
  }
}

export function createSlackMessage(leadsArray: any[], campaignId?: string) {
  const displayLeads = leadsArray.slice(0, 5);
  const hasMore = leadsArray.length > 5;

  let message = displayLeads
    .map((post) => {
      const title = post.title.length > 100 ? `${post.title.substring(0, 100)}...` : post.title;
      return `*${title}*\n${post.url}`;
    })
    .join('\n\n');

  if (hasMore) {
    message += `View All: \n\nhttps://leadlooking.com/campaigns/${campaignId}`;
  }

  return message;
}
