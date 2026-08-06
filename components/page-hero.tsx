import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/site";

export function PageHero({ locale, eyebrow, title, body }: { locale: Locale; eyebrow: string; title: string; body: string }) {
  const compactTitle = title.length > 44;

  return (
    <section className={`inner-hero${compactTitle ? " inner-hero-compact" : ""}`}>
      <SiteHeader locale={locale} />
      <div className="inner-hero-orbit" aria-hidden="true" />
      <div className="container inner-hero-content">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <div className="inner-hero-rule" />
        <p className="inner-hero-body">{body}</p>
      </div>
    </section>
  );
}
