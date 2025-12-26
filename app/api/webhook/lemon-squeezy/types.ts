// Lemon Squeezy webhook event types
type WebhookEvent = 
  | "subscription_created"
  | "subscription_updated" 
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "order_created";

export interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: WebhookEvent;
    custom_data?: Record<string, any>;
  };
  data: {
    id: string;
    type: string;
    attributes: {
      store_id: number;
      customer_id: number;
      order_id: number;
      order_item_id: number;
      product_id: number;
      variant_id: number;
      product_name: string;
      variant_name: string;
      user_name: string;
      user_email: string;
      status: string;
      status_formatted: string;
      card_brand: string | null;
      card_last_four: string | null;
      pause: any | null;
      cancelled: boolean;
      trial_ends_at: string | null;
      billing_anchor: number;
      first_subscription_item: any;
      urls: {
        update_payment_method: string;
        customer_portal: string;
      };
      renews_at: string;
      ends_at: string | null;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
  };
}