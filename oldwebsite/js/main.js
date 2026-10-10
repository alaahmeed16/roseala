// ROSEALA — behaviour shared by every page.
// Runs after components.js has placed the header and footer.

document.documentElement.classList.add("js");

// ---------- Mobile menu ----------
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

// ---------- Cart indicator in the header ----------
function updateCartCount() {
  const count = ROSEALA.cart.count();
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
    badge.classList.toggle("is-empty", count === 0);
  });
  document.querySelectorAll(".icon-btn.bag").forEach((link) => {
    link.setAttribute("aria-label", `Cart, ${count} ${count === 1 ? "item" : "items"}`);
  });
}

updateCartCount();
window.addEventListener("cart:updated", updateCartCount);

// ---------- Newsletter (not connected yet) ----------
const newsletterForm = document.getElementById("newsletter-form");
const formMessage = document.getElementById("form-message");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thank you. Newsletter sign-up is not connected yet, so nothing was sent.";
    newsletterForm.reset();
  });
}

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Gentle fade-in while scrolling ----------
ROSEALA.revealOnScroll = (items) => {
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((item) => observer.observe(item));
};

ROSEALA.revealOnScroll(document.querySelectorAll(".reveal"));
