import type { Metadata } from "next";

import { FinancialCalculatorSuite } from "@/components/native-calculators";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: { metadata: { title: "Calculatrices financières | Previva", description: "Dix calculatrices financières pour explorer l’épargne, les emprunts, l’inflation, le REER et la retraite." }, hero: { eyebrow: "Boîte à outils", title: "Dix calculatrices pour mieux comprendre vos options.", body: "Reproduisez les scénarios d’épargne, d’emprunt, de revenu, d’inflation et de retraite directement dans Previva." } },
  en: { metadata: { title: "Financial calculators | Previva", description: "Ten calculators for savings, loans, inflation, RRSP planning, income, and retirement." }, hero: { eyebrow: "Toolbox", title: "Ten calculators to better understand your options.", body: "Explore savings, loan, income, inflation, RRSP, and retirement scenarios directly in Previva." } },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> { return copy[getLocale((await searchParams).lang)].metadata; }
export default async function CalculatorsPage({ searchParams }: LocalizedPageProps) { const locale = getLocale((await searchParams).lang); return <main lang={locale}><PageHero locale={locale} {...copy[locale].hero} /><FinancialCalculatorSuite locale={locale} /><SiteFooter locale={locale} /></main>; }
