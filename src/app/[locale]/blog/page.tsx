import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

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

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {t("subtitle")}
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              {t("noPosts")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
