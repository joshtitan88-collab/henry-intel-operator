"use client";

import { FormEvent, useState } from "react";

export function PortalForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(
          data.error ||
            "Could not open the billing portal. Email joshua@hhinvestigations.com.",
        );
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Network error. Try again or email joshua@hhinvestigations.com.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Billing email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="btn btn-ghost" type="submit" disabled={busy}>
        {busy ? "Opening…" : "Open billing portal"}
      </button>
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}
