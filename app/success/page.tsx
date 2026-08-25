import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL_PUBLIC } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <section>
      <div className="wrap" style={{ maxWidth: "40rem" }}>
        <p className="kicker">Henry Intel</p>
        <h1>Payment received</h1>
        <p>
          The receipt comes from H &amp; H INVESTIGATION. We start from
          evidence: your shop, your jobs, your constraints.
        </p>
        {sessionId ? (
          <p className="muted">Checkout reference: {sessionId}</p>
        ) : (
          <p className="muted">
            If you paid through a Stripe Payment Link, the receipt is in your
            email.
          </p>
        )}
        <p>
          Next: watch for a note from{" "}
          <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>
          . Reply with the business name and the owner who will ride along for
          fourteen days.
        </p>
        <div className="actions">
          <Link className="btn btn-navy" href="/how-it-works">
            Review the install
          </Link>
          <Link className="btn btn-ghost" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
