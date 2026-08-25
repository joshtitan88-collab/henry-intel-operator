import type { Metadata } from "next";
import Link from "next/link";
import { PayButton } from "@/components/PayButton";
import { formatUsd, getSku } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "14-day Local AI Operator install: same-week audit, one working agent on your job data, ride-along, then optional monthly ops.",
};

export default function HowItWorksPage() {
  const deposit = getSku("deposit");

  return (
    <section>
      <div className="wrap">
        <p className="kicker">The install</p>
        <h1>How it works</h1>
        <p className="muted" style={{ maxWidth: "40rem" }}>
          One shop. Fourteen days. A private stack on hardware you buy from
          Apple. Henry Intel quotes, installs, and rides along.
        </p>

        <div className="steps" style={{ marginTop: "2rem" }}>
          <article className="step">
            <div className="step-day">Day 0</div>
            <div>
              <h3>Deposit and intake</h3>
              <p>
                You pay the {formatUsd(deposit.amountUsd)} setup deposit — 50%
                of the {formatUsd(getSku("setup").amountUsd)} install. We take
                a straight inventory of how work actually moves through the
                shop. No workshop. No slide deck.
              </p>
            </div>
          </article>
          <article className="step">
            <div className="step-day">Same week</div>
            <div>
              <h3>AI audit of your shop</h3>
              <p>
                We audit your jobs, tools, and bottlenecks. The report is
                evidence: what is true in your files, what is missing, and
                which single agent is worth installing first.
              </p>
            </div>
          </article>
          <article className="step">
            <div className="step-day">Days 1–14</div>
            <div>
              <h3>Install and ride-along</h3>
              <p>
                You buy a Mac mini from Apple against our quote. We install a
                private AI stack on that machine and stand up one working
                agent on your job data. For fourteen days we ride along while
                it is used on real work.
              </p>
            </div>
          </article>
          <article className="step">
            <div className="step-day">Handoff</div>
            <div>
              <h3>Yours, running</h3>
              <p>
                You keep the machine and the stack. Optional ops retainer
                after handoff: SOP plus a weekly 30-minute call, month to
                month. No lock-in theater.
              </p>
            </div>
          </article>
        </div>

        <div className="notice" style={{ marginTop: "2rem" }}>
          <h3>Hardware</h3>
          <p>
            Henry Intel does not sell or finance computers. Stripe is not used
            for hardware. The Mac mini is purchased by the client from Apple.
            We quote the spec and install on that box.
          </p>
        </div>

        <div className="actions" style={{ marginTop: "1.6rem" }}>
          <PayButton
            sku="deposit"
            label={`Pay ${formatUsd(deposit.amountUsd)} deposit`}
            paymentLink={deposit.paymentLink}
          />
          <Link className="btn btn-ghost" href="/pricing">
            Full pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
