"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: GitHubIcon },
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { name: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
];

const navLinks = [
  { href: "/", label: "home" },
  { href: "/#portfolio", label: "portfolio" },
  { href: "/#blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              malik.
            </Link>
            <p className="mt-3 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              {t("metadata.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.navigation")}</h3>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {t(`navigation.${item.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.social")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href={`/${locale}/feed.xml`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                aria-label="RSS Feed"
              >
                <RSSIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            © {currentYear} malik. {t("footer.copyright")}
          </p>
          <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {t("footer.madeWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RSSIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18ZM4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44Zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
    </svg>
  );
}
