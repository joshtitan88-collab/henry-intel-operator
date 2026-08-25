import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="wrap">
        <p className="kicker">404</p>
        <h1>Page not found</h1>
        <p className="muted">That URL is not in the record.</p>
        <div className="actions">
          <Link className="btn btn-navy" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost" href="/pricing">
            Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
