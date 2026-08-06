import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { localizedHref, type Locale } from "@/lib/site";

const copy = {
  fr: {
    tagline: "Votre partenaire en planification financière.",
    homeLabel: "Accueil Previva",
    navigation: "Navigation",
    nav: [["Accueil", "/"], ["À propos", "/about"], ["Services", "/services"], ["Articles", "/articles"], ["Boîte à outils", "/resources"]],
    solutions: "Solutions",
    solutionLinks: ["Planification de la retraite", "Gestion de patrimoine", "Épargne et placements", "Assurance personnelle"],
    contact: "Nous joindre",
    copyright: "Préviva © 2026. Tous droits réservés.",
    legalOne: "Les renseignements fournis sur ce site sont présentés à titre informatif seulement et ne constituent pas des conseils professionnels, une offre de vente ni une sollicitation de produits d’assurance. La disponibilité, les modalités et l’admissibilité sont assujetties à l’approbation de Previva et de ses partenaires assureurs. Consultez un conseiller en assurance autorisé pour obtenir un accompagnement personnalisé.",
    legalTwo: "Previva s’efforce d’assurer l’exactitude des renseignements présentés sur ce site, sans toutefois garantir qu’ils sont complets ou à jour. Les produits financiers et d’assurance comportent des risques et les résultats peuvent varier.",
  },
  en: {
    tagline: "Your financial planning partner.",
    homeLabel: "Previva home",
    navigation: "Navigation",
    nav: [["Home", "/"], ["About us", "/about"], ["Services", "/services"], ["Articles", "/articles"], ["Toolbox", "/resources"]],
    solutions: "Solutions",
    solutionLinks: ["Retirement planning", "Wealth management", "Savings & investments", "Personal insurance"],
    contact: "Contact",
    copyright: "Préviva © 2026. All rights reserved.",
    legalOne: "The information provided on this website is for informational purposes only and does not constitute professional advice, an offer to sell, or a solicitation of insurance products. Coverage availability, terms, and eligibility are subject to approval by Previva and its underwriting partners. Please consult a licensed insurance advisor for personalized support.",
    legalTwo: "Previva strives to ensure the accuracy of the information on this site but does not guarantee its completeness or timeliness. Financial and insurance products involve risk, and results may vary.",
  },
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand"><p>{t.tagline}</p><Link href={localizedHref("/", locale)} aria-label={t.homeLabel}><Image src="/images/previva-logo.png" alt="Previva" width={176} height={76} /></Link></div>
        <div className="footer-column"><h3>{t.navigation}</h3>{t.nav.map(([label, path]) => <Link href={localizedHref(path, locale)} key={path}>{label}</Link>)}</div>
        <div className="footer-column"><h3>{t.solutions}</h3>{t.solutionLinks.map((label) => <Link href={localizedHref("/services", locale)} key={label}>{label}</Link>)}</div>
        <div className="footer-column footer-contact"><h3>{t.contact}</h3><Link href="mailto:info@previva.ca"><Mail /> info@previva.ca</Link><Link href="tel:+15145134424"><Phone /> +1 514 513 4424</Link><p><MapPin />201–1950, rue Maurice-Gauvin<br />Laval, Québec H7S 1Z2</p></div>
      </div>
      <div className="container footer-bottom">
        <p>{t.copyright}</p>
        <div className="social-links"><Link href="https://www.facebook.com/profile.php?id=61577270224185" aria-label="Facebook"><span>f</span></Link><Link href="https://www.instagram.com/previva.ca/" aria-label="Instagram"><span>ig</span></Link><Link href="https://www.linkedin.com/company/previva-insurance/" aria-label="LinkedIn"><span>in</span></Link></div>
      </div>
      <div className="container legal-copy"><p>{t.legalOne}</p><p>{t.legalTwo}</p></div>
    </footer>
  );
}
