export type Locale = "fr" | "en";

export type LocalizedPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export const BOOKING_URL = "https://bookings.cloud.microsoft/book/Previvaservicefinancierinc@beneva.ca/?ismsaljsauthenabled";

export function getLocale(lang?: string): Locale {
  return lang === "en" ? "en" : "fr";
}

export function localizedHref(path: string, locale: Locale) {
  return locale === "en" ? `${path}?lang=en` : path;
}
