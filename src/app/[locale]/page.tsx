import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { HeroBlob } from "@/components/HeroBlob";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { Parallax } from "@/components/Parallax";

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
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Blob */}
        <div className="absolute inset-0 z-0">
          <Parallax speed={0.3} className="w-full h-full">
            <HeroBlob className="opacity-60" />
          </Parallax>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[980px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-hero mb-6">
              {t("hero.title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl md:text-2xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-10 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#portfolio" className="btn-primary">
                {t("hero.cta.portfolio")}
              </a>
              <a href="#blog" className="btn-secondary">
                {t("hero.cta.blog")}
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-section text-center mb-4">
              {t("portfolio.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-center max-w-xl mx-auto mb-16">
              {t("portfolio.subtitle")}
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="py-24 md:py-32 bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]"
      >
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-section mb-2">{t("blog.title")}</h2>
                <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                  {t("blog.subtitle")}
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex text-[var(--color-accent)] hover:underline text-sm font-medium"
              >
                {t("blog.readMore")} →
              </Link>
            </div>
          </ScrollReveal>

          {recentPosts.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal>
              <p className="text-center text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] py-12">
                {t("blog.noPosts")}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="mt-12 text-center md:hidden">
              <Link href="/blog" className="btn-secondary">
                {t("blog.readMore")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
