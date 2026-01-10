// lib/slack.ts
import { createClient } from '@supabase/supabase-js';
import { WebClient } from '@slack/web-api';
import supabaseAdmin from './supabase/supabaseAdmin';

export async function notifyUser(clerkUserId: string, message: string) {
  // 1. Get the user's Slack token from DB
  const { data } = await supabaseAdmin
    .from('profiles')
    .select('slack_access_token, slack_channel_id')
    .eq('user_id', clerkUserId)
    .single();

  if (!data) {
    console.log('No Slack integration found for user');
    return;
  }

  // 2. Send Message
  const slack = new WebClient(data.slack_access_token as string);

  try {
    await slack.chat.postMessage({
      channel: data.slack_channel_id || '#general',
      text: message,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🚨 *New Lead Found!* \n\n${message}`
          }
        }
      ]
    });
    console.log('Slack notification sent!');
  } catch (error) {
    console.error('Failed to send Slack message:', error);
  }
}