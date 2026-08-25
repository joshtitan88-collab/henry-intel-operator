import type { Metadata } from "next";
import { CONTACT_EMAIL_PUBLIC, LEGAL_PAYEE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Henry Intel and H & H INVESTIGATION.",
};

export default function PrivacyPage() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: "44rem" }}>
        <p className="kicker">Notice</p>
        <h1>Privacy</h1>
        <p className="muted">Effective 24 August 2026. Operator: {LEGAL_PAYEE}, doing business as Henry Intel.</p>

        <h2>What this site collects</h2>
        <p>
          This website does not use analytics trackers, advertising pixels, or
          third-party fonts. Pages are static commercial copy plus Stripe
          checkout. If you email us, we keep the correspondence we need to
          perform the work.
        </p>

        <h2>Payments</h2>
        <p>
          Payments are processed by Stripe. Card numbers are entered on Stripe
          Checkout or a Stripe Payment Link, not on this site. {LEGAL_PAYEE}{" "}
          receives the customer email, billing address, and payment status
          Stripe provides so we can deliver the install and send a receipt.
        </p>

        <h2>Client work</h2>
        <p>
          Local AI Operator work is performed for one local business on
          hardware that business owns. We do not sell your job files. We do
          not place PHI on a third-party model host as a substitute for a
          private stack. Retention of working files follows the engagement
          and applicable law.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>.
        </p>
      </div>
    </section>
  );
}
