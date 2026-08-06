import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: {
    metadata: { title: "Contact | Previva", description: "Communiquez avec Previva ou réservez une rencontre avec un conseiller." },
    hero: { eyebrow: "Nous joindre", title: "Parlons de ce que vous voulez protéger et accomplir.", body: "Une première conversation suffit pour clarifier vos priorités et déterminer les prochaines étapes de votre plan financier." },
    details: { eyebrow: "Coordonnées", title: "Previva est à votre écoute", body: "Communiquez avec nous par courriel ou par téléphone, ou planifiez directement une rencontre au moment qui vous convient.", address: "201–1950, rue Maurice-Gauvin, Laval, Québec H7S 1Z2", booking: "Réserver une rencontre" },
    form: { eyebrow: "Écrivez-nous", title: "Comment pouvons-nous vous aider?", name: "Nom", email: "Adresse courriel", phone: "Téléphone", subject: "Sujet", message: "Votre message", send: "Préparer le courriel", note: "Le bouton ouvrira votre application de courriel avec votre message." },
  },
  en: {
    metadata: { title: "Contact | Previva", description: "Contact Previva or book a meeting with an advisor." },
    hero: { eyebrow: "Contact", title: "Let’s talk about what you want to protect and achieve.", body: "One conversation can clarify your priorities and identify the next steps in your financial plan." },
    details: { eyebrow: "Contact details", title: "Previva is here to listen", body: "Reach us by email or phone, or schedule a meeting directly at a time that works for you.", address: "201–1950 Maurice-Gauvin Street, Laval, Quebec H7S 1Z2", booking: "Book a meeting" },
    form: { eyebrow: "Write to us", title: "How can we help?", name: "Name", email: "Email address", phone: "Phone", subject: "Subject", message: "Your message", send: "Prepare email", note: "The button will open your email application with your message." },
  },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> {
  return copy[getLocale((await searchParams).lang)].metadata;
}

export default async function ContactPage({ searchParams }: LocalizedPageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} {...t.hero} />
      <section className="section contact-page-section">
        <div className="container contact-page-layout">
          <div className="contact-details"><p className="eyebrow">{t.details.eyebrow}</p><h2>{t.details.title}</h2><p>{t.details.body}</p><div className="contact-methods"><a href="mailto:info@previva.ca"><Mail /><span><small>Email</small>info@previva.ca</span></a><a href="tel:+15145134424"><Phone /><span><small>{locale === "fr" ? "Téléphone" : "Phone"}</small>+1 514 513 4424</span></a><div><MapPin /><span><small>{locale === "fr" ? "Adresse" : "Address"}</small>{t.details.address}</span></div></div><Button asChild><a href={BOOKING_URL} target="_blank" rel="noreferrer"><CalendarCheck className="size-4" />{t.details.booking}</a></Button></div>
          <form className="contact-form" action="mailto:info@previva.ca" method="post" encType="text/plain">
            <p className="eyebrow">{t.form.eyebrow}</p><h2>{t.form.title}</h2>
            <div className="form-grid"><label>{t.form.name}<input name="name" required /></label><label>{t.form.email}<input type="email" name="email" required /></label><label>{t.form.phone}<input type="tel" name="phone" /></label><label>{t.form.subject}<input name="subject" required /></label><label className="form-message">{t.form.message}<textarea name="message" rows={6} required /></label></div>
            <Button type="submit">{t.form.send} <ArrowRight className="size-4" /></Button><small className="form-note">{t.form.note}</small>
          </form>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
