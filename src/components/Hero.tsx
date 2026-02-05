"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { Hero3D } from "./Hero3D";

export function Hero() {
  const t = useTranslations("hero");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Hero3D />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="mb-6 opacity-0"
          >
            <span className="block text-text-secondary font-display text-lg md:text-xl font-medium mb-4">
              {t("greeting")}
            </span>
            <span className="block">
              {t("headline")}{" "}
              <span className="gradient-text">{t("headlineHighlight")}</span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-10 opacity-0"
          >
            {t("subtitle")}
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary"
            >
              {t("ctaPrimary")}
              <ArrowDownIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="btn-secondary"
            >
              {t("ctaSecondary")}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-text-muted flex justify-center pt-2">
          <div className="w-1 h-2 bg-text-muted rounded-full" />
        </div>
      </div>
    </section>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}
