import config from '@/config';
import { createCheckoutStripe } from '@/lib/stripe/handleCheckout';
import { createCheckoutPolar } from '@/lib/polar/handleCheckout';
import { createCheckoutLS } from '@/lib/lemonSqueezy/handleCheckout';


export async function POST(request: Request) {
  try {
    const { id, userEmail, mode } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Price ID is required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (!process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_URL) {
      return new Response(JSON.stringify({ error: 'Success url required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (!mode && config.paymentProvider === 'stripe') {
      return new Response(
        JSON.stringify({
          error:
            "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const email = userEmail || null;
    const productId = id;
    let checkoutUrl;

    /// STRIPE
    if (config.paymentProvider === 'stripe') {
      checkoutUrl = await createCheckoutStripe({
        user: {
          email: userEmail,
        },
        mode,
        priceId: productId,
        // If you send coupons from the frontend, you can pass it here
        // couponId: couponId,
      });
    } 
    
    /// POLAR
    if (config.paymentProvider === 'polar') {
      const session = await createCheckoutPolar(productId, email);
      checkoutUrl = session.url;
    }

    /// Lemon Squeezy
    if (config.paymentProvider === 'lemonSqueezy') {
      checkoutUrl = await createCheckoutLS(productId, email)
    }




    return new Response(JSON.stringify({ checkout_url: checkoutUrl }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'error' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
