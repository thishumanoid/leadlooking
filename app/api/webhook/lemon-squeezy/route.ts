// app/api/webhooks/lemonsqueezy/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";
import type { LemonSqueezyWebhookPayload } from "./types";

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// Map Lemon Squeezy status
function mapSubscriptionStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: "active",
    on_trial: "trialing",
    paused: "paused",
    past_due: "past_due",
    unpaid: "unpaid",
    cancelled: "cancelled",
    expired: "expired",
  };
  return statusMap[status] || status;
}

// Determine plan type from variant name or custom data
function determinePlanType(variantName: string, customData?: Record<string, any>): string {
  // Check custom data first
  if (customData?.plan) {
    return customData.plan;
  }
  
  // Fallback to variant name parsing
  const lowerVariantName = variantName.toLowerCase();
  if (lowerVariantName.includes("yearly") || lowerVariantName.includes("annual")) {
    return "yearly";
  }
  return "monthly";
}

async function handleSubscriptionChange(payload: LemonSqueezyWebhookPayload) {
  console.log("📦 Webhook payload received:", {
    event: payload.meta.event_name,
    email: payload.data.attributes.user_email,
    status: payload.data.attributes.status,
  });

  const attributes = payload.data.attributes;
  const planType = determinePlanType(
    attributes.variant_name,
    payload.meta.custom_data
  );

  const { error } = await supabaseAdmin
    .from("PremiumUsers")
    .upsert(
      {
        user_email: attributes.user_email,
        subscription_status: mapSubscriptionStatus(attributes.status),
        subscribed_at: new Date(attributes.created_at).toISOString(),
        expires_at: attributes.renews_at 
          ? new Date(attributes.renews_at).toISOString()
          : attributes.ends_at
          ? new Date(attributes.ends_at).toISOString()
          : null,
        subscription_id: payload.data.id,
        customer_id: attributes.customer_id.toString(),
        plan_type: planType,
      },
      { onConflict: "user_email" }
    )
    .select();

  if (error) {
    console.error("❌ Supabase insert/update failed:", error);
    throw error;
  }

  console.log("✅ Inserted/updated subscription for:", attributes.user_email);
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("❌ LEMONSQUEEZY_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    
    const signature = request.headers.get("x-signature");

    if (!signature) {
      console.error("❌ No signature found in headers");
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the payload
    const payload: LemonSqueezyWebhookPayload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;

    console.log(`🔔 Received webhook payload: ${payload}`);

    // Handle different event types
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed":
      case "subscription_unpaused":
        await handleSubscriptionChange(payload);
        break;

      case "subscription_cancelled":
      case "subscription_expired":
      case "subscription_paused":
        await handleSubscriptionChange(payload);
        break;

      case "order_created":
        // Handle one-time purchases if needed
        console.log("📦 Order created:", payload.data.attributes.user_email);
        break;

      default:
        console.log(`Unhandled event type: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}