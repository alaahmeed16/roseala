import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser, ShopFallback } from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop Flowers",
  description: "Shop luxury bouquets, roses, lilies, peonies, bridal flowers and orchids from ROSEALA.",
};

export default function ShopPage() {
  // ShopBrowser reads the filters from the address, so it renders in the browser;
  // the unfiltered shop is what the prerendered HTML contains until then.
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopBrowser />
    </Suspense>
  );
}
