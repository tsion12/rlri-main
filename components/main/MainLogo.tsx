"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/main/i18n/LocaleProvider";
import { mainBaseFromPathname, mainHref } from "@/lib/i18n/path";
import { MAIN_LOGO_SRC } from "@/lib/main-assets";
import { mainRoutes } from "@/lib/main-routes";

const sizeClasses = {
  header:
    "h-14 w-auto sm:h-16 md:h-20 lg:h-24 xl:h-28 max-w-[min(100%,20rem)] sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[28rem]",
  footer:
    "h-16 w-auto sm:h-20 md:h-24 lg:h-28 max-w-[min(100%,20rem)] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem]",
} as const;

type LogoVariant = keyof typeof sizeClasses;

export function MainLogo({ variant = "header" }: { variant?: LogoVariant }) {
  const pathname = usePathname();
  const locale = useLocale();
  const base = mainBaseFromPathname(pathname);

  const sizesAttr =
    variant === "footer"
      ? "(max-width: 640px) 320px, (max-width: 1024px) 400px, 480px"
      : "(max-width: 640px) 300px, (max-width: 1024px) 400px, 480px";

  return (
    <Link
      href={mainHref(mainRoutes.home, { base, locale })}
      className="group flex shrink-0 items-center outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      aria-label="Real Life Research Institute — Home"
    >
      <Image
        src={MAIN_LOGO_SRC}
        alt="Real Life Research Institute"
        width={4375}
        height={4375}
        priority={variant === "header"}
        quality={95}
        sizes={sizesAttr}
        className={sizeClasses[variant]}
      />
    </Link>
  );
}
