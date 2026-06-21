import type { Metadata } from "next";
import "./globals.css";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { getMessages } from "next-intl/server";

import {
  Cormorant_Garamond,
  Cormorant_Infant,
  Cinzel,
  EB_Garamond,
  Great_Vibes,
} from "next/font/google";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/* fonts */
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  variable: "--font-cormorant-infant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Invitation",
  description: "Elegant invitation website",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`
        ${cormorantGaramond.variable}
        ${cormorantInfant.variable}
        ${cinzel.variable}
        ${ebGaramond.variable}
        ${greatVibes.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}