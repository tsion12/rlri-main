import Link from "next/link";
import { au } from "./africa-ui";
import {
  IconMail,
  SocialFacebook,
  SocialInstagram,
  SocialLinkedIn,
  SocialX,
  SocialYouTube,
} from "./africa-icons";
import { AfricaProgramLogo } from "./AfricaProgramLogo";
import { africaRoutes } from "@/lib/africa-routes";

const quickLinks = [
  { label: "Home", href: africaRoutes.home },
  { label: "About", href: africaRoutes.about },
  { label: "Team", href: africaRoutes.team },
  { label: "Volunteers", href: africaRoutes.volunteers },
  { label: "Careers", href: africaRoutes.career },
  { label: "Contact", href: `mailto:contact-africa@reallifeinstitute.org` },
  { label: "Programs", href: africaRoutes.programs },
  { label: "Publications", href: africaRoutes.publications },
  { label: "FAQs", href: africaRoutes.faq },
  { label: "Media Center", href: africaRoutes.media },
  { label: "Get Involved", href: africaRoutes.getInvolved },
] as const;

const social = [
  { label: "Instagram", href: "https://www.instagram.com/rlri.africaprogram/", icon: SocialInstagram },
  { label: "X (Twitter)", href: "https://x.com/rlri_africa", icon: SocialX },
  { label: "LinkedIn", href: "https://www.linkedin.com/showcase/rlri-africa-program/", icon: SocialLinkedIn },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587409661285",
    icon: SocialFacebook,
  },
  { label: "YouTube", href: "https://www.youtube.com/@RealLifeResearchInstitute", icon: SocialYouTube },
] as const;

const legal = [{ label: "Policies", href: africaRoutes.aboutPolicies }] as const;

export function AfricaFooter() {
  return (
    <footer className={au.footer.main}>
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={au.footer.mesh} aria-hidden />
        <div className="relative grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <AfricaProgramLogo variant="footer" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {social.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={au.footer.socialBtn}
                    aria-label={label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h2 className={au.footer.sectionTitle}>Quick links</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map(({ label, href }) => {
                const external =
                  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
                return (
                  <li key={label}>
                    {external ? (
                      <a href={href} className={au.footer.link}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className={au.footer.link}>
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className={au.footer.sectionTitle}>Get in touch</h2>
            <div className="mt-5 rounded-2xl border border-zinc-200/80 bg-white/60 p-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">
              <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400">
                    <IconMail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                      Contact us
                    </p>
                    <a
                      href="mailto:contact-africa@reallifeinstitute.org"
                      className="mt-1 block font-medium text-zinc-800 underline-offset-4 transition hover:text-teal-700 hover:underline dark:text-zinc-200 dark:hover:text-teal-400"
                    >
                      contact-africa@reallifeinstitute.org
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* No mailing list — point visitors to email & events */}
          <div className="lg:col-span-3">
            <h2 className={au.footer.sectionTitle}>Stay in touch</h2>
            <div className="mt-5 rounded-2xl border border-zinc-200/80 bg-white/60 p-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                We don&apos;t offer a newsletter yet. Follow us on social media, browse upcoming events, or email the team.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link
                  href={africaRoutes.upcomingEvents}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-teal-200/80 bg-teal-50 px-4 text-sm font-semibold text-teal-800 transition hover:bg-teal-100 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-200 dark:hover:bg-teal-900/50"
                >
                  Upcoming events
                </Link>
                <a
                  href="mailto:contact-africa@reallifeinstitute.org"
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-teal-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={au.footer.bottomBar}>
        <div className={au.footer.bottomInner}>
          <p className="text-zinc-500">
            © {new Date().getFullYear()} Real Life Institute. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 sm:justify-end">
            {legal.map(({ label, href }, i) => (
              <span key={href} className="inline-flex items-center gap-x-2 sm:gap-x-4">
                {i > 0 && (
                  <span className="text-zinc-500" aria-hidden>
                    ·
                  </span>
                )}
                <a href={href} className={au.footer.legalLink}>
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
