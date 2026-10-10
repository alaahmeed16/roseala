// ROSEALA — homepage: fills categories, featured products and occasions from products.js.

(() => {
  const esc = ROSEALA.escapeHtml;

  // Categories
  document.getElementById("category-grid").innerHTML = ROSEALA.categories
    .map((c) => `
      <a href="shop.html?category=${c.id}" class="category-card reveal">
        <div class="arch"><img src="${c.image}" alt="" loading="lazy"></div>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.blurb)}</p>
      </a>`)
    .join("");

  // Featured products (marked `featured: true` in products.js)
  document.getElementById("featured-products").innerHTML = ROSEALA.products
    .filter((p) => p.featured)
    .slice(0, 4)
    .map(ROSEALA.productCard)
    .join("");

  // Occasions
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  document.getElementById("occasion-grid").innerHTML = ROSEALA.occasions
    .map((o, i) => `
      <a href="shop.html?occasion=${o.id}" class="occasion-card reveal">
        <span class="occasion-num">${numerals[i] || ""}</span>
        <h3>${esc(o.name)} ♡</h3>
        <p>${esc(o.blurb)}</p>
      </a>`)
    .join("");
})();
