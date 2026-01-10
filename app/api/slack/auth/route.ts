// app/api/slack/auth/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/utils/functions/helpers';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    const slackRedirectURI = absoluteUrl('/api/slack/callback');
    const state = userId;

    const scopes = ['chat:write', 'chat:write.public', 'channels:read', 'groups:read'];

    const url = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=${scopes.join(
      ','
    )}&redirect_uri=${
      slackRedirectURI.startsWith('http://')
        ? `https://redirectmeto.com/${slackRedirectURI}`
        : slackRedirectURI
    }&state=${state}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error in POST /api/slack/auth:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
