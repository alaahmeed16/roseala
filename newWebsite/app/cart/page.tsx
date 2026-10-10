import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">Your Selection</p>
          <h1>Shopping Cart</h1>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container" id="cart-root">
          <CartView />
        </div>
      </section>
    </>
  );
}
