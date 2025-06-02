import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });

  const { lookup_key } = await request.json();
  if (!lookup_key) {
    return NextResponse.json({ error: "error lookup_key" }, { status: 400 });
  }

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    active: true,
    limit: 1,
  });
  const price = prices.data[0];
  if (!price) {
    return NextResponse.json(
      { error: `error price: ${lookup_key}` },
      { status: 400 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: price.id, quantity: 1 }],
    success_url: `${request.nextUrl.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.nextUrl.origin}/?canceled=true`,
  });

  return NextResponse.json({ sessionId: session.id });
}
