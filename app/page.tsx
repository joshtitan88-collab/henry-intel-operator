import Link from "next/link";
import { PayButton } from "@/components/PayButton";
import {
  CONTACT_EMAIL_PUBLIC,
  CREED,
  formatUsd,
  getSku,
} from "@/lib/catalog";

export default function HomePage() {
  const deposit = getSku("deposit");

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Henry Intel</p>
          <h1>Local AI Operator</h1>
          <p className="lede">
            A 14-day install of a private AI stack for one local business.
            Owner-operated trades, healthcare practices, law firms, local B2B.
          </p>
          <p className="creed">{CREED}</p>
          <div className="actions">
            <PayButton
              sku="deposit"
              label={`Start with a ${formatUsd(deposit.amountUsd)} deposit`}
              paymentLink={deposit.paymentLink}
              className="btn"
            />
            <Link className="btn btn-secondary" href="/how-it-works">
              See the 14-day install
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <h2>What you buy</h2>
            <ul className="list">
              <li>A same-week AI audit of your shop — your jobs, your tools, your bottlenecks.</li>
              <li>One working agent on your job data, not a demo on ours.</li>
              <li>A 14-day ride-along while the stack is installed and used on real work.</li>
              <li>Optional monthly ops after handoff: SOP plus a weekly 30-minute call.</li>
            </ul>
          </div>
          <div>
            <h2>What you do not get</h2>
            <ul className="list">
              <li>A ChatGPT login.</li>
              <li>A 40-hour course.</li>
              <li>A generic website chatbot.</li>
              <li>PHI sitting on someone else’s server.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-rule">
        <div className="wrap">
          <h2>Built for one local shop</h2>
          <p className="muted">
            One operator. One stack. Evidence from your files, not a prompt
            library. If the work cannot be shown, it is not done.
          </p>
          <div className="cards" style={{ marginTop: "1.4rem" }}>
            <article className="card">
              <h3>Trades</h3>
              <p>Job packets, estimates, parts, and follow-up that currently live in the owner’s head.</p>
            </article>
            <article className="card">
              <h3>Healthcare practices</h3>
              <p>Private by default. Operations on hardware you own. We do not park PHI on a rented model.</p>
            </article>
            <article className="card">
              <h3>Law firms &amp; local B2B</h3>
              <p>Matter intake, document triage, and status that can be audited. No theater.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-rule">
        <div className="wrap split">
          <div>
            <h2>Hardware is yours</h2>
            <p>
              You buy a Mac mini from Apple. Henry Intel quotes the spec and
              installs the stack. We do not sell hardware, and we do not
              finance it through Stripe.
            </p>
          </div>
          <div className="notice">
            <h3>Day 0</h3>
            <p>
              The {formatUsd(deposit.amountUsd)} setup deposit is 50% of the{" "}
              {formatUsd(getSku("setup").amountUsd)} install. It starts the
              same-week audit. Full pricing is on the{" "}
              <Link href="/pricing">pricing page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section-rule">
        <div className="wrap">
          <h2>Talk to the operator</h2>
          <p>
            Email{" "}
            <a href={`mailto:${CONTACT_EMAIL_PUBLIC}`}>{CONTACT_EMAIL_PUBLIC}</a>
            . No tickets. No chatbot.
          </p>
        </div>
      </section>
    </>
  );
}
