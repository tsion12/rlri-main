import { redirect } from "next/navigation";

/** Legacy URL — peer-reviewed papers are no longer a separate section. */
export default function PeerReviewedPapersRedirect() {
  redirect("/africa/publications");
}
