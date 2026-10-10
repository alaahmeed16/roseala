// ROSEALA — product details page (product.html?id=...).

(() => {
  const esc = ROSEALA.escapeHtml;
  const root = document.getElementById("product-root");
  const id = new URLSearchParams(window.location.search).get("id");
  const product = ROSEALA.findProduct(id);

  // ---------- Product not found ----------
  if (!product) {
    document.title = "Product not found — ROSEALA";
    root.innerHTML = `
      <div class="empty-state">
        <h1>We couldn't find that flower</h1>
        <p>It may have been removed, or the link is incomplete.</p>
        <a href="shop.html" class="btn btn-primary">Back to the shop</a>
      </div>`;
    return;
  }

  const category = ROSEALA.findCategory(product.category);
  const selected = ROSEALA.defaultOptions(product);
  let quantity = 1;

  document.title = `${product.name} — ROSEALA`;

  // ---------- Option groups (size, wrapping, ribbon, ...) ----------
  const optionsHtml = product.options
    .map((groupId) => {
      const group = ROSEALA.optionGroups[groupId];
      const choices = group.choices
        .map((choice, i) => `
          <label class="option-pill">
            <input type="radio" name="${groupId}" value="${choice.id}"${i === 0 ? " checked" : ""}>
            <span>${esc(choice.label)}${choice.priceAdd ? ` <small>+${ROSEALA.formatPrice(choice.priceAdd)}</small>` : ""}</span>
          </label>`)
        .join("");
      return `
        <fieldset class="option-group">
          <legend>${esc(group.label)}</legend>
          <div class="option-choices">${choices}</div>
        </fieldset>`;
    })
    .join("");

  root.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a> <span>/</span>
      <a href="shop.html">Shop</a> <span>/</span>
      ${category ? `<a href="shop.html?category=${category.id}">${esc(category.name)}</a> <span>/</span>` : ""}
      <span aria-current="page">${esc(product.name)}</span>
    </nav>

    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${esc(product.name)}">
      </div>

      <div class="product-detail-info">
        <p class="product-tag">${category ? esc(category.name) : ""}</p>
        <h1>${esc(product.name)}</h1>
        <p class="detail-price" id="detail-price"></p>
        <p class="detail-description">${esc(product.description)}</p>

        <form id="add-to-cart-form">
          ${optionsHtml}

          <div class="option-group">
            <span class="legend-like" id="qty-label">Quantity</span>
            <div class="qty-stepper" role="group" aria-labelledby="qty-label">
              <button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>
              <input type="number" id="qty-input" value="1" min="1" max="${ROSEALA.cart.MAX_QTY}" aria-label="Quantity">
              <button type="button" data-qty="1" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block">Add to My Bag ♡</button>
        </form>

        <ul class="detail-list">
          ${product.details.map((d) => `<li>${esc(d)}</li>`).join("")}
        </ul>
        <p class="note">Sample product. Delivery and checkout are not available yet.</p>
      </div>
    </div>`;

  // ---------- Price updates when options change ----------
  const priceEl = document.getElementById("detail-price");
  const form = document.getElementById("add-to-cart-form");
  const qtyInput = document.getElementById("qty-input");

  function updatePrice() {
    priceEl.textContent = ROSEALA.formatPrice(ROSEALA.unitPrice(product, selected));
  }

  function setQuantity(value) {
    const n = Math.floor(Number(value));
    quantity = Number.isFinite(n) ? Math.min(Math.max(n, 1), ROSEALA.cart.MAX_QTY) : 1;
    qtyInput.value = quantity;
  }

  form.addEventListener("change", (event) => {
    if (event.target.type === "radio") {
      selected[event.target.name] = event.target.value;
      updatePrice();
    }
    if (event.target === qtyInput) setQuantity(qtyInput.value);
  });

  form.querySelectorAll("[data-qty]").forEach((btn) =>
    btn.addEventListener("click", () => setQuantity(quantity + Number(btn.dataset.qty)))
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setQuantity(qtyInput.value);
    ROSEALA.cart.add(product.id, selected, quantity);
    ROSEALA.showToast(`${product.name} × ${quantity} added to your cart`);
  });

  updatePrice();

  // ---------- Related products (same category first) ----------
  const related = [
    ...ROSEALA.products.filter((p) => p.id !== product.id && p.category === product.category),
    ...ROSEALA.products.filter((p) => p.id !== product.id && p.category !== product.category && p.featured)
  ].slice(0, 4);

  if (related.length) {
    document.getElementById("related-products").innerHTML = related.map(ROSEALA.productCard).join("");
    document.getElementById("related-section").hidden = false;
  }
})();
