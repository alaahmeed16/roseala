import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { categories, occasions, products } from "@/lib/products";

export const metadata: Metadata = {
  description:
    "ROSEALA is a luxury online flower boutique. Hand-tied bouquets, bespoke arrangements and elegant gift packaging.",
};

export default function HomePage() {
  // Featured products (marked `featured: true` in lib/products.ts)
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <RevealOnScroll />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text reveal">
            <p className="eyebrow">Luxury Floral Atelier</p>
            <h1>Flowers, <em>softly</em> told.</h1>
            <p className="hero-lead">
              For the people you love, the moments you cherish, and the little
              surprises that make an ordinary day feel special. Because flowers
              don&apos;t need a reason. ♡
            </p>
            <div className="hero-buttons">
              <Link href="/shop" className="btn btn-primary">Explore Our Flowers ♡</Link>
              <Link href="#bespoke" className="btn btn-outline">Create Your Own Bouquet</Link>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="arch arch-hero">
              <Image
                src="/images/products/hero-home-tulips.png"
                alt="A bouquet of pink and cream tulips in a ROSEALA hat box"
                fill
                sizes="(max-width: 860px) 100vw, 460px"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="section" id="collections">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Curated for you</p>
            <h2>Shop by Flower</h2>
          </div>
          <div className="category-grid" id="category-grid">
            {categories.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.id}`} className="category-card reveal">
                <div className="arch">
                  <Image src={c.image} alt="" fill sizes="(max-width: 860px) 50vw, 380px" />
                </div>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="section section-tint" id="featured">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Most loved</p>
            <h2>Featured Bouquets</h2>
          </div>
          <div className="product-grid" id="featured-products">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="center">
            <Link href="/shop" className="btn btn-outline">View All Flowers</Link>
          </div>
        </div>
      </section>

      {/* ============ CUSTOM BOUQUETS ============ */}
      <section className="section" id="bespoke">
        <div className="container bespoke-inner">
          <div className="bespoke-visual reveal">
            <div className="arch arch-large">
              <Image
                src="/images/products/bespoke-bouquet.png"
                alt="A bespoke hand-tied bouquet"
                fill
                sizes="(max-width: 860px) 100vw, 440px"
              />
            </div>
          </div>

          <div className="bespoke-text reveal">
            <p className="eyebrow">The Bespoke Experience</p>
            <h2>A bouquet made only for you</h2>
            <p>
              Work with our florists to create something truly personal. Choose
              each flower, your colours, and the way it is wrapped. We will
              arrange it by hand on the day it is delivered.
            </p>

            <ol className="steps">
              <li>
                <span className="step-num">01</span>
                <div><h3>Choose your blooms</h3><p>Lilies, peonies, garden roses, ranunculus and seasonal greenery.</p></div>
              </li>
              <li>
                <span className="step-num">02</span>
                <div><h3>Select your palette</h3><p>Royal plum, ivory and cream, forest greens, or a mix of all three.</p></div>
              </li>
              <li>
                <span className="step-num">03</span>
                <div><h3>Wrap &amp; ribbon</h3><p>Cream or plum paper, velvet or silk ribbon, and a handwritten card.</p></div>
              </li>
            </ol>

            <Link href="/shop" className="btn btn-primary">Browse Bouquets</Link>
            <p className="note">
              Our bespoke bouquet designer is coming soon. For now, every bouquet in the shop can be
              personalised with size, wrapping and ribbon.
            </p>
          </div>
        </div>
      </section>

      {/* ============ OCCASIONS & GIFTS ============ */}
      <section className="section section-green" id="occasions">
        <div className="container">
          <div className="section-heading reveal">
            <p className="eyebrow">Occasions &amp; Gifts</p>
            <h2>Flowers for Every Feeling ♡</h2>
            <p>For the big celebrations, the little moments, and all the love in between.</p>
          </div>
          <div className="occasion-grid" id="occasion-grid">
            {occasions.map((o) => (
              <Link key={o.id} href={`/shop?occasion=${o.id}`} className="occasion-card reveal">
                <h3>{o.name} ♡</h3>
                <p>{o.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRAND STORY & PACKAGING ============ */}
      <section className="section" id="story">
        <div className="container story-inner">
          <div className="story-text reveal">
            <p className="eyebrow">A Little Love Story ♡</p>
            <h2>A Little Love, Wrapped in Flowers ♡</h2>
            <p>
              At ROSEALA, we believe flowers are more than a gift. They&apos;re a little
              way of saying &apos;I&apos;m thinking of you,&apos; &apos;I&apos;m proud of you,&apos; or simply
              &apos;I love you.&apos;
            </p>
            <p>
              We believe the sweetest moments don&apos;t always need a special occasion.
              Sometimes, the most beautiful flowers are the ones given for no reason at all.
            </p>
            <p>
              Whether it&apos;s a bouquet for someone special, a little surprise for a
              friend, or flowers just for yourself, we hope every ROSEALA bouquet
              brings a little more love into someone&apos;s day.
            </p>
            <p>
              Because life is made of little moments, and every one of them
              deserves a little bloom. ♡
            </p>
            <p className="signature">With love, ROSEALA</p>
          </div>

          <div className="packaging reveal">
            <h3>The ROSEALA Unboxing</h3>
            <ul className="packaging-list">
              <li><strong>Silk-finish paper</strong> in warm cream or royal plum</li>
              <li><strong>Velvet ribbon</strong> in forest green, printed with ROSEALA in gold</li>
              <li><strong>Lily wax seal</strong> on every wrapped bouquet</li>
              <li><strong>Handwritten card</strong> on thick cream stock</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
