export type ProjectCategory = "software" | "design";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
};

// Example projects - replace with your own!
export const projects: Project[] = [
  {
    slug: "personal-website",
    title: "Personal Website",
    description:
      "Meine persönliche Portfolio-Website mit Blog, gebaut mit Next.js und Tailwind CSS.",
    longDescription: `Diese Website ist mein digitales Zuhause im Internet. Sie präsentiert meine Projekte,
    teilt meine Gedanken im Blog und ermöglicht es Besuchern, mich zu kontaktieren.

    Features:
    - Mehrsprachig (Deutsch/Englisch)
    - Dark Mode
    - Blog mit Markdown
    - Kontaktformular
    - Self-hosted auf eigenem Server`,
    category: "software",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "cli-tool",
    title: "CLI Productivity Tool",
    description:
      "Ein Kommandozeilen-Tool zur Automatisierung wiederkehrender Entwickler-Aufgaben.",
    category: "software",
    tech: ["Rust", "CLI", "Cross-platform"],
    github: "https://github.com",
    featured: true,
  },
  {
    slug: "mobile-app",
    title: "Fitness Tracker App",
    description:
      "Eine mobile App zum Tracken von Workouts und Ernährung mit schönen Visualisierungen.",
    category: "software",
    tech: ["React Native", "TypeScript", "Firebase"],
    featured: true,
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design",
    description:
      "Komplettes Branding-Paket für ein Tech-Startup inkl. Logo, Farben und Typografie.",
    category: "design",
    tech: ["Figma", "Illustrator", "Brand Design"],
    featured: false,
  },
  {
    slug: "dashboard-ui",
    title: "Analytics Dashboard",
    description:
      "UI/UX Design für ein Daten-Analytics-Dashboard mit komplexen Visualisierungen.",
    category: "design",
    tech: ["Figma", "UI/UX", "Data Visualization"],
    featured: true,
  },
  {
    slug: "api-service",
    title: "REST API Service",
    description:
      "Ein skalierbarer API-Service mit Authentication, Rate Limiting und Dokumentation.",
    category: "software",
    tech: ["Node.js", "Express", "PostgreSQL", "Docker"],
    github: "https://github.com",
    demo: "https://api.example.com",
    featured: false,
  },
];

export function getProjects(category?: ProjectCategory): Project[] {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
