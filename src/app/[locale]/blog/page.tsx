import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return <BlogContent posts={posts} />;
}

function BlogContent({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  const t = useTranslations("blog");

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <h1 className="text-hero mb-4">{t("title")}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] max-w-xl">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[980px] mx-auto px-6">
          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <ScrollReveal className="mb-12">
                  <BlogCard post={featuredPost} featured />
                </ScrollReveal>
              )}

              {/* Other Posts - Grid */}
              {otherPosts.length > 0 && (
                <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post) => (
                    <StaggerItem key={post.slug}>
                      <BlogCard post={post} />
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              )}
            </>
          ) : (
            <ScrollReveal>
              <div className="text-center py-24">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                  {t("noPosts")}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
