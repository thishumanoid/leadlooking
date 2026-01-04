import config from '@/config';
import { createCheckoutPolar } from '@/lib/polar/handleCheckout';

export async function POST(request: Request) {
  try {
    const { id, userEmail } = await request.json();

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
    }

    const email = userEmail || null;
    let checkoutUrl;

    const session = await createCheckoutPolar(id, email);
    checkoutUrl = session.url;

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
