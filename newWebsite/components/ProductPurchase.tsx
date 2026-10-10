"use client";

// The interactive part of the product page: live price, option pills, quantity
// stepper and "Add to My Bag". `children` (the description) is rendered on the
// server and slotted between the price and the form, as in the old page.

import { useState } from "react";
import { addToCart, clampQty, MAX_QTY } from "@/lib/cart";
import {
  defaultOptions,
  formatPrice,
  optionGroups,
  unitPrice,
  type Product,
  type SelectedOptions,
} from "@/lib/products";
import { useToast } from "./ToastProvider";

export function ProductPurchase({ product, children }: { product: Product; children: React.ReactNode }) {
  const showToast = useToast();
  const [selected, setSelected] = useState<SelectedOptions>(() => defaultOptions(product));
  // Kept as text so the field can be emptied while typing; it is tidied up on blur and submit.
  const [qtyText, setQtyText] = useState("1");

  const price = unitPrice(product, selected);

  function commitQty(value: string | number) {
    const qty = clampQty(value);
    setQtyText(String(qty));
    return qty;
  }

  return (
    <>
      <p className="detail-price" id="detail-price">{formatPrice(price)}</p>
      {children}

      <form
        id="add-to-cart-form"
        onSubmit={(event) => {
          event.preventDefault();
          const qty = commitQty(qtyText);
          addToCart(product.id, selected, qty);
          showToast(`${product.name} × ${qty} added to your cart`);
        }}
      >
        {product.options.map((groupId) => {
          const group = optionGroups[groupId];
          return (
            <fieldset className="option-group" key={groupId}>
              <legend>{group.label}</legend>
              <div className="option-choices">
                {group.choices.map((choice) => (
                  <label className="option-pill" key={choice.id}>
                    <input
                      type="radio"
                      name={groupId}
                      value={choice.id}
                      checked={selected[groupId] === choice.id}
                      onChange={() => setSelected((current) => ({ ...current, [groupId]: choice.id }))}
                    />
                    <span>
                      {choice.label}
                      {choice.priceAdd ? <small> +{formatPrice(choice.priceAdd)}</small> : null}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}

        <div className="option-group">
          <span className="legend-like" id="qty-label">Quantity</span>
          <div className="qty-stepper" role="group" aria-labelledby="qty-label">
            <button type="button" aria-label="Decrease quantity" onClick={() => commitQty(clampQty(qtyText) - 1)}>
              −
            </button>
            <input
              type="number"
              id="qty-input"
              value={qtyText}
              min={1}
              max={MAX_QTY}
              aria-label="Quantity"
              onChange={(event) => setQtyText(event.target.value)}
              onBlur={() => commitQty(qtyText)}
            />
            <button type="button" aria-label="Increase quantity" onClick={() => commitQty(clampQty(qtyText) + 1)}>
              +
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Add to My Bag ♡</button>
      </form>
    </>
  );
}
