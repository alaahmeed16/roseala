"use client";

// Small pop-up message (the old ROSEALA.showToast). Wrap the app once, then call
// `useToast()` from any client component.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext value={showToast}>
      {children}
      <div id="toast" className={`toast${visible ? " show" : ""}`} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext>
  );
}
