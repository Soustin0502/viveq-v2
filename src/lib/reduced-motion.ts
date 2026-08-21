import { useEffect, useState } from "react";

const KEY = "viveq-reduced-motion";
const EVENT = "viveq-reduced-motion-change";

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "true";
}

export function setReducedMotion(value: boolean): void {
  sessionStorage.setItem(KEY, String(value));
  updateRootClass();
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function updateRootClass(): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("reduce-motion", getReducedMotion());
}

export function useReducedMotion(): [boolean, (v: boolean) => void] {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getReducedMotion());
    updateRootClass();
    const handler = () => setEnabled(getReducedMotion());
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  const toggle = (value: boolean) => {
    setEnabled(value);
    setReducedMotion(value);
  };

  return [enabled, toggle];
}
