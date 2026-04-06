import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";

const sizeClasses = {
  header:
    "h-14 w-auto sm:h-16 md:h-[72px] lg:h-20 xl:h-[5.5rem] max-w-[min(100%,22rem)]",
  footer:
    "h-11 w-auto sm:h-12 md:h-14 max-w-[min(100%,16rem)] lg:max-w-[min(100%,18rem)]",
} as const;

type LogoVariant = keyof typeof sizeClasses;

/**
 * Africa Program lockup — transparent PNG from `scripts/strip-logo-bg.mjs`.
 */
export function AfricaProgramLogo({
  variant = "header",
}: {
  variant?: LogoVariant;
}) {
  const sizesAttr =
    variant === "footer"
      ? "(max-width: 640px) 200px, 260px"
      : "(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px";

  return (
    <Link
      href={africaRoutes.home}
      className="group flex shrink-0 items-center outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
      aria-label="Real Life Research Institute — Africa Program — Home"
    >
      <Image
        src="/assets/africa-program-logo-transparent.png"
        alt="Real Life Research Institute — Africa Program"
        width={1024}
        height={1024}
        priority={variant === "header"}
        quality={95}
        sizes={sizesAttr}
        className={sizeClasses[variant]}
      />
    </Link>
  );
}
