import catalogJson from "../stripe-catalog.json";

export type Sku = "deposit" | "setup" | "retainer";

export type CatalogSku = {
  sku: Sku;
  name: string;
  description: string;
  amountUsd: number;
  interval: "one_time" | "month";
  priceId: string;
  paymentLink: string;
};

export const SKUS: Sku[] = ["deposit", "setup", "retainer"];

export const catalog = catalogJson;

export const LEGAL_PAYEE = catalogJson.legalPayee;
export const BRAND = catalogJson.brand;
export const PRODUCT = catalogJson.product;
export const CONTACT_EMAIL_PUBLIC = "joshua@hhinvestigations.com";
export const CREED =
  "Relentless in search. Ruthless about evidence. Incapable of lying.";

const PRICE_ENV: Record<Sku, string> = {
  deposit: "STRIPE_PRICE_DEPOSIT",
  setup: "STRIPE_PRICE_SETUP",
  retainer: "STRIPE_PRICE_RETAINER",
};

export function isSku(value: unknown): value is Sku {
  return value === "deposit" || value === "setup" || value === "retainer";
}

export function getSku(sku: Sku): CatalogSku {
  return catalogJson.skus[sku] as CatalogSku;
}

export function priceIdFor(sku: Sku): string {
  const fromEnv = process.env[PRICE_ENV[sku]];
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return getSku(sku).priceId;
}

export function paymentLinkFor(sku: Sku): string {
  return getSku(sku).paymentLink;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://henry-intel-landing.vercel.app";
  return raw.replace(/\/+$/, "");
}

export function contactEmail(): string {
  return process.env.CONTACT_EMAIL || CONTACT_EMAIL_PUBLIC;
}
