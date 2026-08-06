import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  Landmark,
  MessageSquareText,
  PiggyBank,
  Sparkles,
  Star,
  TrendingUp,
  Umbrella,
  UserRoundCheck,
} from "lucide-react";

import { AppointmentCta } from "@/components/appointment-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, getLocale, localizedHref, type LocalizedPageProps as PageProps } from "@/lib/site";

const serviceIcons = [Landmark, TrendingUp, PiggyBank, Umbrella];
const processIcons = [MessageSquareText, FileCheck2, Sparkles, UserRoundCheck];
const articleImages = ["/images/blog-tax.jpg", "/images/blog-budget.jpg", "/images/blog-education.avif"];
const googleReviews = [
  {
    name: "Isabelle Miguel",
    image: "/images/reviews/isabelle-miguel.png",
    review: "Très bon conseiller. Je le recommande 100%",
  },
  {
    name: "Sandra Lalancette",
    image: "/images/reviews/sandra-lalancette.png",
    review: "Professionnalisme, écoute et disponibilité!",
  },
  {
    name: "mario nehme",
    image: "/images/reviews/mario-nehme.png",
    review: "Excellent service , très à l’écoute et gentillesse exceptionnelle.",
  },
  {
    name: "Cha Hey",
    image: "/images/reviews/cha-hey.png",
    review: "Très bon service et très professionnel.",
  },
  {
    name: "Nathalie Boulanger",
    image: "/images/reviews/nathalie-boulanger.png",
    review: "Excellent service, arrive bien préparée pour nos rencontres et prends le temps de répondre à mes questions.",
  },
  {
    name: "Mériem Mennai",
    image: "/images/reviews/meriem-mennai.png",
    review: "Henry est un conseiller sérieux, rigoureux dans sa démarche et facilement accessible. Il prend le temps avec ses clients pour les guider dans leur planification financière. N'hésitez pas à le choisir comme conseiller, vous ne le regretterez pas.",
  },
  {
    name: "Daniela Giudice",
    image: "/images/reviews/daniela-giudice.png",
    review: "Henry Khawam est un conseiller professionnel de premier ordre. À l'écoute des besoins et des demandes, ses suggestions de produits et de services sont pertinentes et avisées. Courtois et calme, il transmet patiemment les informations sans hésiter à les répéter lorsque subtiles ou plus abstraites à comprendre. Respectueux, efficace et consciencieux, je recommande chaleureusement ses services.",
  },
] as const;

