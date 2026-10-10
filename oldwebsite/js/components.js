// ROSEALA — shared page parts (header, footer, product card, toast).
// Edit the header or footer here once and every page updates.

window.ROSEALA = window.ROSEALA || {};

ROSEALA.formatPrice = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

ROSEALA.escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

ROSEALA.productUrl = (product) => `product.html?id=${encodeURIComponent(product.id)}`;

// ---------- Icons ----------
const LILY_MARK = `
  <svg class="logo-lily" viewBox="0 0 40 60" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 58 C20 46 21 36 20 25"/>
      <path d="M20 46 C25 42 29 38 31 31 C25 33 22 38 20 46Z"/>
      <path d="M20 40 C16 37 13 34 12 29 C16 31 18 35 20 40Z"/>
      <path d="M20 25 C17 19 17 11 20 3 C23 11 23 19 20 25Z"/>
      <path d="M20 25 C14 23 9 18 6 11 C5 8.5 6.5 7.5 8.5 9 C12 14 16 19 20 25Z"/>
      <path d="M20 25 C26 23 31 18 34 11 C35 8.5 33.5 7.5 31.5 9 C28 14 24 19 20 25Z"/>
      <path d="M20 23 L15.5 10 M20 23 L24.5 10 M20 23 L20 8"/>
    </g>
  </svg>`;

const BAG_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`;

ROSEALA.lilyMark = LILY_MARK;

// ---------- Header ----------
// `active` is set on <body data-page="..."> so the current link is highlighted.
ROSEALA.renderHeader = (active) => {
  const links = [
    { id: "home",      href: "index.html",           label: "Home" },
    { id: "shop",      href: "shop.html",            label: "Shop" },
    { id: "occasions", href: "index.html#occasions", label: "Occasions" },
    { id: "bespoke",   href: "index.html#bespoke",   label: "Bespoke" },
    { id: "story",     href: "index.html#story",     label: "Our Story" }
  ];

  const nav = links
    .map((l) => `<li><a href="${l.href}"${l.id === active ? ' class="active" aria-current="page"' : ""}>${l.label}</a></li>`)
    .join("");

  return `
    <div class="announcement">
      Complimentary hand delivery on orders over $150<span class="announce-extra"> &nbsp;·&nbsp; Every bouquet arrives gift-wrapped</span>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">
          <span></span><span></span><span></span>
        </button>

        <a href="index.html" class="logo" aria-label="ROSEALA home">
          ${LILY_MARK}
          <span class="logo-text">
            <span class="logo-name">ROSEALA</span>
            <span class="logo-tagline">Floral Atelier</span>
          </span>
        </a>

        <nav id="main-nav" class="main-nav" aria-label="Main">
          <ul>${nav}</ul>
        </nav>

        <div class="header-actions">
          <a href="cart.html" class="icon-btn bag${active === "cart" ? " active" : ""}" aria-label="Cart">
            ${BAG_ICON}
            <span class="bag-count" data-cart-count>0</span>
          </a>
        </div>
      </div>
    </header>`;
};

// ---------- Footer ----------
ROSEALA.renderFooter = () => {
  const categoryLinks = ROSEALA.categories
    .map((c) => `<li><a href="shop.html?category=${c.id}">${c.name}</a></li>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a href="index.html" class="logo logo-footer" aria-label="ROSEALA home">
            ${LILY_MARK}
            <span class="logo-text">
              <span class="logo-name">ROSEALA</span>
              <span class="logo-tagline">Floral Atelier</span>
            </span>
          </a>
          <p>Luxury flowers, hand-tied and beautifully wrapped.</p>
        </div>

        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="shop.html">All Flowers</a></li>
            ${categoryLinks}
          </ul>
        </div>

        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#occasions">Occasions</a></li>
            <li><a href="index.html#bespoke">Bespoke Bouquets</a></li>
            <li><a href="index.html#story">Our Story</a></li>
            <li><a href="cart.html">Your Cart</a></li>
            <li><a href="credits.html">Photo Credits</a></li>
          </ul>
        </div>

        <div class="footer-col footer-newsletter">
          <h4>Letters from the Atelier</h4>
          <p>New collections and seasonal blooms, sent gently to your inbox.</p>
          <form class="newsletter-form" id="newsletter-form">
            <label for="newsletter-email" class="visually-hidden">Email address</label>
            <input type="email" id="newsletter-email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
          </form>
          <p class="form-message" id="form-message" role="status"></p>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p>&copy; <span id="year"></span> ROSEALA. All rights reserved. &nbsp;·&nbsp; Sample store: no real orders are taken.</p>
        </div>
      </div>
    </footer>`;
};

// ---------- Product card (used on home, shop and product pages) ----------
ROSEALA.productCard = (product) => {
  const category = ROSEALA.findCategory(product.category);
  const url = ROSEALA.productUrl(product);
  const name = ROSEALA.escapeHtml(product.name);
  const hasExtras = product.options.some((g) => ROSEALA.optionGroups[g].choices.some((c) => c.priceAdd > 0));
  return `
    <article class="product-card">
      <a href="${url}" class="product-image">
        <img src="${product.image}" alt="${name}" loading="lazy">
      </a>
      <div class="product-info">
        <p class="product-tag">${category ? category.name : ""}</p>
        <h3><a href="${url}">${name}</a></h3>
        <p class="product-desc">${ROSEALA.escapeHtml(product.shortDescription)}</p>
        <div class="product-bottom">
          <span class="price">${hasExtras ? "From " : ""}${ROSEALA.formatPrice(product.price)}</span>
          <a href="${url}" class="btn-add">View</a>
        </div>
      </div>
    </article>`;
};

// ---------- Small pop-up message ----------
ROSEALA.showToast = (() => {
  let timer;
  return (message) => {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("show"), 2800);
  };
})();

// ---------- Put the header and footer on the page ----------
(() => {
  const page = document.body.dataset.page;
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = ROSEALA.renderHeader(page);
  if (footerSlot) footerSlot.outerHTML = ROSEALA.renderFooter();
})();
