"use client";

import { useCallback, useEffect, useState } from "react";

export function useAutoplayIndex(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    if (length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
      setGeneration((n) => n + 1);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [length, intervalMs]);

  const goTo = useCallback(
    (next: number) => {
      if (length <= 1) return;
      setIndex(((next % length) + length) % length);
      setGeneration((n) => n + 1);
    },
    [length],
  );

  return { index, generation, goTo };
}
