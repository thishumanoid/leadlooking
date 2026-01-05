import config from '@/config';
import { createCheckoutPolar } from '@/lib/polar/handleCheckout';

export async function POST(request: Request) {
  try {
    const { id, userEmail, userId } = await request.json();

    const email = userEmail || null;
    let checkoutUrl;

    const session = await createCheckoutPolar(id, email, userId);
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
