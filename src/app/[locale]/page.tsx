import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { BlogCard } from "@/components/BlogCard";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredProjects = getFeaturedProjects();
  const recentPosts = getAllPosts(locale).slice(0, 3);

  return <HomeContent featuredProjects={featuredProjects} recentPosts={recentPosts} />;
}

function HomeContent({
  featuredProjects,
  recentPosts,
}: {
  featuredProjects: ReturnType<typeof getFeaturedProjects>;
  recentPosts: ReturnType<typeof getAllPosts>;
}) {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              {t("hero.cta.portfolio")}
            </a>
            <a
              href="#blog"
              className="px-6 py-3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border-dark)] transition-colors"
            >
              {t("hero.cta.blog")}
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {t("portfolio.title")}
          </h2>
          <PortfolioGrid projects={featuredProjects} />
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="px-6 py-24 bg-[var(--color-border)]/30 dark:bg-[var(--color-border-dark)]/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t("blog.title")}</h2>
            <Link
              href="/blog"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              {t("blog.readMore")} →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] py-12">
              {t("blog.noPosts")}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
