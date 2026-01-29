"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectCategory } from "@/lib/projects";

type FilterOption = "all" | ProjectCategory;

type Props = {
  projects: Project[];
  showFilter?: boolean;
};

export function PortfolioGrid({ projects, showFilter = true }: Props) {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filters: FilterOption[] = ["all", "software", "design"];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Filter Buttons - Apple Pill Style */}
      {showFilter && (
        <div className="flex gap-2 mb-12 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === filter
                  ? "bg-[var(--color-foreground)] dark:bg-[var(--color-foreground-dark)] text-[var(--color-background)] dark:text-[var(--color-background-dark)]"
                  : "bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border-dark)]"
              }`}
            >
              {t(`categories.${filter}`)}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            {t("noProjects")}
          </p>
        </div>
      )}
    </div>
  );
}
