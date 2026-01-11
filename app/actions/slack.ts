'use server';

import { auth } from '@clerk/nextjs/server';
import { WebClient } from '@slack/web-api';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

///// replace hard coded id ////////////////////

// const userId = 'user_386Q5mG9IOTH7OIZsmgJOnJw5SP'

export async function getSlackChannels() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  

  // 1. Get the token from Supabase
  const { data: integration } = await supabaseAdmin
    .from('profiles')
    .select('slack_access_token')
    .eq('user_id', userId)
    .single();

  if (!integration) return [];

  // 2. Fetch channels from Slack
  const slack = new WebClient(integration.slack_access_token as string);
  
  try {
    const result = await slack.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true,
    });
    
    return result.channels?.map(c => ({ id: c.id, name: c.name })) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveSelectedChannel(channelId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ slack_channel_id: channelId })
    .eq('user_id', userId);

  if (error) throw error;
  return { success: true };
}