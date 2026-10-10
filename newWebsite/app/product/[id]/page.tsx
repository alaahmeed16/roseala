import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductPurchase } from "@/components/ProductPurchase";
import { findCategory, findProduct, products } from "@/lib/products";

// Every product is prerendered at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  return { title: product ? product.name : "Product not found" };
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const category = findCategory(product.category);

  // Related products: same category first, then featured ones from elsewhere.
  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category && p.featured),
  ].slice(0, 4);

  return (
    <>
      <section className="section section-tight">
        <div className="container" id="product-root">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span>{" "}
            <Link href="/shop">Shop</Link> <span>/</span>{" "}
            {category && (
              <>
                <Link href={`/shop?category=${category.id}`}>{category.name}</Link> <span>/</span>{" "}
              </>
            )}
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-detail">
            <div className="product-detail-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 860px) 100vw, 600px"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="product-detail-info">
              <p className="product-tag">{category ? category.name : ""}</p>
              <h1>{product.name}</h1>

              <ProductPurchase key={product.id} product={product}>
                <p className="detail-description">{product.description}</p>
              </ProductPurchase>

              <ul className="detail-list">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="note">Sample product. Delivery and checkout are not available yet.</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-tint" id="related-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">You may also like</p>
              <h2>More from the Atelier</h2>
            </div>
            <div className="product-grid" id="related-products">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
