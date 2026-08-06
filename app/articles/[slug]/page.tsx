import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import { AppointmentCta } from "@/components/appointment-cta";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { articles, getArticle } from "@/lib/articles";
import { getLocale, localizedHref } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

const labels = {
  fr: {
    back: "Tous les articles",
    contents: "Dans cet article",
    conclusion: "À retenir",
    notice: "Ce contenu est fourni à titre informatif seulement et ne remplace pas un conseil financier, fiscal, juridique ou d’assurance adapté à votre situation.",
    next: "Article suivant",
    read: "Continuer la lecture",
  },
  en: {
    back: "All articles",
    contents: "In this article",
    conclusion: "Key takeaway",
    notice: "This content is provided for information only and does not replace financial, tax, legal, or insurance advice tailored to your situation.",
    next: "Next article",
    read: "Continue reading",
  },
} as const;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: ArticlePageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const locale = getLocale((await searchParams).lang);
  const content = article.content[locale];

  return {
    title: `${content.title} | Previva`,
    description: content.excerpt,
    openGraph: {
      type: "article",
      title: content.title,
      description: content.excerpt,
      images: [{ url: article.image }],
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const locale = getLocale((await searchParams).lang);
  const content = article.content[locale];
  const t = labels[locale];
  const currentIndex = articles.findIndex(({ slug }) => slug === article.slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];
  const nextContent = nextArticle.content[locale];

  return (
    <main lang={locale}>
      <PageHero locale={locale} eyebrow={content.category} title={content.title} body={content.excerpt} />

      <section className="section article-detail-section">
        <div className="container article-detail-layout">
          <aside className="article-detail-aside">
            <Link href={localizedHref("/articles", locale)} className="article-back-link"><ArrowLeft />{t.back}</Link>
            <div className="article-facts">
              <span><CalendarDays /><time dateTime={article.publishedAt}>{content.date}</time></span>
              <span><Clock3 />{content.readTime}</span>
            </div>
            <nav aria-label={t.contents}>
              <p>{t.contents}</p>
              {content.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</a>)}
            </nav>
          </aside>

          <article className="article-body">
            <div className="article-lead-image"><Image src={article.image} alt={content.title} fill priority quality={90} sizes="(max-width: 767px) calc(100vw - 80px), 760px" /></div>
            <p className="article-lede">{content.intro}</p>

            {content.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <span className="article-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}

            <div className="article-conclusion">
              <p>{t.conclusion}</p>
              <h2>{content.conclusion}</h2>
            </div>
            <p className="article-notice">{t.notice}</p>
          </article>
        </div>
      </section>

      <section className="section article-next-section">
        <Link href={localizedHref(`/articles/${nextArticle.slug}`, locale)} className="container article-next-link">
          <span>{t.next}</span>
          <div><h2>{nextContent.title}</h2><span>{t.read}<ArrowRight /></span></div>
        </Link>
      </section>

      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
