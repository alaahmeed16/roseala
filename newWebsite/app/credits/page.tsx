import type { Metadata } from "next";
import Image from "next/image";
import { photoCredits } from "@/lib/products";

export const metadata: Metadata = {
  title: "Photo Credits",
};

// Built from `photoCredits` in lib/products.ts
export default function CreditsPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow">Thank you</p>
          <h1>Photo Credits</h1>
          <p>
            Temporary product photos from Wikimedia Commons, used under the licences below. They will
            be replaced with ROSEALA&apos;s own photography.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <ul className="credits-list" id="credits-list">
            {photoCredits.map((p) => {
              const credit = p.photo;
              return (
                <li key={p.image}>
                  <Image src={p.image} alt="" width={64} height={80} />
                  <div>
                    <strong>{p.name}</strong>
                    <br />
                    Photo by {credit.author} ·{" "}
                    {credit.licenseUrl ? (
                      <a href={credit.licenseUrl} rel="license noopener" target="_blank">{credit.license}</a>
                    ) : (
                      credit.license
                    )}{" "}
                    · <a href={credit.source} target="_blank" rel="noopener">Source</a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
