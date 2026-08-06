import { ArrowRight, CircleDollarSign, HeartHandshake, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BOOKING_URL, type Locale } from "@/lib/site";

const copy = {
  fr: {
    title: "Assurez votre avenir dès aujourd’hui",
    body: "Commencez avec un plan financier personnalisé qui protège ce qui compte et garde vos objectifs à portée de main.",
    button: "Prendre rendez-vous",
  },
  en: {
    title: "Secure Your Tomorrow, Today",
    body: "Get started with a personalized financial plan that protects what matters and keeps your goals within reach.",
    button: "Book an appointment",
  },
} as const;

export function AppointmentCta({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="section cta-section" id="contact">
      <div className="container cta-card">
        <div className="cta-copy">
          <h2>{t.title}</h2>
          <p>{t.body}</p>
          <Button asChild size="lg" variant="inverse" className="cta-button">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.button} <ArrowRight className="size-4" /></a>
          </Button>
        </div>
        <div className="cta-art" aria-hidden="true"><HeartHandshake /><ShieldCheck /><CircleDollarSign /></div>
      </div>
    </section>
  );
}
