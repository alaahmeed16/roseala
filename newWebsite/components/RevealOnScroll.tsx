"use client";

// Gentle fade-in while scrolling. Adds `.visible` to every `.reveal` element once
// it enters the viewport (the styles live in globals.css under `.js .reveal`).

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    // The `js` class is normally set by the inline script in the layout; re-applying it
    // keeps the effect working if React reset <html> (it does that on a dev remount).
    document.documentElement.classList.add("js");

    const items = document.querySelectorAll<HTMLElement>(".reveal");

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
      { threshold: 0.1 },
    );
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return null;
}
