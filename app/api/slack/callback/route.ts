import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error || !code || !state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_APP_URL}/dashboard?error=slack_failed`);
  }

  try {
    // 1. Exchange code for Access Token
    const formData = new URLSearchParams();
    formData.append('client_id', process.env.SLACK_CLIENT_ID!);
    formData.append('client_secret', process.env.SLACK_CLIENT_SECRET!);
    formData.append('code', code);
    formData.append('redirect_uri', `${process.env.NEXT_PUBLIC_WEB_APP_URL}/api/slack/callback`);

    const slackRes = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const slackData = await slackRes.json();

    if (!slackData.ok) {
      throw new Error(slackData.error);
    }

    // 2. Initialize Supabase Admin (Service Role is required to write to DB if RLS is strict)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Save to Database
    const { error: dbError } = await supabaseAdmin
      .from('profiles')
      .update({
        slack_access_token: slackData.access_token,
      })
      .eq('user_id', state);

    if (dbError) throw dbError;

    // 4. Success Redirect
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_APP_URL}/dashboard?success=slack_connected`);

  } catch (err) {
    console.error('Slack OAuth Error:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_APP_URL}/dashboard?error=server_error`);
  }
}