import type { Metadata } from "next";
import { PayButton } from "@/components/PayButton";
import { PortalForm } from "@/components/PortalForm";
import {
  CONTACT_EMAIL_PUBLIC,
  LEGAL_PAYEE,
  SKUS,
  formatUsd,
  getSku,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Local AI Operator pricing: $2,500 setup deposit, $5,000 full install, $997/month ops retainer. USD, pre-tax.",
};

const cta: Record<string, string> = {
  deposit: "Pay deposit",
  setup: "Pay full setup",
  retainer: "Start retainer",
};

export default function PricingPage() {
  return (
    <section>
      <div className="wrap">
        <p className="kicker">USD, pre-tax</p>
        <h1>Pricing</h1>
        <p className="muted" style={{ maxWidth: "40rem" }}>
          Three public prices. Charged by {LEGAL_PAYEE} via Stripe. Hardware is
          not on this invoice — you buy the Mac mini from Apple.
        </p>

        <div className="cards" style={{ marginTop: "2rem" }}>
          {SKUS.map((sku) => {
            const item = getSku(sku);
            const featured = sku === "deposit";
            return (
              <article
                className={featured ? "card featured" : "card"}
                key={sku}
              >
                <p className="kicker">{item.sku}</p>
                <h2>{item.name}</h2>
                <p className="price">
                  {formatUsd(item.amountUsd)}
                  <span>
                    {item.interval === "month" ? " / month" : " one-time"}
                  </span>
                </p>
                <p>{item.description}</p>
                {sku === "retainer" ? (
                  <p className="muted">Month-to-month after handoff. Cancel any time through the billing portal.</p>
                ) : null}
                {sku === "deposit" ? (
                  <p className="muted">Day 0 CTA. Remaining setup is due at install.</p>
                ) : null}
                <div style={{ marginTop: "1rem" }}>
                  <PayButton
                    sku={item.sku}
                    label={cta[sku]}
                    paymentLink={item.paymentLink}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="split" style={{ marginTop: "2.5rem" }}>
          <div>
            <h2>Not included</h2>
            <ul className="list">
              <li>Mac mini or any other hardware. Buy it from Apple.</li>
              <li>ChatGPT seats, courses, or a website chatbot.</li>
              <li>Hosting PHI on someone else’s server.</li>
            </ul>
          </div>
          <div>
            <h2>Manage billing</h2>
            <p className="muted">
              Use the email on your Stripe receipt. If the portal is not
              configured yet, email{" "}
              <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>
                {CONTACT_EMAIL_PUBLIC}
              </a>
              .
            </p>
            <PortalForm />
          </div>
        </div>
      </div>
    </section>
  );
}
