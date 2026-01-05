// docs: https://extfast-docs.hashnode.space/docs/payments/polarsh

import { polar } from './polarClient';

export async function defaultCheckoutPolar(userEmail: string | null) {
  const results = await polar.checkouts.create({
    products: [process.env.NEXT_PUBLIC_POLAR_PRODUCT_A!],
    customerEmail: userEmail,
    successUrl: `${process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL}?checkout_id={CHECKOUT_ID}`,
    allowDiscountCodes: true,
  });

  return results;
}

export async function createCheckoutPolar(
  productId: string | null,
  userEmail: string | null = null,
  userId: string | null = null
) {
  if (!productId) {
    const defaultCheckoutURL = await defaultCheckoutPolar(userEmail);
    return defaultCheckoutURL;
  }

  const results = await polar.checkouts.create({
    products: [productId],
    customerEmail: userEmail,
    successUrl: `${process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL}?checkout_id={CHECKOUT_ID}`,
    allowDiscountCodes: true,
    metadata: userId ? { user_id: userId } : { user_id: '' },
  });

  return results;
}
