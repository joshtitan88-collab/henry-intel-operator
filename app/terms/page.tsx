import type { Metadata } from "next";
import { CONTACT_EMAIL_PUBLIC, LEGAL_PAYEE } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of sale for Henry Intel Local AI Operator.",
};

export default function TermsPage() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: "44rem" }}>
        <p className="kicker">Terms of sale</p>
        <h1>Terms</h1>
        <p className="muted">
          Effective 24 August 2026. Seller: {LEGAL_PAYEE}, doing business as
          Henry Intel.
        </p>

        <h2>The offer</h2>
        <p>
          Local AI Operator is a 14-day install of a private AI stack for one
          local business. The public prices (USD, pre-tax) are a $2,500 setup
          deposit, a $5,000 setup, and a $997 per month ops retainer after
          handoff. The retainer is month-to-month.
        </p>

        <h2>What is not included</h2>
        <p>
          Hardware is not sold or financed by {LEGAL_PAYEE}. The client buys a
          Mac mini from Apple. Henry Intel quotes a spec and installs on that
          machine. The engagement is not a ChatGPT login, a 40-hour course, a
          generic website chatbot, or a promise that PHI will live on someone
          else’s server.
        </p>

        <h2>Payment</h2>
        <p>
          Charges are processed by Stripe in the name of {LEGAL_PAYEE}. The
          deposit is 50% of setup and is due on Day 0 to start the same-week
          audit. The remaining setup is due for the full install. Taxes may
          apply depending on jurisdiction; this site does not calculate tax
          automatically.
        </p>

        <h2>Refunds</h2>
        <p>
          Deposit and setup fees pay for scheduled operator time. Refund
          requests are reviewed against work already performed. The monthly
          retainer may be canceled before the next renewal through the Stripe
          billing portal or by emailing{" "}
          <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws applicable to {LEGAL_PAYEE}.
          Unresolved disputes are handled in the courts that have jurisdiction
          over that entity.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>
        </p>
      </div>
    </section>
  );
}
