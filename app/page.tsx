import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";

/** Temporary: africa home removed; Step 5 will serve locale routes at `/`. */
export default function Home() {
  redirect(`/main/${defaultLocale}`);
}
