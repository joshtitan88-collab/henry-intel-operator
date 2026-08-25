import type Stripe from "stripe";
import {
  getSku,
  paymentLinkFor,
  priceIdFor,
  siteUrl,
  type Sku,
} from "./catalog";
import { getStripe, makeIntegrationIdentifier } from "./stripe";

export async function createCheckoutUrl(
  sku: Sku,
  email?: string,
): Promise<{ url: string; source: "checkout_session" | "payment_link" }> {
  const stripe = getStripe();
  if (!stripe) {
    return { url: paymentLinkFor(sku), source: "payment_link" };
  }

  const item = getSku(sku);
  const integrationIdentifier = makeIntegrationIdentifier();
  const origin = siteUrl();
  const mode: Stripe.Checkout.SessionCreateParams.Mode =
    item.interval === "month" ? "subscription" : "payment";

  const params: Stripe.Checkout.SessionCreateParams = {
    mode,
    line_items: [{ price: priceIdFor(sku), quantity: 1 }],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    billing_address_collection: "required",
    client_reference_id: `${sku}_${integrationIdentifier}`,
    metadata: {
      sku,
      product: "local_ai_operator",
      brand: "henry_intel",
      integration_identifier: integrationIdentifier,
    },
  };

  if (mode === "payment") {
    params.customer_creation = "always";
    params.invoice_creation = { enabled: true };
  } else {
    params.subscription_data = {
      metadata: {
        sku,
        product: "local_ai_operator",
        integration_identifier: integrationIdentifier,
      },
    };
  }

  if (email && email.includes("@")) {
    params.customer_email = email.trim();
  }

  const session = await stripe.checkout.sessions.create({
    ...params,
    integration_identifier: integrationIdentifier,
  } as Stripe.Checkout.SessionCreateParams);

  if (!session.url) {
    throw new Error("Stripe Checkout Session did not return a URL");
  }

  return { url: session.url, source: "checkout_session" };
}
