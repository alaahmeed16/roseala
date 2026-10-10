# ROSEALA — online flower boutique (prototype)

Plain HTML, CSS and JavaScript. No installs or build step needed.

**To open:** double-click `index.html`.

## Pages
| File | Page |
|---|---|
| `index.html` | Homepage |
| `shop.html` | Shop with category / occasion filters (`shop.html?category=roses`, `shop.html?occasion=wedding`) |
| `product.html?id=...` | Product details, options, Add to Cart |
| `cart.html` | Cart: change quantity, remove, subtotal |
| `credits.html` | Photo credits (required by the photo licences) |

## Where things live
| File | What it does |
|---|---|
| `js/products.js` | **All product data**: categories, occasions, option groups (size, wrapping…) and products |
| `js/cart.js` | Cart logic. Saved in the browser (localStorage) so it survives page changes |
| `js/components.js` | Shared header, footer, product card and pop-up message |
| `js/main.js` | Shared behaviour: mobile menu, cart badge, fade-in |
| `js/pages/*.js` | One small script per page |
| `css/style.css` | All styling. Brand colours and fonts are at the top (`:root`) |
| `images/products/` | Temporary product photos (Wikimedia Commons, see `credits.html`) |
| `images/illustrations/` | Earlier SVG illustrations, not currently used |

## Add a product
1. Put a photo in `images/products/` (portrait works best).
2. In `js/products.js`, copy one product block, change `id`, `name`, `price`, `image`, etc.
3. Fill in `photo` with the credit, or remove the photo credit once you use your own photography.

## Not built yet
Real checkout and payments, customer accounts, order processing, delivery dates, search,
the bespoke bouquet designer, the newsletter, and stock levels.
