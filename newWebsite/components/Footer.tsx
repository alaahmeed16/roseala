import Link from "next/link";
import { categories } from "@/lib/products";
import { CurrentYear } from "./CurrentYear";
import { LilyMark } from "./LilyMark";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo logo-footer" aria-label="ROSEALA home">
            <LilyMark />
            <span className="logo-text">
              <span className="logo-name">ROSEALA</span>
              <span className="logo-tagline">Floral Atelier</span>
            </span>
          </Link>
          <p>Luxury flowers, hand-tied and beautifully wrapped.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/shop">All Flowers</Link></li>
            {categories.map((c) => (
              <li key={c.id}><Link href={`/shop?category=${c.id}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#occasions">Occasions</Link></li>
            <li><Link href="/#bespoke">Bespoke Bouquets</Link></li>
            <li><Link href="/#story">Our Story</Link></li>
            <li><Link href="/cart">Your Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Letters from the Atelier</h4>
          <p>New collections and seasonal blooms, sent gently to your inbox.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; <CurrentYear /> ROSEALA. All rights reserved. &nbsp;·&nbsp; Sample store: no real orders are taken.
          </p>
        </div>
      </div>
    </footer>
  );
}
