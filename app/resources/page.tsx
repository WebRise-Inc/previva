import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calculator, CalendarCheck, CircleUserRound, PiggyBank, Plane, ReceiptText, Scale, ShieldQuestion, WalletCards } from "lucide-react";

import { AppointmentCta } from "@/components/appointment-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { BOOKING_URL, getLocale, localizedHref, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: {
    metadata: { title: "Boîte à outils | Previva", description: "Utilisez les calculateurs financiers et accédez aux ressources utiles recommandées par Previva." },
    hero: { eyebrow: "Boîte à outils", title: "Les bons outils pour éclairer vos décisions financières.", body: "Utilisez les calculateurs et feuilles de travail Previva pour mieux comprendre votre situation financière, sans quitter la plateforme." },
    tools: {
      eyebrow: "Outils recommandés",
      title: "Les quatre outils proposés par Previva",
      body: "Chaque outil est maintenant intégré directement à la plateforme Previva.",
      open: "Utiliser l’outil",
      items: [
        ["Calculatrices financières", "Dix calculateurs pour l’épargne, les emprunts, l’inflation, le REER, les revenus et la retraite.", "10 calculateurs"],
        ["Calculatrice d’impôt", "Estimez votre impôt fédéral et québécois, vos cotisations, votre revenu net et vos taux d’imposition.", "Québec 2025"],
        ["Bilan financier", "Calculez vos avoirs, vos dettes et votre valeur nette, individuellement ou avec votre conjoint.", "Bilan complet"],
        ["Budget", "Évaluez tous les revenus, dépenses, remboursements et épargnes de votre ménage.", "Budget complet"],
      ],
    },
    quickLinks: { eyebrow: "Accès rapides", title: "Vos services et ressources utiles" },
    links: [["Accéder à mon compte", "Consultez votre espace client Beneva en toute sécurité.", "Compte client"], ["Assurance voyage", "Obtenez une protection adaptée avant votre prochain départ.", "Voir les options"], ["Planifier une rencontre", "Choisissez un moment pour discuter de votre situation avec Previva.", "Réserver"]],
    guides: { eyebrow: "Points de départ", title: "Des questions fréquentes, des réponses claires", items: [["REER ou CELI?", "Le bon choix dépend de votre revenu, de votre horizon et de l’utilisation prévue de l’épargne."], ["De combien d’assurance ai-je besoin?", "Votre revenu, vos dettes, vos personnes à charge et vos projets déterminent le niveau de protection pertinent."], ["Quand commencer la retraite?", "Plus tôt vous établissez vos sources de revenus et vos besoins futurs, plus vous avez de leviers pour ajuster votre plan."]] },
  },
  en: {
    metadata: { title: "Toolbox | Previva", description: "Use financial calculators and access useful resources recommended by Previva." },
    hero: { eyebrow: "Toolbox", title: "The right tools to clarify your financial decisions.", body: "Use Previva calculators and worksheets to better understand your financial situation without leaving the platform." },
    tools: {
      eyebrow: "Recommended tools",
      title: "The four tools provided by Previva",
      body: "Each tool is now built directly into the Previva platform.",
      open: "Use tool",
      items: [
        ["Financial calculators", "Ten calculators for savings, loans, inflation, RRSPs, investment income, and retirement.", "10 calculators"],
        ["Tax calculator", "Estimate federal and Québec tax, payroll contributions, net income, and tax rates.", "Québec 2025"],
        ["Financial statement", "Calculate assets, debts, and net worth individually or with your spouse.", "Complete statement"],
        ["Budget", "Review all household income, expenses, debt repayments, and savings.", "Complete budget"],
      ],
    },
    quickLinks: { eyebrow: "Quick access", title: "Your useful services and resources" },
    links: [["Access my account", "Visit your secure Beneva client space.", "Client account"], ["Travel insurance", "Get appropriate protection before your next departure.", "View options"], ["Plan a meeting", "Choose a time to discuss your situation with Previva.", "Book now"]],
    guides: { eyebrow: "Starting points", title: "Common questions, clear answers", items: [["RRSP or TFSA?", "The right choice depends on your income, timeline, and intended use for the savings."], ["How much insurance do I need?", "Your income, debts, dependants, and plans determine an appropriate level of protection."], ["When should retirement planning begin?", "The earlier you map future income and expenses, the more options you have to adjust your plan."]] },
  },
} as const;

const resourceLinks = ["https://client.secure.beneva.ca/", "https://buy.securiglobe.com/", BOOKING_URL];
const resourceIcons = [CircleUserRound, Plane, CalendarCheck];
const guideIcons = [Calculator, ShieldQuestion, CalendarCheck];
const toolLinks = [
  "/resources/calculators",
  "/resources/tax",
  "/resources/financial-statement",
  "/resources/budget",
];
const toolIcons = [PiggyBank, ReceiptText, Scale, WalletCards];

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> {
  return copy[getLocale((await searchParams).lang)].metadata;
}

export default async function ResourcesPage({ searchParams }: LocalizedPageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} {...t.hero} />
      <section className="section external-tools-section">
        <div className="container external-tools-heading">
          <div><p className="eyebrow">{t.tools.eyebrow}</p><h2>{t.tools.title}</h2></div>
          <p>{t.tools.body}</p>
        </div>
        <div className="container external-tool-grid">
          {t.tools.items.map(([title, body, host], index) => {
            const Icon = toolIcons[index];
            return (
              <Link href={localizedHref(toolLinks[index], locale)} key={title}>
                <span className="external-tool-top"><span>0{index + 1}</span><ArrowUpRight /></span>
                <Icon className="external-tool-icon" />
                <h2>{title}</h2>
                <p>{body}</p>
                <span className="external-tool-action">{t.tools.open}<small>{host}</small></span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="section resources-section">
        <div className="container page-section-heading resource-links-heading"><p className="eyebrow">{t.quickLinks.eyebrow}</p><h2>{t.quickLinks.title}</h2></div>
        <div className="container resource-link-grid">
          {t.links.map(([title, body, label], index) => { const Icon = resourceIcons[index]; return <a href={resourceLinks[index]} target="_blank" rel="noreferrer" key={title}><Icon /><ArrowUpRight className="resource-arrow" /><h2>{title}</h2><p>{body}</p><span>{label}</span></a>; })}
        </div>
      </section>
      <section className="section resource-guides-section">
        <div className="container page-section-heading"><p className="eyebrow">{t.guides.eyebrow}</p><h2>{t.guides.title}</h2></div>
        <div className="container guide-grid">{t.guides.items.map(([title, body], index) => { const Icon = guideIcons[index]; return <article key={title}><Icon /><h3>{title}</h3><p>{body}</p></article>; })}</div>
      </section>
      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
