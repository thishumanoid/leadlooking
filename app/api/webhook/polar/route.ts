import { Webhooks } from '@polar-sh/nextjs';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';

async function handleSubscriptionChange(payload: any) {
  console.log('payload recived: ', payload);

  const { error } = await supabaseAdmin
    .from('profiles')
    .upsert(
      {
        user_email: payload.data.customer.email,
        subscription_status: payload.data.status,
        subscribed_at: new Date(payload.data.currentPeriodStart).toISOString(),
        expires_at: new Date(payload.data.currentPeriodEnd).toISOString(),
        subscription_id: payload.data.id,
        plan_type: 'monthly',
        user_id: payload.data.metadata['user_id'] ?? null,
      },
      { onConflict: 'user_email' }
    )
    .select();

  if (error) {
    console.log('❌supabaseAdmin insert/update failed: ', error);
    return;
  }

  console.log(`✅Inserted/updated subscription`);
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionActive: handleSubscriptionChange,
  onSubscriptionUpdated: handleSubscriptionChange,
  onSubscriptionRevoked: handleSubscriptionChange,
});
