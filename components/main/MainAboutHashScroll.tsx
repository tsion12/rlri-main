"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToCurrentAboutHash } from "@/lib/main-about-scroll";

/** Scroll to `#section` when landing on About Us with a hash (App Router). */
export function MainAboutHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = requestAnimationFrame(scrollToCurrentAboutHash);
    window.addEventListener("hashchange", scrollToCurrentAboutHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToCurrentAboutHash);
    };
  }, [pathname]);

  return null;
}
