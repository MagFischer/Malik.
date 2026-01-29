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
      className="group block card-apple"
    >
      {/* Image - 4:3 aspect ratio */}
      <div className="aspect-[4/3] bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ProjectIcon className="w-16 h-16 text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]" />
          </div>
        )}
      </div>

      {/* Content - minimal */}
      <div className="p-5">
        {/* Category */}
        <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wider">
          {t(`categories.${project.category}`)}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold mt-2 mb-1 group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h3>

        {/* Description - 2 lines max */}
        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2">
          {project.description}
        </p>
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
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
