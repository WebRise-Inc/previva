import type { Metadata } from "next";

import { QuebecTaxCalculator } from "@/components/native-calculators";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: { metadata: { title: "Calculatrice d’impôt du Québec | Previva", description: "Estimez votre impôt sur le revenu du Québec pour l’année d’imposition 2025." }, hero: { eyebrow: "Boîte à outils", title: "Estimez votre impôt sur le revenu du Québec.", body: "Entrez vos revenus, cotisations et impôts déjà payés pour obtenir une estimation détaillée pour l’année 2025." } },
  en: { metadata: { title: "Québec tax calculator | Previva", description: "Estimate Québec income tax for the 2025 tax year." }, hero: { eyebrow: "Toolbox", title: "Estimate your Québec income tax.", body: "Enter income, contributions, and tax already paid for a detailed 2025 planning estimate." } },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> { return copy[getLocale((await searchParams).lang)].metadata; }
export default async function TaxPage({ searchParams }: LocalizedPageProps) { const locale = getLocale((await searchParams).lang); return <main lang={locale}><PageHero locale={locale} {...copy[locale].hero} /><QuebecTaxCalculator locale={locale} /><SiteFooter locale={locale} /></main>; }
