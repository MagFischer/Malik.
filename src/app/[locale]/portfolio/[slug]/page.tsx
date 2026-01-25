import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
}

function ProjectContent({ project }: { project: NonNullable<ReturnType<typeof getProjectBySlug>> }) {
  const t = useTranslations("portfolio");

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-accent)] mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("backToPortfolio")}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-3">
            {t(`categories.${project.category}`)}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {project.description}
          </p>
        </div>

        {/* Links */}
        {(project.github || project.demo) && (
          <div className="flex gap-4 mb-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-accent)] transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
                {t("links.github")}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                {t("links.demo")}
              </a>
            )}
          </div>
        )}

        {/* Image */}
        <div className="aspect-video bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded-2xl mb-12 overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-20 h-20 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {project.longDescription.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-lg bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
