import type { Metadata } from "next";

import { BudgetTool } from "@/components/financial-worksheets";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: { metadata: { title: "Budget | Previva", description: "Préparez un budget détaillé pour vous, votre conjoint et votre ménage." }, hero: { eyebrow: "Boîte à outils", title: "Voyez clairement où va l’argent de votre ménage.", body: "Additionnez vos revenus, vos dépenses, vos remboursements de dettes et votre épargne pour calculer votre surplus ou déficit." } },
  en: { metadata: { title: "Budget | Previva", description: "Prepare a detailed budget for you, your spouse, and your household." }, hero: { eyebrow: "Toolbox", title: "See clearly where your household money goes.", body: "Add income, expenses, debt repayments, and savings to calculate your household surplus or deficit." } },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> { return copy[getLocale((await searchParams).lang)].metadata; }
export default async function BudgetPage({ searchParams }: LocalizedPageProps) { const locale = getLocale((await searchParams).lang); return <main lang={locale}><PageHero locale={locale} {...copy[locale].hero} /><BudgetTool locale={locale} /><SiteFooter locale={locale} /></main>; }
