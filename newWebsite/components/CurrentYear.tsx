"use client";

import { useSyncExternalStore } from "react";

const subscribeNever = () => () => {};

// The year is read in the browser (like the old footer script). It is empty in the
// prerendered HTML, because the build must not bake in the date it ran on.
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribeNever,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <span id="year">{year}</span>;
}
