import { AfricaNewsletterForm } from "./AfricaNewsletterForm";
import { au } from "./africa-ui";

export function AfricaHomeNewsletter() {
  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-home-newsletter-heading">
      <div className={au.home.newsletterShell}>
        <h2 id="africa-home-newsletter-heading" className={au.home.newsletterTitle}>
          Stay in the loop
        </h2>
        <p className={au.home.newsletterLead}>
          Occasional updates on programs, publications, and events—no spam, unsubscribe anytime.
        </p>
        <div className="mt-8 max-w-lg">
          <AfricaNewsletterForm variant="compact" idSuffix="home" />
        </div>
      </div>
    </section>
  );
}
