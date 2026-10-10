import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header, HeaderFallback } from "@/components/Header";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ROSEALA — Luxury Floral Atelier",
    template: "%s — ROSEALA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `data-scroll-behavior` lets Next.js turn off the smooth scrolling in globals.css
    // during page changes (pages open at the top, as they did on the old site).
    // `suppressHydrationWarning`: the inline script below adds the `js` class before React hydrates.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js");' }} />
      </head>
      <body>
        <ToastProvider>
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
