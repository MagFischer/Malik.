"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

// TODO: Konfiguriere diese Werte nach dem Einrichten von Giscus
// Gehe zu https://giscus.app und folge den Anweisungen
const GISCUS_CONFIG = {
  repo: "OWNER/REPO" as `${string}/${string}`,
  repoId: "YOUR_REPO_ID",
  category: "Announcements",
  categoryId: "YOUR_CATEGORY_ID",
};

export function Giscus() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous instance
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", GISCUS_CONFIG.repo);
    script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
    script.setAttribute("data-category", GISCUS_CONFIG.category);
    script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", locale === "de" ? "de" : "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [locale]);

  return (
    <section className="mt-16 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <div ref={containerRef} className="giscus" />
    </section>
  );
}
