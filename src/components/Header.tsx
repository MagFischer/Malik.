"use client";

import { useState, useEffect, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setIsAtTop(currentScrollY < 10);

      if (currentScrollY > 100) {
        setIsVisible(!isScrollingDown);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`h-11 flex items-center justify-between px-6 max-w-[980px] mx-auto transition-all duration-300 ${
          isAtTop
            ? "bg-transparent"
            : "bg-[var(--color-background)]/80 dark:bg-[var(--color-background-dark)]/80 backdrop-blur-xl backdrop-saturate-[180%]"
        }`}
        style={{
          borderBottom: isAtTop
            ? "none"
            : "0.5px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight hover:text-[var(--color-accent)] transition-colors"
        >
          malik.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-nav transition-colors hover:text-[var(--color-foreground)] dark:hover:text-[var(--color-foreground-dark)] ${
                    pathname === item.href
                      ? "text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]"
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
          className="md:hidden p-2 -mr-2 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-11 z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[var(--color-background)]/95 dark:bg-[var(--color-background-dark)]/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="relative px-6 py-8">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-2xl font-semibold transition-colors hover:text-[var(--color-accent)] ${
                    pathname === item.href
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]"
                  }`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
