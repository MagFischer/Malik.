import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostSlugs, markdownToHtml } from "@/lib/blog";
import { locales } from "@/i18n/config";
import { Giscus } from "@/components/Giscus";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return <BlogPostContent post={post} contentHtml={contentHtml} />;
}

function BlogPostContent({
  post,
  contentHtml,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  contentHtml: string;
}) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      {/* Header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[680px] mx-auto px-6">
          {/* Back Link */}
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-accent)] mb-8 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("backToBlog")}
            </Link>
          </ScrollReveal>

          {/* Category & Date */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider">
                {t(`categories.${post.category}`)}
              </span>
              <span className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                ·
              </span>
              <time
                dateTime={post.date}
                className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
              >
                {formattedDate}
              </time>
              <span className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                ·
              </span>
              <span className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                {post.readingTime} {t("minRead")}
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.3}>
            <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] leading-relaxed">
              {post.description}
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* Content */}
      <article className="pb-24 md:pb-32">
        <div className="max-w-[680px] mx-auto px-6">
          <ScrollReveal delay={0.4}>
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[var(--color-muted)] dark:prose-p:text-[var(--color-muted-dark)] prose-p:leading-relaxed
                prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--color-foreground)] dark:prose-strong:text-[var(--color-foreground-dark)]
                prose-code:bg-[var(--color-background-secondary)] prose-code:dark:bg-[var(--color-background-secondary-dark)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                prose-pre:bg-[var(--color-background-secondary)] prose-pre:dark:bg-[var(--color-background-secondary-dark)] prose-pre:rounded-xl
                prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:text-[var(--color-muted)] dark:prose-blockquote:text-[var(--color-muted-dark)] prose-blockquote:not-italic
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal>
            <div className="mt-16 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm rounded-full bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Comments */}
          <ScrollReveal>
            <div className="mt-16">
              <Giscus />
            </div>
          </ScrollReveal>
        </div>
      </article>
    </main>
  );
}
