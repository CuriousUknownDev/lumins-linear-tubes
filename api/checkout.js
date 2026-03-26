export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Build Stripe Checkout Session params
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', 'https://lumins-linear-tubes.vercel.app/?order=success');
    params.append('cancel_url', 'https://lumins-linear-tubes.vercel.app/');
    params.append('billing_address_collection', 'required');
    params.append('shipping_address_collection[allowed_countries][0]', 'US');

    items.forEach((item, i) => {
      const label = item.caseOnly
        ? item.name + ' — Case of ' + item.caseQty
        : item.name;
      params.append('line_items[' + i + '][price_data][currency]', 'usd');
      params.append('line_items[' + i + '][price_data][product_data][name]', label);
      params.append('line_items[' + i + '][price_data][product_data][metadata][sku]', item.sku || '');
      params.append('line_items[' + i + '][price_data][unit_amount]', String(Math.round(item.price * 100)));
      params.append('line_items[' + i + '][quantity]', String(item.qty));
    });

    // Call Stripe API
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();

    if (!session.url) {
      const msg = (session.error && session.error.message) || 'Stripe error — check your secret key.';
      return res.status(400).json({ error: msg });
    }

    return res.json({ url: session.url });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
