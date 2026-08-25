import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { siteUrl } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Billing portal requires STRIPE_SECRET_KEY" },
      { status: 503 },
    );
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const emailRaw = (body as { email?: unknown }).email;
  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "email is required to open the billing portal" },
      { status: 400 },
    );
  }

  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];

  if (!customer) {
    return NextResponse.json(
      { error: "No Stripe customer found for that email" },
      { status: 404 },
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${siteUrl()}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
