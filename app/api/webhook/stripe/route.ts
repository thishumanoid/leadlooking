import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import supabaseAdmin from '@/lib/supabase/supabaseAdmin';
import stripe from '@/lib/stripe/stripeClient';


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function handleSubscriptionChange(subscription: any) {
  const customerId = subscription.customer as string;
  const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
  
  if (!customer.email) {
    console.log('❌ Customer email is missing');
    throw new Error('Customer email is required');
  }
  
  
  // Stripe timestamps are in seconds, convert to milliseconds
  const subscribedAt = subscription.current_period_start 
    ? new Date(subscription.current_period_start * 1000).toISOString()
    : new Date().toISOString();
    
  const expiresAt = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Default 30 days
  
  const dataToInsert = {
    user_email: customer.email,
    subscription_status: subscription.status,
    subscribed_at: subscribedAt,
    expires_at: expiresAt,
    subscription_id: subscription.id,
    customer_id: customerId,
    plan_type: subscription.items.data[0]?.price?.recurring?.interval || 'monthly',
  };
  
  
  const { data, error } = await supabaseAdmin
    .from('PremiumUsers')
    .upsert(dataToInsert, { onConflict: 'user_email' })
    .select();

  if (error) {
    console.log('❌ supabaseAdmin insert/update failed: ', error);
    throw error;
  }
  
  console.log('✅ Inserted/updated subscription, data:', data);
}

async function handleOneTimePayment(session: Stripe.Checkout.Session) {
  const email = session.customer_email || session.customer_details?.email;
  
  if (!email) {
    console.log('❌ Customer email is missing from checkout session');
    throw new Error('Customer email is required');
  }
  
  
  // For one-time payments, set a fixed duration (e.g., 30 days)
  const subscriptionDurationDays = 30;
  
  // Use session.created timestamp (in seconds, convert to milliseconds)
  const subscribedAt = new Date(session.created * 1000);
  const expiresAt = new Date(subscribedAt);
  expiresAt.setDate(expiresAt.getDate() + subscriptionDurationDays);

  const dataToInsert = {
    user_email: email,
    subscription_status: 'active',
    subscribed_at: subscribedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    subscription_id: session.id,
    customer_id: session.customer as string,
    plan_type: 'one_time',
  };
  

  const { data, error } = await supabaseAdmin
    .from('PremiumUsers')
    .upsert(dataToInsert, { onConflict: 'user_email' })
    .select();

  if (error) {
    console.log('❌ supabaseAdmin insert/update failed: ', error);
    throw error;
  }
  
  console.log('✅ Inserted/updated one-time payment, data:', data);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.log('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      // Subscription events
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        const deletedCustomer = await stripe.customers.retrieve(deletedSubscription.customer as string) as Stripe.Customer;
        
        if (!deletedCustomer.email) {
          console.log('❌ Customer email is missing for deleted subscription');
          break;
        }
        
        await supabaseAdmin
          .from('PremiumUsers')
          .upsert(
            {
              user_email: deletedCustomer.email,
              subscription_status: 'canceled',
              subscription_id: deletedSubscription.id,
              customer_id: deletedSubscription.customer as string,
            },
            { onConflict: 'user_email' }
          );
        console.log('✅ Subscription revoked');
        break;

      // One-time payment events (Checkout Session)
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Check if this is a one-time payment (mode: 'payment') or subscription (mode: 'subscription')
        if (session.mode === 'payment' && session.payment_status === 'paid') {
          await handleOneTimePayment(session);
        } else if (session.mode === 'subscription' && session.subscription) {
          // Fetch the subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          await handleSubscriptionChange(subscription);
        }
        break;

      // you don't need this bcz we're already managing subscription above
      case 'invoice.paid':
        // const invoice = event.data.object as any;
        // if (invoice.subscription) {
        //   const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        //   await handleSubscriptionChange(subscription);
        // }
        break;

      // Invoice payment failed
      case 'invoice.payment_failed':
        // const failedInvoice = event.data.object as any;
        // if (failedInvoice.subscription) {
        //   const subscription = await stripe.subscriptions.retrieve(failedInvoice.subscription as string);
        //   const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
          
        //   if (!customer.email) {
        //     console.log('❌ Customer email is missing for failed payment');
        //     break;
        //   }
          
        //   await supabaseAdmin
        //     .from('PremiumUsers')
        //     .upsert(
        //       {
        //         user_email: customer.email,
        //         subscription_status: 'past_due',
        //         subscription_id: subscription.id,
        //         customer_id: subscription.customer as string,
        //       },
        //       { onConflict: 'user_email' }
        //     );
        //   console.log('✅ Subscription marked as past_due');
        // }
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.log('❌ Error processing webhook:', err);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}