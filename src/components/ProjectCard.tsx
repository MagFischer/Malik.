"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const t = useTranslations("portfolio");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-background)] dark:bg-[var(--color-background-dark)] hover:border-[var(--color-accent)] transition-colors"
    >
      {/* Image */}
      <div className="aspect-video bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ProjectIcon className="w-12 h-12 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider mb-2">
          {t(`categories.${project.category}`)}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
