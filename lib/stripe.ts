import Stripe from "stripe";
import { randomBytes } from "crypto";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.trim().length === 0) {
    return null;
  }
  return new Stripe(key);
}

export function requireStripe(): Stripe {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return stripe;
}

export function makeIntegrationIdentifier(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = randomBytes(8);
  let suffix = "";
  for (let i = 0; i < 8; i++) {
    suffix += alphabet[bytes[i] % 26];
  }
  return `hi_operator_${suffix}`;
}
