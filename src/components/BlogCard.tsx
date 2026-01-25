"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/lib/blog";

type Props = {
  post: BlogPostMeta;
};

export function BlogCard({ post }: Props) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-6 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-background)] dark:bg-[var(--color-background-dark)] hover:border-[var(--color-accent)] transition-colors"
    >
      {/* Category & Date */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider">
          {t(`categories.${post.category}`)}
        </span>
        <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          •
        </span>
        <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2 mb-4">
        {post.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Reading Time */}
        <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          {post.readingTime} {t("minRead")}
        </span>
      </div>
    </Link>
  );
}
