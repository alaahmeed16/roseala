"use client";

// Shop page: product grid with category / occasion filters and sorting.
// The filters live in the address (e.g. /shop?category=roses), so links can point
// to them. The address is the single source of truth: clicking a filter rewrites it
// with history.replaceState, which Next.js feeds back into useSearchParams.

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  categories,
  findCategory,
  findOccasion,
  occasions,
  products,
  type Product,
} from "@/lib/products";
import { ProductCard } from "./ProductCard";

type SortOrder = "featured" | "price-asc" | "price-desc" | "name";
type Filters = { category: string; occasion: string };

const DEFAULT_SUBTITLE = "Hand-tied bouquets, arrangements and living gifts.";

function visibleProducts({ category, occasion }: Filters, sort: SortOrder): Product[] {
  const list = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (occasion === "all" || p.occasions.some((o) => o === occasion)),
  );
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "featured") list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  return list;
}

function updateAddress({ category, occasion }: Filters) {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  if (occasion !== "all") query.set("occasion", occasion);
  const search = query.toString();
  window.history.replaceState(null, "", window.location.pathname + (search ? `?${search}` : ""));
}

type ShopViewProps = Filters & {
  sort: SortOrder;
  onCategoryChange: (category: string) => void;
  onOccasionChange: (occasion: string) => void;
  onSortChange: (sort: SortOrder) => void;
  onReset: () => void;
};

function ShopView({
  category,
  occasion,
  sort,
  onCategoryChange,
  onOccasionChange,
  onSortChange,
  onReset,
}: ShopViewProps) {
  const activeCategory = findCategory(category);
  const activeOccasion = findOccasion(occasion);
  const title = activeCategory ? activeCategory.name : activeOccasion ? activeOccasion.name : "All Flowers";
  const subtitle = activeCategory
    ? activeCategory.blurb
    : activeOccasion
      ? activeOccasion.blurb
      : DEFAULT_SUBTITLE;
  const list = visibleProducts({ category, occasion }, sort);

  useEffect(() => {
    document.title = `${title} — ROSEALA`;
  }, [title]);

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">The Collection</p>
          <h1 id="shop-title">{title}</h1>
          <p id="shop-subtitle">{subtitle}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="shop-toolbar">
            <div className="filter-list" id="category-filters" role="group" aria-label="Filter by category">
              {[{ id: "all", name: "All" }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`filter-btn${c.id === category ? " active" : ""}`}
                  aria-pressed={c.id === category}
                  onClick={() => onCategoryChange(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="shop-selects">
              <label className="select-field">
                <span>Occasion</span>
                <select
                  id="occasion-filter"
                  value={occasion}
                  onChange={(event) => onOccasionChange(event.target.value)}
                >
                  {[{ id: "all", name: "All occasions" }, ...occasions].map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </label>
              <label className="select-field">
                <span>Sort</span>
                <select
                  id="sort-order"
                  value={sort}
                  onChange={(event) => onSortChange(event.target.value as SortOrder)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </label>
            </div>
          </div>

          <p className="result-count" id="result-count" aria-live="polite">
            {list.length} {list.length === 1 ? "design" : "designs"}
          </p>
          <div className="product-grid" id="product-grid">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {list.length === 0 && (
            <div className="empty-state" id="empty-state">
              <p>No flowers match these filters yet.</p>
              <button type="button" className="btn btn-outline" id="reset-filters" onClick={onReset}>
                Show all flowers
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ShopBrowser() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortOrder>("featured");

  // Unknown values in the address fall back to "all".
  const category = findCategory(searchParams.get("category"))?.id ?? "all";
  const occasion = findOccasion(searchParams.get("occasion"))?.id ?? "all";

  return (
    <ShopView
      category={category}
      occasion={occasion}
      sort={sort}
      onCategoryChange={(next) => updateAddress({ category: next, occasion })}
      onOccasionChange={(next) => updateAddress({ category, occasion: next })}
      onSortChange={setSort}
      onReset={() => updateAddress({ category: "all", occasion: "all" })}
    />
  );
}

// Shown in the prerendered HTML until the address is known: the unfiltered shop.
export function ShopFallback() {
  const noop = () => {};
  return (
    <ShopView
      category="all"
      occasion="all"
      sort="featured"
      onCategoryChange={noop}
      onOccasionChange={noop}
      onSortChange={noop}
      onReset={noop}
    />
  );
}
