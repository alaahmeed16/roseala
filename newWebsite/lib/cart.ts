// ROSEALA — shopping cart.
// The cart is saved in the browser (localStorage), so it is kept while moving
// between pages and tabs. Prices are always looked up from products.ts, never
// stored. There is no real checkout or payment yet.
//
// It is a small external store read with useSyncExternalStore: the server (and
// the first client render) see an empty cart, then React switches to the saved
// one right after hydration, so there is never a hydration mismatch.

import { useMemo, useSyncExternalStore } from "react";
import {
  defaultOptions,
  findProduct,
  optionGroups,
  unitPrice,
  type Product,
  type SelectedOptions,
} from "./products";

const STORAGE_KEY = "roseala-cart-v1";
export const MAX_QTY = 20;

// Each line looks like: { key, productId, options: { size: "classic" }, qty }
export type CartLine = { key: string; productId: string; options: SelectedOptions; qty: number };
export type CartLineDetails = CartLine & { product: Product; unitPrice: number; lineTotal: number };

const EMPTY: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

export function clampQty(qty: unknown): number {
  const n = Math.floor(Number(qty));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_QTY);
}

// Drop anything that no longer matches the catalogue (e.g. a removed product).
function isValidLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Partial<CartLine>;
  const product = typeof line.productId === "string" ? findProduct(line.productId) : undefined;
  const options = line.options;
  if (!product || typeof options !== "object" || options === null) return false;
  return product.options.every((group) =>
    optionGroups[group].choices.some((c) => c.id === options[group]),
  );
}

function load(): CartLine[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(isValidLine).map((line) => ({ ...line, qty: clampQty(line.qty) }));
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable (e.g. private mode); the cart still works while the page is open.
  }
  emit();
}

// Keep several open tabs in sync.
function onStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY || event.key === null) {
    lines = load();
    emit();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartLine[] {
  if (!loaded) {
    loaded = true;
    lines = load();
  }
  return lines;
}

const getServerSnapshot = (): CartLine[] => EMPTY;

// Same product + same options = same cart line.
function makeKey(productId: string, options: SelectedOptions): string {
  const parts = Object.keys(options)
    .sort()
    .map((k) => `${k}=${options[k as keyof SelectedOptions]}`);
  return [productId, ...parts].join("|");
}

// ---------- Changing the cart ----------
export function addToCart(productId: string, options: SelectedOptions, qty = 1) {
  const product = findProduct(productId);
  if (!product) return;
  getSnapshot();
  const chosen = { ...defaultOptions(product), ...options };
  const key = makeKey(productId, chosen);
  if (lines.some((line) => line.key === key)) {
    lines = lines.map((line) =>
      line.key === key ? { ...line, qty: clampQty(line.qty + qty) } : line,
    );
  } else {
    lines = [...lines, { key, productId, options: chosen, qty: clampQty(qty) }];
  }
  save();
}

export function setLineQty(key: string, qty: number) {
  getSnapshot();
  if (!lines.some((line) => line.key === key)) return;
  lines = lines.map((line) => (line.key === key ? { ...line, qty: clampQty(qty) } : line));
  save();
}

export function removeLine(key: string) {
  getSnapshot();
  lines = lines.filter((line) => line.key !== key);
  save();
}

// ---------- Reading the cart ----------
// Lines with product details and prices filled in, ready to display.
export function useCart() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    const detailed: CartLineDetails[] = [];
    for (const line of current) {
      const product = findProduct(line.productId);
      if (!product) continue;
      const price = unitPrice(product, line.options);
      detailed.push({ ...line, product, unitPrice: price, lineTotal: price * line.qty });
    }
    return {
      lines: detailed,
      count: detailed.reduce((sum, line) => sum + line.qty, 0),
      subtotal: detailed.reduce((sum, line) => sum + line.lineTotal, 0),
    };
  }, [current]);
}

// False while rendering on the server and during hydration, true afterwards.
// Lets the cart page show nothing until the saved cart has been read.
const subscribeNever = () => () => {};
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}
