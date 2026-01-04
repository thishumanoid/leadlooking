import { NextResponse } from 'next/server';
import { campaignScanTask } from '@/trigger/campaignScanTask';
import { auth } from '@trigger.dev/sdk';

export async function POST(request: Request) {
  console.log('🔥 Received API request for instant campaign scan');

  try {
    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const handle = await campaignScanTask.trigger({ campaignId: campaignId });

    console.log('trigger task handle: ', handle);

    const publicToken = await auth.createPublicToken({
      scopes: {
        read: {
          runs: [handle.id], // ✅ this token can read only these runs
        },
      },
    });

    return NextResponse.json({
      success: true,
      runId: handle.id,
      publicAccessToken: publicToken,
      message: `Successfully scanned campaign.`,
    });
  } catch (error) {
    console.error('❌ Error in campaign scan:', error);
    return NextResponse.json({ error: 'Failed to scan campaign' }, { status: 500 });
  }
}
