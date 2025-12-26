import stripe from './stripeClient';



interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl: string;
}



// This is used to create Customer Portal sessions, so users can manage their subscriptions (payment methods, cancel, etc..)
export const createCustomerPortal = async ({
  customerId,
  returnUrl,
}: CreateCustomerPortalParams): Promise<string> => {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
    locale: 'auto',
  });

  return portalSession.url;
};



// This is used to get the user checkout session and populate the data so we get the planId the user subscribed to
export const findCheckoutSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
