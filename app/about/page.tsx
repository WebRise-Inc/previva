import type { Metadata } from "next";
import Image from "next/image";
import { Eye, HandHeart, Medal, MessageCircleHeart, ShieldCheck, Sparkles } from "lucide-react";

import { AppointmentCta } from "@/components/appointment-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: {
    metadata: { title: "À propos | Previva", description: "Découvrez la mission, l’approche et les valeurs de Previva." },
    hero: { eyebrow: "À propos", title: "La confiance commence par une meilleure compréhension.", body: "Previva accompagne les particuliers, les familles et les professionnels avec des solutions financières et d’assurance adaptées à leur réalité." },
    story: { eyebrow: "Notre histoire", title: "Prévoir aujourd’hui pour vivre demain avec confiance.", body: "Le nom Previva réunit deux idées essentielles : prévoir les moments importants de la vie et préserver votre bien-être financier. Cette vision guide chacune de nos recommandations.", bodyTwo: "Nous prenons le temps de comprendre votre situation, vos priorités et vos objectifs avant de proposer une stratégie. Vous avancez ainsi avec des conseils clairs, un plan cohérent et un accompagnement qui évolue avec vous.", alt: "Un conseiller Previva échange avec un couple au sujet de son avenir financier" },
    mission: { eyebrow: "Notre mission", title: "Une protection adaptée à chaque étape de votre vie", body: "Notre mission est de vous offrir les conseils et la protection nécessaires pour prendre des décisions éclairées et assurer votre tranquillité d’esprit, aujourd’hui comme demain.", points: [["Approche personnalisée", "Chaque recommandation part de votre situation réelle."], ["Communication transparente", "Nous expliquons les options avec clarté, sans jargon inutile."], ["Accompagnement continu", "Votre plan est revu et ajusté lorsque votre vie évolue."]] },
    values: { eyebrow: "Ce qui nous guide", title: "Nos valeurs", items: [["Confiance", "Des relations durables fondées sur l’écoute, la transparence et l’intégrité."], ["Excellence", "Un service attentif soutenu par des pratiques rigoureuses et actuelles."], ["Personnalisation", "Des solutions conçues autour de vos besoins, et non l’inverse."], ["Engagement", "Votre protection et votre tranquillité d’esprit demeurent notre priorité."]] },
  },
  en: {
    metadata: { title: "About | Previva", description: "Discover Previva’s mission, approach, and values." },
    hero: { eyebrow: "About us", title: "Trust begins with a better understanding.", body: "Previva supports individuals, families, and professionals with financial and insurance solutions tailored to their reality." },
    story: { eyebrow: "Our story", title: "Plan today so you can face tomorrow with confidence.", body: "The name Previva brings together two essential ideas: anticipating life’s important moments and preserving your financial well-being. That vision guides every recommendation we make.", bodyTwo: "We take time to understand your situation, priorities, and goals before proposing a strategy. You move forward with clear advice, a coherent plan, and support that evolves with you.", alt: "A Previva advisor speaks with a couple about their financial future" },
    mission: { eyebrow: "Our mission", title: "Protection tailored to every stage of your life", body: "Our mission is to provide the advice and protection you need to make informed decisions and maintain peace of mind—today and in the future.", points: [["Personalized approach", "Every recommendation begins with your real situation."], ["Transparent communication", "We explain your options clearly, without unnecessary jargon."], ["Ongoing guidance", "Your plan is reviewed and adjusted as your life changes."]] },
    values: { eyebrow: "What guides us", title: "Our values", items: [["Trust", "Lasting relationships built on listening, transparency, and integrity."], ["Excellence", "Attentive service supported by rigorous and current practices."], ["Personalization", "Solutions designed around your needs—not the other way around."], ["Commitment", "Your protection and peace of mind remain our priority."]] },
  },
} as const;

const valueIcons = [ShieldCheck, Medal, Sparkles, HandHeart];

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> {
  return copy[getLocale((await searchParams).lang)].metadata;
}

export default async function AboutPage({ searchParams }: LocalizedPageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} {...t.hero} />
      <section className="section subpage-story">
        <div className="container split-feature">
          <div className="split-feature-image"><Image src="/images/story-advisor-blue.webp" alt={t.story.alt} fill sizes="(max-width: 767px) 100vw, 52vw" /></div>
          <div className="split-feature-copy"><p className="eyebrow">{t.story.eyebrow}</p><h2>{t.story.title}</h2><p>{t.story.body}</p><p>{t.story.bodyTwo}</p></div>
        </div>
      </section>
      <section className="section mission-section">
        <div className="container mission-layout">
          <div className="mission-intro"><p className="eyebrow">{t.mission.eyebrow}</p><h2>{t.mission.title}</h2><p>{t.mission.body}</p></div>
          <div className="mission-points">
            {t.mission.points.map(([title, body], index) => {
              const Icon = index === 0 ? Eye : index === 1 ? MessageCircleHeart : HandHeart;
              return <article key={title}><Icon /><div><h3>{title}</h3><p>{body}</p></div></article>;
            })}
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container page-section-heading"><p className="eyebrow">{t.values.eyebrow}</p><h2>{t.values.title}</h2></div>
        <div className="container values-grid">
          {t.values.items.map(([title, body], index) => { const Icon = valueIcons[index]; return <article key={title}><Icon /><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>; })}
        </div>
      </section>
      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
