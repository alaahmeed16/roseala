// ROSEALA — cart page: change quantities, remove items, see the subtotal.

(() => {
  const esc = ROSEALA.escapeHtml;
  const root = document.getElementById("cart-root");

  function render() {
    const lines = ROSEALA.cart.getLines();

    if (lines.length === 0) {
      root.innerHTML = `
        <div class="empty-state">
          <p>Your cart is empty.</p>
          <a href="shop.html" class="btn btn-primary">Discover our flowers</a>
        </div>`;
      return;
    }

    const rows = lines
      .map((line) => {
        const url = ROSEALA.productUrl(line.product);
        const name = esc(line.product.name);
        return `
          <li class="cart-line" data-key="${esc(line.key)}">
            <a href="${url}" class="cart-line-image"><img src="${line.product.image}" alt="${name}"></a>
            <div class="cart-line-info">
              <h3><a href="${url}">${name}</a></h3>
              <p class="cart-line-options">${esc(ROSEALA.describeOptions(line.product, line.options))}</p>
              <p class="cart-line-unit">${ROSEALA.formatPrice(line.unitPrice)} each</p>
              <button type="button" class="link-btn" data-action="remove">Remove</button>
            </div>
            <div class="qty-stepper" role="group" aria-label="Quantity for ${name}">
              <button type="button" data-action="decrease" aria-label="Decrease quantity"${line.qty <= 1 ? " disabled" : ""}>−</button>
              <input type="number" value="${line.qty}" min="1" max="${ROSEALA.cart.MAX_QTY}" aria-label="Quantity" data-action="set">
              <button type="button" data-action="increase" aria-label="Increase quantity"${line.qty >= ROSEALA.cart.MAX_QTY ? " disabled" : ""}>+</button>
            </div>
            <p class="cart-line-total">${ROSEALA.formatPrice(line.lineTotal)}</p>
          </li>`;
      })
      .join("");

    const count = ROSEALA.cart.count();
    root.innerHTML = `
      <div class="cart-layout">
        <ul class="cart-lines">${rows}</ul>

        <aside class="cart-summary">
          <h2>Summary</h2>
          <div class="summary-row"><span>Items</span><span>${count}</span></div>
          <div class="summary-row summary-total"><span>Subtotal</span><span>${ROSEALA.formatPrice(ROSEALA.cart.subtotal())}</span></div>
          <p class="note">Delivery and taxes will be calculated at checkout.</p>
          <button type="button" class="btn btn-primary btn-block" disabled>Checkout coming soon</button>
          <p class="note">This is a sample store. No payment is taken and no order is placed.</p>
          <a href="shop.html" class="continue-link">← Continue shopping</a>
        </aside>
      </div>`;
  }

  // One listener handles every button in the cart.
  root.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    const lineEl = event.target.closest(".cart-line");
    if (!btn || !lineEl) return;
    const key = lineEl.dataset.key;
    const line = ROSEALA.cart.getLines().find((l) => l.key === key);
    if (!line) return;

    if (btn.dataset.action === "increase") ROSEALA.cart.setQty(key, line.qty + 1);
    if (btn.dataset.action === "decrease") ROSEALA.cart.setQty(key, line.qty - 1);
    if (btn.dataset.action === "remove") {
      ROSEALA.cart.remove(key);
      ROSEALA.showToast(`${line.product.name} removed from your cart`);
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.dataset.action !== "set") return;
    ROSEALA.cart.setQty(event.target.closest(".cart-line").dataset.key, event.target.value);
  });

  window.addEventListener("cart:updated", render);
  render();
})();
