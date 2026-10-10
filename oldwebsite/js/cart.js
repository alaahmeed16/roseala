// ROSEALA — shopping cart.
// The cart is saved in the browser (localStorage), so it is kept while moving
// between pages. Prices are always looked up from products.js, never stored.
// There is no real checkout or payment yet.

window.ROSEALA = window.ROSEALA || {};

ROSEALA.cart = (() => {
  const STORAGE_KEY = "roseala-cart-v1";
  const MAX_QTY = 20;

  // Each line looks like: { key, productId, options: { size: "classic" }, qty }
  let lines = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return saved.filter(isValidLine).map((line) => ({ ...line, qty: clampQty(line.qty) }));
    } catch (error) {
      return [];
    }
  }

  // Drop anything that no longer matches the catalogue (e.g. a removed product).
  function isValidLine(line) {
    const product = line && ROSEALA.findProduct(line.productId);
    if (!product || typeof line.options !== "object") return false;
    return product.options.every((group) =>
      ROSEALA.optionGroups[group].choices.some((c) => c.id === line.options[group])
    );
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch (error) {
      // Storage can be unavailable (e.g. private mode); the cart still works on this page.
    }
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function clampQty(qty) {
    const n = Math.floor(Number(qty));
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.min(n, MAX_QTY);
  }

  // Same product + same options = same cart line.
  function makeKey(productId, options) {
    const parts = Object.keys(options).sort().map((k) => `${k}=${options[k]}`);
    return [productId, ...parts].join("|");
  }

  function add(productId, options, qty = 1) {
    const product = ROSEALA.findProduct(productId);
    if (!product) return;
    const chosen = { ...ROSEALA.defaultOptions(product), ...options };
    const key = makeKey(productId, chosen);
    const existing = lines.find((line) => line.key === key);
    if (existing) {
      existing.qty = clampQty(existing.qty + qty);
    } else {
      lines.push({ key, productId, options: chosen, qty: clampQty(qty) });
    }
    save();
  }

  function setQty(key, qty) {
    const line = lines.find((l) => l.key === key);
    if (!line) return;
    line.qty = clampQty(qty);
    save();
  }

  function remove(key) {
    lines = lines.filter((line) => line.key !== key);
    save();
  }

  function clear() {
    lines = [];
    save();
  }

  // Lines with product details and prices filled in, ready to display.
  function getLines() {
    return lines.map((line) => {
      const product = ROSEALA.findProduct(line.productId);
      const unitPrice = ROSEALA.unitPrice(product, line.options);
      return { ...line, product, unitPrice, lineTotal: unitPrice * line.qty };
    });
  }

  function count() {
    return lines.reduce((sum, line) => sum + line.qty, 0);
  }

  function subtotal() {
    return getLines().reduce((sum, line) => sum + line.lineTotal, 0);
  }

  // Keep several open tabs in sync.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      lines = load();
      window.dispatchEvent(new CustomEvent("cart:updated"));
    }
  });

  return { add, setQty, remove, clear, getLines, count, subtotal, MAX_QTY };
})();
