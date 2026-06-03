"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToAboutAnchor } from "@/lib/main-about-scroll";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  onNavigate?: () => void;
};

function splitHref(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return { path: href, hash: "" };
  return { path: href.slice(0, hashIndex), hash: href.slice(hashIndex + 1) };
}

function isSamePath(pathname: string, path: string): boolean {
  return pathname === path || pathname === `${path}/`;
}

/** About submenu link — scrolls in-page when already on About Us. */
export function MainAboutNavLink({ href, onNavigate, onClick, children, ...props }: Props) {
  const pathname = usePathname();
  const { path, hash } = splitHref(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    onClick?.(e);
    if (e.defaultPrevented || !hash || !isSamePath(pathname, path)) return;

    e.preventDefault();
    const nextUrl = `${path}#${hash}`;
    window.history.pushState(null, "", nextUrl);
    scrollToAboutAnchor(hash);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
