import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL_PUBLIC } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Checkout canceled",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: "40rem" }}>
        <p className="kicker">Henry Intel</p>
        <h1>Checkout canceled</h1>
        <p>
          Nothing was charged. The prices are the same when you come back:
          $2,500 deposit, $5,000 setup, $997 per month ops.
        </p>
        <p>
          Questions before you pay:{" "}
          <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>
          .
        </p>
        <div className="actions">
          <Link className="btn btn-navy" href="/pricing">
            Return to pricing
          </Link>
          <Link className="btn btn-ghost" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
