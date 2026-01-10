'use server';

import supabaseAdmin from '@/lib/supabase/supabaseAdmin';
import { auth, currentUser } from '@clerk/nextjs/server';
// import { getAuthSession } from "@/lib/auth";
// import { db } from "@/lib/db";
import { redirect } from 'next/navigation';

export type FormState =
  | {
      errors?: {
        channelId?: string[];
      };
      message?: string;
    }
  | undefined;

export const getSlackChannels = async (accessToken?: string) => {
  if (!accessToken) return [];

  try {
    const response = await fetch(
      'https://slack.com/api/conversations.list?limit=1000&types=public_channel,private_channel',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data.channels;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const selectSlackChannel = async (state: FormState, formData: FormData) => {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    console.log("No user found");
    return;
  }

  const user = await supabaseAdmin.from("profiles").select("*").eq("user_id", userId).single();

  if (!user?.data?.slack_access_token) {
    console.log("No slack access token found");
    return;
  };


  const channelId = formData.get('channelId');

  if (!channelId) {
    return {
      errors: {
        channelId: ['Channel ID is required'],
      },
    };
  }

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.data.slack_access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: channelId,
      text: 'Test message',
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    return {
      errors: {
        channelId: ['Failed to post message'],
      },
    };
  }

  return {
    message: 'Channel selected successfully',
  };
};



export const postTestMessage = async (formData: FormData) => {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    console.log("No user found");
    return;
  }

  const user = await supabaseAdmin.from("profiles").select("*").eq("user_id", userId).single();

  if (!user?.data?.slack_access_token) {
    console.log("No slack access token found");
    return;
  };

  const channelId = formData.get('channelId');

  if (!channelId) {
    return {
      errors: {
        channelId: ['Channel ID is required'],
      },
    };
  }

  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.data.slack_access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: channelId,
      text: 'Test message',
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    return {
      errors: {
        channelId: ['Failed to post message'],
      },
    };
  }

  return {
    message: 'Channel selected successfully',
  };
};
