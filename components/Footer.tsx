import Link from "next/link";
import { LEGAL_PAYEE } from "@/lib/catalog";

export function Footer({ email, creed }: { email: string; creed: string }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="wordmark">HENRY INTEL</div>
        <div>{creed}</div>
        <div>
          Legal payee: {LEGAL_PAYEE}. Invoices and Stripe receipts are issued
          in that name.
        </div>
        <div>
          Contact: <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
          <Link href="/privacy">Privacy</Link>
          {" · "}
          <Link href="/terms">Terms</Link>
          {" · "}
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
