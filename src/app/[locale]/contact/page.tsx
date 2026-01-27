import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

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
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {t("subtitle")}
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-[var(--color-border)]/20 dark:bg-[var(--color-border-dark)]/20 rounded-2xl p-8">
          <ContactForm />
        </div>

        {/* Alternative Contact */}
        <div className="mt-12 text-center">
          <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-4">
            {t("alternative")}
          </p>
          <a
            href="mailto:info@magnanmalik.com"
            className="text-[var(--color-accent)] hover:underline"
          >
            info@magnanmalik.com
          </a>
        </div>
      </div>
    </main>
  );
}
