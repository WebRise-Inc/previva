import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";

import { MotionController } from "@/components/motion-controller";

import "./globals.css";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://previva.ca"),
  title: "Previva | Protégez votre avenir financier",
  description: "Des solutions financières et d’assurance personnalisées pour bâtir une stabilité durable et planifier l’avenir en toute confiance.",
  icons: {
    icon: "/images/previva-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "/",
    siteName: "Previva",
    title: "Previva | Protégez votre avenir financier",
    description: "Des solutions financières et d’assurance personnalisées pour bâtir une stabilité durable et planifier l’avenir en toute confiance.",
    images: [
      {
        url: "/images/previva-social-card.png",
        width: 1200,
        height: 630,
        alt: "Previva — Prévoir la vie, en toute confiance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Previva | Protégez votre avenir financier",
    description: "Des solutions financières et d’assurance personnalisées pour bâtir une stabilité durable et planifier l’avenir en toute confiance.",
    images: ["/images/previva-social-card.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${urbanist.variable} ${inter.variable}`}>
      <body><MotionController />{children}</body>
    </html>
  );
}
