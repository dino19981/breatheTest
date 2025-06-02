import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });
  const { session_id } = await request.json();
  if (!session_id) {
    return NextResponse.json({ error: "error session_id" }, { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer as string,
    return_url: request.nextUrl.origin,
  });

  return NextResponse.redirect(portalSession.url!);
}
