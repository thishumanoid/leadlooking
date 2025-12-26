export interface Subscription {
  id: string;
  status: "active" | "cancelled" | "expired" | "past_due" | "unpaid";
  planId: string;
  customerId: string;
  renewsAt: string;
  endsAt: string | null;
  trialEndsAt: string | null;
}

export interface WebhookPayload {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    attributes: Record<string, any>;
  };
}