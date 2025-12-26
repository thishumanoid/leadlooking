// docs: https://extfast-docs.hashnode.space/docs/payments/stripe

import stripe from './stripeClient';

interface CreateCheckoutParams {
  user?: {
    customerId?: string;
    email?: string;
  };
  mode: 'payment' | 'subscription';
  clientReferenceId?: string;
  priceId: string;
  couponId?: string | null;
}

// This is used to create a Stripe Checkout for one-time payments. It's usually triggered with the <ButtonCheckout /> component. Webhooks are used to update the user's state in the database.
export const createCheckoutStripe = async ({
  user,
  mode,
  clientReferenceId,
  priceId,
  couponId,
}: CreateCheckoutParams): Promise<string | null> => {
  try {
    const extraParams: {
      customer?: string;
      customer_creation?: 'always';
      customer_email?: string;
      invoice_creation?: { enabled: boolean };
      payment_intent_data?: { setup_future_usage: 'on_session' };
      tax_id_collection?: { enabled: boolean };
    } = {};

    if (user?.customerId) {
      extraParams.customer = user.customerId;
    } else {
      if (mode === 'payment') {
        extraParams.customer_creation = 'always';
        extraParams.invoice_creation = { enabled: true };
        extraParams.payment_intent_data = { setup_future_usage: 'on_session' };
      }
      if (user?.email) {
        extraParams.customer_email = user.email;
      }
      extraParams.tax_id_collection = { enabled: true };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode,
      allow_promotion_codes: true,
      client_reference_id: clientReferenceId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: couponId
        ? [
            {
              coupon: couponId,
            },
          ]
        : [],
      success_url: process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL,
      cancel_url: process.env.NEXT_PUBLIC_WEB_APP_URL,
      locale: 'auto',
      ...extraParams,
    });

    return stripeSession.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};
