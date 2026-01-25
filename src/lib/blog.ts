import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogCategory = "tech" | "personal";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

const contentDirectory = path.join(process.cwd(), "src/content/blog");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getPostSlugs(locale: string): string[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const filePath = path.join(contentDirectory, locale, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category: data.category || "tech",
    tags: data.tags || [],
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  const slugs = getPostSlugs(locale);

  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostsByCategory(locale: string, category: BlogCategory): BlogPostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
