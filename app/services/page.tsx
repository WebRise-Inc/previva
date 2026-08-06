import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Building2, ChartNoAxesCombined, FileHeart, House, Landmark, PiggyBank, ShieldCheck, Umbrella } from "lucide-react";

import { AppointmentCta } from "@/components/appointment-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, getLocale, type LocalizedPageProps } from "@/lib/site";

const serviceImages = ["/images/planning.webp", "/images/wealth.webp", "/images/story-advisor-blue.webp", "/images/insurance.webp"];
const serviceIcons = [Landmark, ChartNoAxesCombined, PiggyBank, Umbrella];
const needIcons = [PiggyBank, House, ShieldCheck, Building2, Landmark, FileHeart];

const copy = {
  fr: {
    metadata: { title: "Services | Previva", description: "Planification de la retraite, patrimoine, placements et assurance personnelle avec Previva." },
    hero: { eyebrow: "Nos services", title: "Des stratégies financières pensées pour votre vie.", body: "De la retraite à l’assurance personnelle, Previva réunit vos priorités dans une stratégie claire, personnalisée et durable." },
    pillars: { eyebrow: "Solutions principales", title: "Un accompagnement complet, au même endroit", items: [["Planification de la retraite", "Préparez une retraite stable en coordonnant vos revenus, votre épargne, vos régimes et vos objectifs de vie."], ["Gestion de patrimoine", "Protégez, développez et structurez votre patrimoine avec une stratégie adaptée à votre horizon et à votre tolérance au risque."], ["Épargne et placements", "Faites travailler vos REER, CELI et autres placements de façon cohérente avec vos projets à court et à long terme."], ["Assurance personnelle", "Protégez votre famille, vos revenus et vos projets grâce à des solutions d’assurance vie, invalidité et maladies graves."]] },
    needs: { eyebrow: "Vos besoins", title: "Des conseils pour les décisions qui comptent", body: "Que vous souhaitiez protéger votre famille, acheter une propriété ou préparer votre retraite, nous vous aidons à comprendre vos options et à choisir une stratégie adaptée.", items: [["Cotisations REER et CELI", "Organiser vos contributions selon vos objectifs et votre situation fiscale."], ["Assurance vie hypothécaire", "Comparer la protection liée au prêt avec une couverture personnelle plus flexible."], ["Vie, invalidité et maladies graves", "Préserver la stabilité financière de votre famille en cas d’imprévu."], ["Achat ou refinancement immobilier", "Intégrer votre projet immobilier à l’ensemble de votre plan financier."], ["Analyse de retraite", "Évaluer vos revenus futurs, vos régimes et les ajustements nécessaires."], ["Stratégie financière personnalisée", "Réunir assurance, placements et objectifs dans un plan cohérent."]] },
    button: "Discuter de vos objectifs",
  },
  en: {
    metadata: { title: "Services | Previva", description: "Retirement planning, wealth, investments, and personal insurance with Previva." },
    hero: { eyebrow: "Our services", title: "Financial strategies designed for your life.", body: "From retirement to personal insurance, Previva brings your priorities together in a clear, personalized, and lasting strategy." },
    pillars: { eyebrow: "Core solutions", title: "Complete guidance, all in one place", items: [["Retirement planning", "Prepare for a stable retirement by coordinating your income, savings, plans, and lifestyle goals."], ["Wealth management", "Protect, grow, and structure your assets with a strategy suited to your horizon and risk tolerance."], ["Savings and investments", "Make your RRSP, TFSA, and other investments work together for your short- and long-term plans."], ["Personal insurance", "Protect your family, income, and plans with life, disability, and critical illness insurance solutions."]] },
    needs: { eyebrow: "Your needs", title: "Advice for the decisions that matter", body: "Whether you want to protect your family, purchase a property, or prepare for retirement, we help you understand your options and choose an appropriate strategy.", items: [["RRSP and TFSA contributions", "Organize contributions around your goals and tax situation."], ["Mortgage life insurance", "Compare lender coverage with more flexible personal protection."], ["Life, disability, and critical illness", "Preserve your family’s financial stability when the unexpected happens."], ["Home purchase or refinancing", "Integrate your real-estate project into your complete financial plan."], ["Retirement analysis", "Review future income, pension plans, and the adjustments you may need."], ["Personalized financial strategy", "Bring insurance, investments, and goals together in one coherent plan."]] },
    button: "Discuss your goals",
  },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> {
  return copy[getLocale((await searchParams).lang)].metadata;
}

export default async function ServicesPage({ searchParams }: LocalizedPageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} {...t.hero} />
      <section className="section service-page-section">
        <div className="container page-section-heading"><p className="eyebrow">{t.pillars.eyebrow}</p><h2>{t.pillars.title}</h2></div>
        <div className="container service-pillar-grid">
          {t.pillars.items.map(([title, body], index) => { const Icon = serviceIcons[index]; return (
            <article className="service-pillar" key={title}>
              <div className="service-pillar-image"><Image src={serviceImages[index]} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" /></div>
              <div className="service-pillar-copy"><Icon /><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>
            </article>
          ); })}
        </div>
      </section>
      <section className="section needs-section">
        <div className="container needs-layout">
          <div className="needs-intro"><p className="eyebrow">{t.needs.eyebrow}</p><h2>{t.needs.title}</h2><p>{t.needs.body}</p><Button asChild><a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.button} <ArrowRight className="size-4" /></a></Button></div>
          <div className="needs-grid">{t.needs.items.map(([title, body], index) => { const Icon = needIcons[index]; return <article key={title}><Icon /><div><h3>{title}</h3><p>{body}</p></div></article>; })}</div>
        </div>
      </section>
      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
