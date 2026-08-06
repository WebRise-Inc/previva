import type { Metadata } from "next";

import { FinancialStatementTool } from "@/components/financial-worksheets";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { getLocale, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: { metadata: { title: "Bilan financier | Previva", description: "Dressez un bilan complet de vos avoirs, dettes et valeur nette." }, hero: { eyebrow: "Boîte à outils", title: "Dressez un portrait complet de votre situation financière.", body: "Calculez vos avoirs, vos dettes et votre valeur nette, seul ou avec votre conjoint. Vos données restent dans votre navigateur." } },
  en: { metadata: { title: "Financial statement | Previva", description: "Create a complete statement of assets, debts, and net worth." }, hero: { eyebrow: "Toolbox", title: "Create a complete picture of your financial position.", body: "Calculate assets, debts, and net worth individually or with your spouse. Your information stays in your browser." } },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> { return copy[getLocale((await searchParams).lang)].metadata; }
export default async function FinancialStatementPage({ searchParams }: LocalizedPageProps) { const locale = getLocale((await searchParams).lang); return <main lang={locale}><PageHero locale={locale} {...copy[locale].hero} /><FinancialStatementTool locale={locale} /><SiteFooter locale={locale} /></main>; }
