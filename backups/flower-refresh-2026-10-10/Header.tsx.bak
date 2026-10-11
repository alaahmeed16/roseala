"use client";

// Announcement bar, logo, main navigation, cart badge and the mobile menu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { LilyMark } from "./LilyMark";

// Which top-level page is current (the old <body data-page="...">).
type ActivePage = "home" | "shop" | "cart" | null;

const links = [
  { id: "home", href: "/", label: "Home" },
  { id: "shop", href: "/shop", label: "Shop" },
  { id: "occasions", href: "/#occasions", label: "Occasions" },
  { id: "bespoke", href: "/#bespoke", label: "Bespoke" },
  { id: "story", href: "/#story", label: "Our Story" },
];

function SiteHeader({ active }: { active: ActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <div className="announcement">
        Complimentary hand delivery on orders over $150
        <span className="announce-extra"> &nbsp;·&nbsp; Every bouquet arrives gift-wrapped</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/" className="logo" aria-label="ROSEALA home">
            <LilyMark />
            <span className="logo-text">
              <span className="logo-name">ROSEALA</span>
              <span className="logo-tagline">Floral Atelier</span>
            </span>
          </Link>

          <nav id="main-nav" className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Main">
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={link.id === active ? "active" : undefined}
                    aria-current={link.id === active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link
              href="/cart"
              className={`icon-btn bag${active === "cart" ? " active" : ""}`}
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={`bag-count${count === 0 ? " is-empty" : ""}`}>{count}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

function activePageFor(pathname: string): ActivePage {
  if (pathname === "/") return "home";
  if (pathname === "/shop" || pathname.startsWith("/product/")) return "shop";
  if (pathname === "/cart") return "cart";
  return null;
}

// Reads the pathname, so it is kept in its own component and wrapped in <Suspense> by the layout.
// `key` remounts the header on every navigation, which also closes the mobile menu
// (the old site got that for free from full page loads).
export function Header() {
  const pathname = usePathname();
  return <SiteHeader key={pathname} active={activePageFor(pathname)} />;
}

// What the header looks like before the pathname is known.
export function HeaderFallback() {
  return <SiteHeader active={null} />;
}
