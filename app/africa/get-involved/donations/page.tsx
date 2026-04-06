import { redirect } from "next/navigation";

export default function LegacyDonationsRedirect() {
  redirect("/africa/donate");
}
