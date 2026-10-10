import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="empty-state">
          <h1>We couldn&apos;t find that page</h1>
          <p>It may have been moved, or the link is incomplete.</p>
          <Link href="/" className="btn btn-primary">Back to the home page</Link>
        </div>
      </div>
    </section>
  );
}
