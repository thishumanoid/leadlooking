//docs: https://extfast-docs.hashnode.space/docs/payments/lemon-squeezy

import { 
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "./lemonSqueezyClient";



export async function createCheckoutLS(
  productId: string,
  userEmail?: string,
) {
  configureLemonSqueezy();

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  
  if (!storeId) {
    throw new Error("LEMONSQUEEZY_STORE_ID is not set");
  }

  const checkoutData = {
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL}`,
    },
    checkoutData: {
      email: userEmail,
    },
  };

  const checkout = await createCheckout(
    storeId,
    productId,
    checkoutData
  );

  if (checkout.error) {
    throw new Error(checkout.error.message);
  }

  return checkout.data?.data.attributes.url;
}
