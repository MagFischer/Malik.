import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRssFeed(locale: string): string {
  const posts = getAllPosts(locale);

  const feedTitle = locale === "de"
    ? "malik. - Blog"
    : "malik. - Blog";

  const feedDescription = locale === "de"
    ? "Gedanken, Tutorials und Erfahrungen aus der Welt der Softwareentwicklung."
    : "Thoughts, tutorials, and experiences from the world of software development.";

  const feedLanguage = locale === "de" ? "de-DE" : "en-US";

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/${locale}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${SITE_URL}/${locale}</link>
    <description>${escapeXml(feedDescription)}</description>
    <language>${feedLanguage}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/${locale}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as typeof locales[number])) {
    return new Response("Not Found", { status: 404 });
  }

  const feed = generateRssFeed(locale);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
