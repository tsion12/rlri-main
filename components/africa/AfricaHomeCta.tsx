import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { au } from "./africa-ui";

export function AfricaHomeCta() {
  return (
    <section className={au.home.ctaBand} aria-labelledby="africa-cta-heading">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(45,212,191,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className={au.home.ctaInner}>
        <h2 id="africa-cta-heading" className={au.home.ctaTitle}>
          Shape the next chapter
        </h2>
        <p className={au.home.ctaLead}>
          Your support fuels youth-led research and community programs. Join an event or help fund the work.
        </p>
        <div className={au.home.ctaRow}>
          <Link href={africaRoutes.donate} className={au.home.ctaPrimary}>
            Donate
          </Link>
          <Link href={africaRoutes.events} className={au.home.ctaGhost}>
            Upcoming events
          </Link>
        </div>
      </div>
    </section>
  );
}
