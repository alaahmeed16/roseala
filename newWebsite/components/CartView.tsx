"use client";

// Cart page: change quantities, remove items, see the subtotal.

import Image from "next/image";
import Link from "next/link";
import { clampQty, MAX_QTY, removeLine, setLineQty, useCart, useHydrated, type CartLineDetails } from "@/lib/cart";
import { describeOptions, formatPrice } from "@/lib/products";
import { useToast } from "./ToastProvider";

function CartLine({ line }: { line: CartLineDetails }) {
  const showToast = useToast();
  const url = `/product/${encodeURIComponent(line.product.id)}`;
  const name = line.product.name;

  return (
    <li className="cart-line">
      <Link href={url} className="cart-line-image">
        <Image src={line.product.image} alt={name} fill sizes="110px" />
      </Link>
      <div className="cart-line-info">
        <h3><Link href={url}>{name}</Link></h3>
        <p className="cart-line-options">{describeOptions(line.product, line.options)}</p>
        <p className="cart-line-unit">{formatPrice(line.unitPrice)} each</p>
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            removeLine(line.key);
            showToast(`${name} removed from your cart`);
          }}
        >
          Remove
        </button>
      </div>
      <div className="qty-stepper" role="group" aria-label={`Quantity for ${name}`}>
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={line.qty <= 1}
          onClick={() => setLineQty(line.key, line.qty - 1)}
        >
          −
        </button>
        {/* Uncontrolled: `key` resets the field whenever the saved quantity changes. */}
        <input
          key={line.qty}
          type="number"
          defaultValue={line.qty}
          min={1}
          max={MAX_QTY}
          aria-label="Quantity"
          onBlur={(event) => {
            const qty = clampQty(event.currentTarget.value);
            event.currentTarget.value = String(qty);
            if (qty !== line.qty) setLineQty(line.key, qty);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
        />
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={line.qty >= MAX_QTY}
          onClick={() => setLineQty(line.key, line.qty + 1)}
        >
          +
        </button>
      </div>
      <p className="cart-line-total">{formatPrice(line.lineTotal)}</p>
    </li>
  );
}

export function CartView() {
  const hydrated = useHydrated();
  const { lines, count, subtotal } = useCart();

  // Nothing is shown until the saved cart has been read, so a full cart never flashes as empty.
  if (!hydrated) return null;

  if (lines.length === 0) {
    return (
      <div className="empty-state">
        <p>Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary">Discover our flowers</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <ul className="cart-lines">
        {lines.map((line) => (
          <CartLine key={line.key} line={line} />
        ))}
      </ul>

      <aside className="cart-summary">
        <h2>Summary</h2>
        <div className="summary-row"><span>Items</span><span>{count}</span></div>
        <div className="summary-row summary-total"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <p className="note">Delivery and taxes will be calculated at checkout.</p>
        <button type="button" className="btn btn-primary btn-block" disabled>Checkout coming soon</button>
        <p className="note">This is a sample store. No payment is taken and no order is placed.</p>
        <Link href="/shop" className="continue-link">← Continue shopping</Link>
      </aside>
    </div>
  );
}
