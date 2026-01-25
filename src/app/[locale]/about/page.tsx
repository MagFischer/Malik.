import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  const skills = [
    { category: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "backend", items: ["Node.js", "PostgreSQL", "Docker", "Linux"] },
    { category: "design", items: ["Figma", "UI/UX", "Prototyping"] },
  ];

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
          <div className="w-24 h-1 bg-[var(--color-accent)]" />
        </div>

        {/* Intro Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Photo Placeholder */}
          <div className="md:col-span-1">
            <div className="aspect-square bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded-2xl flex items-center justify-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{t("greeting")}</h2>
            <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-4 leading-relaxed">
              {t("bio.paragraph1")}
            </p>
            <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] leading-relaxed">
              {t("bio.paragraph2")}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8">{t("skills.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-medium text-[var(--color-accent)] uppercase tracking-wider mb-4">
                  {t(`skills.${skillGroup.category}`)}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Values / What I Do */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">{t("values.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["quality", "simplicity", "learning", "collaboration"].map((value) => (
              <div
                key={value}
                className="p-6 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
              >
                <h3 className="font-semibold mb-2">{t(`values.${value}.title`)}</h3>
                <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                  {t(`values.${value}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
