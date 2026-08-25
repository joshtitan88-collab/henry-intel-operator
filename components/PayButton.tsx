"use client";

import { useState } from "react";
import type { Sku } from "@/lib/catalog";

type Props = {
  sku: Sku;
  label: string;
  paymentLink: string;
  className?: string;
};

export function PayButton({ sku, label, paymentLink, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPay() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (response.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      window.location.assign(paymentLink);
    } catch {
      window.location.assign(paymentLink);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className={className || "btn btn-navy"}
        onClick={onPay}
        disabled={busy}
      >
        {busy ? "Opening checkout…" : label}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