const copy = {
  fr: {
    metadata: {
      title: "Previva | Protégez votre avenir financier",
      description: "Des solutions financières et d’assurance personnalisées pour bâtir une stabilité durable et planifier l’avenir en toute confiance.",
    },
    hero: {
      alt: "Un couple envisage son avenir financier avec confiance",
      title: "Protégez votre avenir.",
      body: "Des solutions financières et d’assurance personnalisées pour bâtir une stabilité durable, protéger votre famille et planifier l’avenir en toute confiance.",
      cta: "Commencer avec Previva",
    },
    services: {
      eyebrow: "Ce que nous offrons",
      title: "Des solutions financières conçues autour de vous",
      items: [
        ["Planification de la retraite", "Préparez votre retraite avec une stratégie adaptée à vos objectifs, à votre style de vie et à votre avenir financier."],
        ["Gestion de patrimoine", "Des stratégies personnalisées pour protéger, faire croître et optimiser votre patrimoine au fil du temps."],
        ["Épargne et placements", "Découvrez des solutions d’épargne et de placement alignées sur les étapes importantes de votre vie."],
        ["Assurance personnelle", "Des protections sur mesure pour sécuriser votre avenir et celui des personnes qui vous sont chères."],
      ],
    },
    why: {
      eyebrow: "Pourquoi Previva",
      title: "Un accompagnement financier adapté à vos objectifs",
      body: "La planification financière devrait être simple, transparente et personnelle. Nous accompagnons les particuliers, les familles, les professionnels et les employés du secteur public avec des stratégies qui protègent leur avenir financier à chaque étape de la vie.",
      cta: "Découvrir nos services",
      imageAlt: "Un client confiant dans son avenir financier",
      stat: "Un plan clair donne du poids à chaque décision financière.",
      reasons: [
        ["ACCOMPAGNEMENT PERSONNALISÉ", "Des conseils fondés sur vos objectifs, vos priorités et votre réalité financière."],
        ["STRATÉGIES CLAIRES", "Des recommandations simples, expliquées dans un langage facile à comprendre."],
        ["PROTECTION FAMILIALE", "Des solutions d’assurance conçues pour protéger les personnes et les projets qui comptent."],
        ["VISION À LONG TERME", "Un plan financier qui évolue avec vous à chaque étape importante de votre vie."],
        ["CONSEILS DE CONFIANCE", "Un accompagnement attentif offert par une équipe expérimentée et disponible."],
        ["PLANIFICATION COMPLÈTE", "Assurance, placements et retraite réunis dans une stratégie cohérente."],
      ],
    },
    process: {
      eyebrow: "Comment ça fonctionne",
      title: "Un parcours simple vers la confiance financière",
      body: "De la première conversation à la mise en œuvre de votre plan, chaque étape est conçue pour être claire, personnelle et facile à suivre.",
      cta: "Prendre rendez-vous",
      steps: [
        ["01", "Parlez-nous de vos objectifs", "Nous commençons par une conversation ciblée sur votre famille, vos priorités, vos préoccupations et vos projets."],
        ["02", "Faisons le point sur vos finances", "Votre conseiller analyse les détails, repère les écarts et présente les possibilités qui s’offrent à vous."],
        ["03", "Construisons votre stratégie", "Nous vous présentons des recommandations claires et personnalisées en assurance, en épargne et en retraite."],
        ["04", "Avancez avec confiance", "Votre plan est mis en œuvre avec un suivi continu afin qu’il puisse évoluer avec votre vie."],
      ],
    },
    story: {
      alt: "Un conseiller financier accompagne un couple dans la planification de son avenir",
    },
    reviews: {
      eyebrow: "Avis Google",
      title: "Ce que nos clients disent de Previva",
      rating: "5 étoiles sur 5",
      source: "Avis Google",
      summary: "D’après 114 avis Google",
      languageNote: "Avis affichés dans leur langue originale.",
    },
    articles: {
      eyebrow: "De notre blogue",
      title: "Conseils et actualités",
      date: "14 mai 2026",
      read: "Lire l’article",
      items: [
        ["Affaires", "Comment planifier vos paiements d’impôts ?"],
        ["Finance", "Comment créer un budget ?"],
        ["Finance", "Pourquoi l’éducation financière est-elle importante ?"],
      ],
    },
    cta: {
      title: "Assurez votre avenir dès aujourd’hui",
      body: "Commencez avec un plan financier personnalisé qui protège ce qui compte et garde vos objectifs à portée de main.",
      button: "Prendre rendez-vous",
    },
    footer: {
      tagline: "Votre partenaire en planification financière.",
      homeLabel: "Accueil Previva",
      navigation: "Navigation",
      nav: ["Accueil", "À propos", "Services", "Articles"],
      solutions: "Solutions",
      solutionLinks: ["Planification de la retraite", "Gestion de patrimoine", "Épargne et placements", "Assurance personnelle"],
      contact: "Nous joindre",
      copyright: "Préviva © 2026. Tous droits réservés.",
      legalOne: "Les renseignements fournis sur ce site sont présentés à titre informatif seulement et ne constituent pas des conseils professionnels, une offre de vente ni une sollicitation de produits d’assurance. La disponibilité, les modalités et l’admissibilité sont assujetties à l’approbation de Previva et de ses partenaires assureurs. Consultez un conseiller en assurance autorisé pour obtenir un accompagnement personnalisé.",
      legalTwo: "Previva s’efforce d’assurer l’exactitude des renseignements présentés sur ce site, sans toutefois garantir qu’ils sont complets ou à jour. Les produits financiers et d’assurance comportent des risques et les résultats peuvent varier.",
    },
  },
  en: {
    metadata: {
      title: "Previva | Protect Your Financial Future",
      description: "Personalized financial and insurance solutions for lasting stability and peace of mind.",
    },
    hero: {
      alt: "A couple looking confidently toward their financial future",
      title: "Protect Your Future.",
      body: "Personalized financial and insurance solutions to help you build lasting stability, protect your family, and plan with complete confidence.",
      cta: "Get started with Previva",
    },
    services: {
      eyebrow: "What we offer",
      title: "Financial Solutions Crafted Around You",
      items: [
        ["Retirement Planning", "Prepare for retirement with a strategy tailored to your goals, lifestyle, and financial future."],
        ["Wealth Management", "Personalized strategies created to protect, grow, and optimize your assets over time."],
        ["Savings & Investments", "Discover savings and investment solutions aligned with the milestones that matter to you."],
        ["Personal Insurance", "Customized protection designed to secure your future and the people you care about most."],
      ],
    },
    why: {
      eyebrow: "Why Previva",
      title: "Financial Support Tailored to Your Goals",
      body: "Financial planning should be simple, transparent, and personal. We support individuals, families, professionals, and public-sector employees with strategies that protect their financial future at every stage of life.",
      cta: "Explore our services",
      imageAlt: "A client enjoying confidence in his financial future",
      stat: "A clear plan makes every financial decision count.",
      reasons: [
        ["PERSONALIZED GUIDANCE", "Advice grounded in your goals, priorities, and real financial picture."],
        ["CLEAR STRATEGIES", "Straightforward recommendations explained in language you can understand."],
        ["FAMILY PROTECTION", "Insurance solutions designed to protect the people and plans that matter."],
        ["LONG-TERM THINKING", "A financial plan built to evolve through every important stage of life."],
        ["TRUSTED ADVICE", "Responsive support from an experienced and attentive advisory team."],
        ["COMPLETE PLANNING", "Insurance, investments, and retirement planning brought together in one place."],
      ],
    },
    process: {
      eyebrow: "How it works",
      title: "A Simple Path to Financial Confidence",
      body: "From your first conversation to the implementation of your plan, every step is designed to be clear, personal, and easy to follow.",
      cta: "Book an appointment",
      steps: [
        ["01", "Tell us about your goals", "We begin with a focused conversation about your family, priorities, concerns, and future plans."],
        ["02", "Review your financial picture", "Your advisor looks at the details, identifies gaps, and maps the opportunities available to you."],
        ["03", "Build your strategy", "We present clear, personalized recommendations across insurance, savings, and retirement planning."],
        ["04", "Move forward with confidence", "Your plan is implemented with ongoing guidance so it can keep pace as your life changes."],
      ],
    },
    story: {
      alt: "A financial advisor helps a couple plan their future",
    },
    reviews: {
      eyebrow: "Google reviews",
      title: "What clients say about Previva",
      rating: "5 out of 5 stars",
      source: "Google review",
      summary: "Based on 114 Google reviews",
      languageNote: "Reviews are shown in their original language.",
    },
    articles: {
      eyebrow: "From our blog",
      title: "Insights & Updates",
      date: "May 14, 2026",
      read: "Read article",
      items: [
        ["Business", "How to plan your tax payments?"],
        ["Finance", "How to create a budget?"],
        ["Finance", "Why is financial education important?"],
      ],
    },
    cta: {
      title: "Secure Your Tomorrow, Today",
      body: "Get started with a personalized financial plan that protects what matters and keeps your goals within reach.",
      button: "Book an appointment",
    },
    footer: {
      tagline: "Your financial planning partner.",
      homeLabel: "Previva home",
      navigation: "Navigation",
      nav: ["Home", "About us", "Services", "Articles"],
      solutions: "Solutions",
      solutionLinks: ["Retirement planning", "Wealth management", "Savings & investments", "Personal insurance"],
      contact: "Contact",
      copyright: "Préviva © 2026. All rights reserved.",
      legalOne: "The information provided on this website is for informational purposes only and does not constitute professional advice, an offer to sell, or a solicitation of insurance products. Coverage availability, terms, and eligibility are subject to approval by Previva and its underwriting partners. Please consult a licensed insurance advisor for personalized support.",
      legalTwo: "Previva strives to ensure the accuracy of the information on this site but does not guarantee its completeness or timeliness. Financial and insurance products involve risk, and results may vary.",
    },
  },
} as const;

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocale((await searchParams).lang);
  return copy[locale].metadata;
}

