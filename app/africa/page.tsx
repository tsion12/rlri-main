import { redirect } from "next/navigation";

/** Canonical program home is `/`; keep `/africa` as a stable alias. */
export default function AfricaHomeAliasPage() {
  redirect("/");
}
