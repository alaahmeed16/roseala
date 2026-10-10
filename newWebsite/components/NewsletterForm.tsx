"use client";

// Newsletter sign-up (not connected yet: it only shows a message).

import { useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  return (
    <>
      <form
        className="newsletter-form"
        id="newsletter-form"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Thank you. Newsletter sign-up is not connected yet, so nothing was sent.");
          event.currentTarget.reset();
        }}
      >
        <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
        <input type="email" id="newsletter-email" placeholder="Your email address" required />
        <button type="submit">Subscribe</button>
      </form>
      <p className="form-message" id="form-message" role="status">{message}</p>
    </>
  );
}
