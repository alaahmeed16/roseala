import Link from "next/link";

// Shown when /product/<id> does not match a product in lib/products.ts.
export default function ProductNotFound() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="empty-state">
          <h1>We couldn&apos;t find that flower</h1>
          <p>It may have been removed, or the link is incomplete.</p>
          <Link href="/shop" className="btn btn-primary">Back to the shop</Link>
        </div>
      </div>
    </section>
  );
}
