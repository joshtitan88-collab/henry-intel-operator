import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HANDLED = new Set([
  "checkout.session.completed",
  "invoice.paid",
  "customer.subscription.updated",
]);

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (HANDLED.has(event.type)) {
    const object = event.data.object as { id?: string };
    console.info(
      JSON.stringify({
        source: "stripe_webhook",
        type: event.type,
        id: event.id,
        objectId: object.id ?? null,
      }),
    );
  }

  return NextResponse.json({ received: true });
}
