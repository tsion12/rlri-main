"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/main/i18n/LocaleProvider";
import { mainBaseFromPathname, mainHref } from "@/lib/i18n/path";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function MainLink({ href, ...props }: Props) {
  const pathname = usePathname();
  const locale = useLocale();
  const base = mainBaseFromPathname(pathname);

  return <Link href={mainHref(href, { base, locale })} {...props} />;
}
