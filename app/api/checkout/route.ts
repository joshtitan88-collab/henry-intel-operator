import { NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/checkout";
import { isSku } from "@/lib/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sku = (body as { sku?: unknown }).sku;
  const email = (body as { email?: unknown }).email;

  if (!isSku(sku)) {
    return NextResponse.json(
      { error: "sku must be deposit, setup, or retainer" },
      { status: 400 },
    );
  }

  const emailValue = typeof email === "string" ? email : undefined;

  try {
    const { url } = await createCheckoutUrl(sku, emailValue);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
