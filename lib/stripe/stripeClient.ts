// docs: https://extfast-docs.hashnode.space/docs/payments/stripe

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover', // TODO: update this when Stripe updates their API
  typescript: true,
});

export default stripe;
