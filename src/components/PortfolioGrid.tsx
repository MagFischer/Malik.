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
      {/* Filter Buttons */}
      {showFilter && (
        <div className="flex gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] hover:bg-[var(--color-accent)]/20"
              }`}
            >
              {t(`categories.${filter}`)}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <p className="text-center text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] py-12">
          {t("noProjects")}
        </p>
      )}
    </div>
  );
}
