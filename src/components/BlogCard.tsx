"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/lib/blog";

type Props = {
  post: BlogPostMeta & { image?: string };
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: Props) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block card-apple overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-[16/10] md:aspect-auto bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ArticleIcon className="w-16 h-16 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider">
              {t(`categories.${post.category}`)}
            </span>
            <h3 className="text-2xl font-semibold mt-3 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
              {post.title}
            </h3>
            <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-3 mb-4">
              {post.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readingTime} {t("minRead")}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block card-apple"
    >
      {/* Image */}
      <div className="aspect-[16/9] bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)] overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ArticleIcon className="w-12 h-12 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-2">
          <span className="font-medium text-[var(--color-accent)] uppercase tracking-wider">
            {t(`categories.${post.category}`)}
          </span>
          <span>·</span>
          <time dateTime={post.date}>{formattedDate}</time>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

function ArticleIcon({ className }: { className?: string }) {
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
        strokeWidth={1}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  );
}
