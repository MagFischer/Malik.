import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[580px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-hero mb-6">{t("title")}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[480px] mx-auto px-6">
          <ScrollReveal delay={0.2}>
            <ContactForm />
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center gap-4 my-12">
              <div className="flex-1 h-px bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]" />
              <span className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                {t("or")}
              </span>
              <div className="flex-1 h-px bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]" />
            </div>
          </ScrollReveal>

          {/* Email Link */}
          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-4">
                {t("alternative")}
              </p>
              <a
                href="mailto:info@magnanmalik.com"
                className="inline-flex items-center gap-2 text-lg text-[var(--color-accent)] hover:underline"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@magnanmalik.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
