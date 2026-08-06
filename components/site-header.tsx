"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BOOKING_URL, localizedHref, type Locale } from "@/lib/site";

const navigation = {
  fr: [
    ["À propos", "/about"],
    ["Services", "/services"],
    ["Articles", "/articles"],
    ["Outils", "/resources"],
    ["Contact", "/contact"],
  ],
  en: [
    ["About", "/about"],
    ["Services", "/services"],
    ["Articles", "/articles"],
    ["Toolbox", "/resources"],
    ["Contact", "/contact"],
  ],
} as const;

const labels = {
  fr: {
    home: "Accueil Previva",
    navigation: "Navigation principale",
    mobileNavigation: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menuTitle: "Navigation Previva",
    menuEyebrow: "Explorer Previva",
    meeting: "Réserver une rencontre",
    appointment: "Prendre rendez-vous",
    language: "Choisir la langue",
  },
  en: {
    home: "Previva home",
    navigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Previva navigation",
    menuEyebrow: "Explore Previva",
    meeting: "Book a meeting",
    appointment: "Book an appointment",
    language: "Choose language",
  },
} as const;

function LanguageSwitcher({ locale, className = "" }: { locale: Locale; className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`language-switcher ${className}`.trim()} aria-label={labels[locale].language}>
      <Link href={pathname} scroll={false} className={locale === "fr" ? "active" : undefined} aria-current={locale === "fr" ? "page" : undefined}>FR</Link>
      <span>/</span>
      <Link href={`${pathname}?lang=en`} scroll={false} className={locale === "en" ? "active" : undefined} aria-current={locale === "en" ? "page" : undefined}>EN</Link>
    </div>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const navItems = navigation[locale];
  const t = labels[locale];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={localizedHref("/", locale)} className="brand" aria-label={t.home}>
          <Image src="/images/previva-logo.png" alt="Previva" width={148} height={64} priority />
        </Link>

        <nav className="desktop-nav" aria-label={t.navigation}>
          {navItems.map(([label, href]) => (
            <Link key={label} href={localizedHref(href, locale)} className={pathname === href ? "active" : undefined} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher locale={locale} />
          <Button asChild className="header-cta">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.meeting} <ArrowUpRight className="size-4" /></a>
          </Button>
        </div>

        <div className="mobile-header-controls">
          <LanguageSwitcher locale={locale} className="mobile-header-language" />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="mobile-menu-button" aria-label={t.openMenu}>
                <span className="mobile-menu-icon" aria-hidden="true"><span /><span /></span>
              </Button>
            </SheetTrigger>
            <SheetContent accessibleTitle={t.menuTitle} closeLabel={t.closeMenu}>
              <div className="mobile-menu-head">
                <Link href={localizedHref("/", locale)} className="mobile-logo" aria-label={t.home}>
                  <Image src="/images/previva-logo.png" alt="Previva" width={142} height={61} />
                </Link>
                <p>{t.menuEyebrow}</p>
              </div>
              <nav className="mobile-nav" aria-label={t.mobileNavigation}>
                {navItems.map(([label, href], index) => (
                  <SheetClose asChild key={label}>
                    <Link href={localizedHref(href, locale)} aria-current={pathname === href ? "page" : undefined}><span className="mobile-nav-number">{String(index + 1).padStart(2, "0")}</span><span>{label}</span><ArrowUpRight className="size-4" /></Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-menu-footer">
                <SheetClose asChild>
                  <Button asChild variant="inverse" className="mobile-cta">
                    <a href={BOOKING_URL} target="_blank" rel="noreferrer">{t.appointment}<ArrowUpRight className="size-4" /></a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
