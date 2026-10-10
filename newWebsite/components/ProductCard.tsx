import Image from "next/image";
import Link from "next/link";
import { findCategory, formatPrice, optionGroups, type Product } from "@/lib/products";

// Used on the home, shop and product pages.
export function ProductCard({ product }: { product: Product }) {
  const category = findCategory(product.category);
  const url = `/product/${encodeURIComponent(product.id)}`;
  const hasExtras = product.options.some((g) => optionGroups[g].choices.some((c) => c.priceAdd > 0));

  return (
    <article className="product-card">
      <Link href={url} className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 860px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
      </Link>
      <div className="product-info">
        <p className="product-tag">{category ? category.name : ""}</p>
        <h3><Link href={url}>{product.name}</Link></h3>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="product-bottom">
          <span className="price">
            {hasExtras ? "From " : ""}
            {formatPrice(product.price)}
          </span>
          <Link href={url} className="btn-add">View</Link>
        </div>
      </div>
    </article>
  );
}
