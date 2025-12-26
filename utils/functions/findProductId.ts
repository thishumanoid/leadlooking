import config from "@/config";

// Finding the product id from your env file 
const PAYMENT_PRODUCT_IDS = {
  stripe: {
    free: undefined,
    pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_A,
    enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_B,
  },
  polar: {
    free: undefined,
    pro: process.env.NEXT_PUBLIC_POLAR_PRODUCT_A,
    enterprise: process.env.NEXT_PUBLIC_POLAR_PRODUCT_B,
  },
  lemonSqueezy: {
    free: undefined,
    pro: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_A,
    enterprise: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_B,
  },
};

const getProductId = (level: 'pro' | 'enterprise') => {
  return PAYMENT_PRODUCT_IDS[config.paymentProvider]?.[level];
};


export default getProductId