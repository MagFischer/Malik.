"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { href: "/", label: "home" },
  { href: "/#portfolio", label: "portfolio" },
  { href: "/#blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)]/80 dark:bg-[var(--color-background-dark)]/80 backdrop-blur-md border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors"
        >
          malik.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                    pathname === item.href
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                  }`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-background)] dark:bg-[var(--color-background-dark)] border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <ul className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors hover:text-[var(--color-accent)] ${
                    pathname === item.href
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                  }`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
