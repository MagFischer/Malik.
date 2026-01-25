import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostSlugs, markdownToHtml } from "@/lib/blog";
import { locales } from "@/i18n/config";
import { Giscus } from "@/components/Giscus";

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
    <main className="min-h-screen px-6 py-24">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
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
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("backToBlog")}
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Category */}
          <span className="inline-block text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-4">
            {t(`categories.${post.category}`)}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>
              {post.readingTime} {t("minRead")}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-lg bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
            prose-code:bg-[var(--color-border)] prose-code:dark:bg-[var(--color-border-dark)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[var(--color-border)] prose-pre:dark:bg-[var(--color-border-dark)]"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Comments */}
        <Giscus />
      </article>
    </main>
  );
}
