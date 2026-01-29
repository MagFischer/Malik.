import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { Parallax } from "@/components/Parallax";

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
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-[980px] mx-auto px-6">
          {/* Back Link */}
          <ScrollReveal>
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] hover:text-[var(--color-accent)] mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t("backToPortfolio")}
            </Link>
          </ScrollReveal>

          {/* Category */}
          <ScrollReveal delay={0.1}>
            <span className="inline-block text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-4">
              {t(`categories.${project.category}`)}
            </span>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-hero mb-6">{project.title}</h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.3}>
            <p className="text-xl md:text-2xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] max-w-2xl">
              {project.description}
            </p>
          </ScrollReveal>

          {/* Links */}
          {(project.github || project.demo) && (
            <ScrollReveal delay={0.4}>
              <div className="flex gap-4 mt-10">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLinkIcon className="w-5 h-5 mr-2" />
                    {t("links.demo")}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <GitHubIcon className="w-5 h-5 mr-2" />
                    {t("links.github")}
                  </a>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Parallax speed={0.2}>
            <ScrollReveal>
              <div className="aspect-video bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)] rounded-3xl overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </Parallax>
        </div>
      </section>

      {/* Long Description */}
      {project.longDescription && (
        <section className="py-24 md:py-32 bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
          <div className="max-w-[680px] mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-section mb-8">{t("overview")}</h2>
            </ScrollReveal>
            {project.longDescription.split("\n\n").map((paragraph, i) => (
              <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      <section className="py-24 md:py-32">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-section text-center mb-4">{t("techStack")}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-center max-w-xl mx-auto mb-12">
              {t("techStackDescription")}
            </p>
          </ScrollReveal>

          <StaggerReveal className="flex flex-wrap justify-center gap-3">
            {project.tech.map((tech) => (
              <StaggerItem key={tech}>
                <span className="px-5 py-2.5 text-base rounded-full bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
                  {tech}
                </span>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      {(project.github || project.demo) && (
        <section className="py-24 md:py-32 bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
          <div className="max-w-[580px] mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="text-section mb-6">{t("cta.title")}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-10">
                {t("cta.description")}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex gap-4 justify-center flex-wrap">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {t("links.demo")}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    {t("links.github")}
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
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
