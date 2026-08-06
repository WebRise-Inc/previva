import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AppointmentCta } from "@/components/appointment-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/lib/articles";
import { getLocale, localizedHref, type LocalizedPageProps } from "@/lib/site";

const copy = {
  fr: {
    metadata: { title: "Articles | Previva", description: "Conseils Previva sur la retraite, l’assurance, les placements et les projets financiers." },
    hero: { eyebrow: "Conseils et actualités", title: "Mieux comprendre pour mieux décider.", body: "Des articles pratiques pour vous aider à naviguer la retraite, l’assurance, l’épargne et les grandes étapes de votre vie financière." },
    read: "Lire l’article",
  },
  en: {
    metadata: { title: "Articles | Previva", description: "Previva insights on retirement, insurance, investments, and financial milestones." },
    hero: { eyebrow: "Insights and updates", title: "Understand more. Decide with confidence.", body: "Practical articles to help you navigate retirement, insurance, savings, and the important stages of your financial life." },
    read: "Read article",
  },
} as const;

export async function generateMetadata({ searchParams }: LocalizedPageProps): Promise<Metadata> {
  return copy[getLocale((await searchParams).lang)].metadata;
}

export default async function ArticlesPage({ searchParams }: LocalizedPageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} {...t.hero} />
      <section className="section article-index-section">
        <div className="container article-index-grid">
          {articles.map((article) => {
            const content = article.content[locale];
            return (
              <Link className="article-index-card" href={localizedHref(`/articles/${article.slug}`, locale)} key={article.slug}>
                <div className="article-index-image"><Image src={article.image} alt={content.title} fill quality={90} sizes="(max-width: 767px) calc(100vw - 80px), 33vw" /></div>
                <div className="article-index-meta"><span>{content.category}</span><span>{content.date}</span></div>
                <h2>{content.title}</h2>
                <p className="article-index-excerpt">{content.excerpt}</p>
                <span className="article-index-read">{t.read}<ArrowUpRight /></span>
              </Link>
            );
          })}
        </div>
      </section>
      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
