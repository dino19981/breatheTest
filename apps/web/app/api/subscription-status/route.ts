import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });
  const { sessionId } = await request.json();
  if (!sessionId) {
    return NextResponse.json({ subscribed: false });
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
  const customerId = checkoutSession.customer as string;
  if (!customerId) {
    return NextResponse.json({ subscribed: false });
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
  });

  const isActive = subscriptions.data.some((s) =>
    ["active", "trialing"].includes(s.status),
  );

  return NextResponse.json({ subscribed: isActive });
}