export default async function Home({ searchParams }: PageProps) {
  const locale = getLocale((await searchParams).lang);
  const t = copy[locale];

  return (
    <main lang={locale}>
      <section className="hero" id="home">
        <picture className="hero-picture">
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.webp" />
          <Image className="hero-image" src="/images/hero-previva-blue.png" alt={t.hero.alt} fill priority quality={90} sizes="100vw" />
        </picture>
        <div className="hero-shade" />
        <SiteHeader locale={locale} />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1>{t.hero.title}</h1>
            <p>{t.hero.body}</p>
            <Button asChild size="lg" className="hero-button">
              <Link href={localizedHref("/contact", locale)}>{t.hero.cta} <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container service-content">
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
          <div className="service-grid">
            {t.services.items.map(([title, description], index) => {
              const Icon = serviceIcons[index];
              return (
                <Link className="service-card" href={localizedHref("/services", locale)} key={title}>
                  <div className="service-card-top">
                    <Icon className="service-main-icon" strokeWidth={1.45} />
                    <span className="service-arrow"><ArrowUpRight className="size-5" /></span>
                  </div>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section why-section" id="about">
        <div className="container why-top">
          <div className="why-copy">
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
            <p>{t.why.body}</p>
            <Button asChild variant="outline" className="dark-outline-button">
              <Link href={localizedHref("/services", locale)}>{t.why.cta} <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          <div className="why-image-wrap">
            <Image src="/images/planning.webp" alt={t.why.imageAlt} fill quality={90} sizes="(max-width: 767px) calc(100vw - 80px), 48vw" />
            <div className="why-stat">{t.why.stat}</div>
          </div>
        </div>
        <div className="container reason-grid">
          {t.why.reasons.map(([title, body], index) => (
            <div className="reason-item" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="container process-layout">
          <div className="process-intro">
            <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
            <p>{t.process.body}</p>
            <Button asChild><a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.process.cta} <ArrowRight className="size-4" /></a></Button>
          </div>
          <div className="process-list">
            {t.process.steps.map(([number, title, body], index) => {
              const ProcessIcon = processIcons[index];
              return (
                <div className="process-row" key={number}>
                  <span className="process-number">{number}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                  <ProcessIcon className="process-icon" strokeWidth={1.4} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container story-image-wrap">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/story-advisor-mobile.webp" />
            <Image src="/images/story-advisor-blue.webp" alt={t.story.alt} fill quality={90} sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1140px) 100vw, 1080px" />
          </picture>
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="container reviews-content">
          <div className="reviews-heading-row">
            <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
            <div className="reviews-proof">
              <div className="google-review-summary">
                <Image src="/images/reviews/google-g.png" alt="Google" width={34} height={34} />
                <div>
                  <div className="review-stars" aria-label={t.reviews.rating}>
                    {Array.from({ length: 5 }).map((_, index) => <Star className="size-4 fill-current" key={index} />)}
                  </div>
                  <span>{t.reviews.summary}</span>
                </div>
              </div>
              <p className="review-language-note">{t.reviews.languageNote}</p>
            </div>
          </div>
          <div className="review-grid">
            {googleReviews.map(({ name, image, review }) => (
              <article className="google-review" key={name}>
                <header>
                  <Image className="review-avatar" src={image} alt={locale === "fr" ? `Photo de profil Google de ${name}` : `Google profile photo of ${name}`} width={64} height={64} quality={90} />
                  <div className="review-author">
                    <strong>{name}</strong>
                    <span><Image src="/images/reviews/google-g.png" alt="" width={15} height={15} />{t.reviews.source}</span>
                  </div>
                  <div className="review-stars" aria-label={t.reviews.rating}>
                    {Array.from({ length: 5 }).map((_, starIndex) => <Star className="size-4 fill-current" key={starIndex} />)}
                  </div>
                </header>
                <blockquote lang="fr">“{review}”</blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section articles-section" id="articles">
        <div className="container article-content">
          <SectionHeading eyebrow={t.articles.eyebrow} title={t.articles.title} />
          <div className="article-grid">
            {t.articles.items.map(([category, title], index) => (
              <Link href={localizedHref("/articles", locale)} className="article-card" key={title}>
                <div className="article-image"><Image src={articleImages[index]} alt={title} fill quality={90} sizes="(max-width: 767px) calc(100vw - 80px), 33vw" /></div>
                <div className="article-meta"><span>{t.articles.date}</span><span>{category}</span></div>
                <h3>{title}</h3>
                <span className="article-link">{t.articles.read} <ArrowUpRight className="size-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCta locale={locale} />
      <SiteFooter locale={locale} />
    </main>
  );
}
