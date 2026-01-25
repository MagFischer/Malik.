import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: {
      default: "malik. | Portfolio & Blog",
      template: "%s | malik.",
    },
    description:
      locale === "de"
        ? "Portfolio & Blog - Softwareentwicklung, Design und mehr."
        : "Portfolio & Blog - Software development, design and more.",
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        de: `${siteUrl}/de`,
        en: `${siteUrl}/en`,
      },
      types: {
        "application/rss+xml": `${siteUrl}/${locale}/feed.xml`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href={`${siteUrl}/${locale}/feed.xml`}
        />
      </head>
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="pt-16 min-h-screen">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
