import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";

/** Local dev: `/main` → `/main/en`. Production uses middleware rewrite to `/main/en`. */
export default function MainIndexRedirect() {
  redirect(`/main/${defaultLocale}`);
}
