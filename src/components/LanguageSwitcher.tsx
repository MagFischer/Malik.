"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            locale === loc
              ? "bg-[var(--color-accent)] text-white"
              : "bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] hover:bg-[var(--color-accent)]/20"
          }`}
          aria-label={t("switch")}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
