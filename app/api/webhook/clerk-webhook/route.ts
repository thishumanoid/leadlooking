import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    console.log(`Received webhook event type of ${eventType}`);
    console.log('Webhook payload:', evt.data);

    if (evt.type === 'user.created') {

      const { error } = await supabaseAdmin
        .from('profiles')
        .upsert(
          {
            user_id: evt.data.id,
            user_email: evt.data.email_addresses[0]?.email_address,
            subscription_status: "pending",
            plan_type: "free",
          },
        )

      if (error) {
        console.error('Error creating user:', error)
        return new Response('Error creating user', { status: 500 })
      }

    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
