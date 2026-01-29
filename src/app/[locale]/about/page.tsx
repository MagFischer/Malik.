import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";

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
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <p className="text-[var(--color-accent)] text-lg font-medium mb-4">
              {t("greeting")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-hero mb-8 max-w-3xl">
              {t("title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] max-w-2xl leading-relaxed">
              {t("bio.paragraph1")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <ScrollReveal>
              <div className="aspect-square bg-[var(--color-border)] dark:bg-[var(--color-border-dark)] rounded-3xl overflow-hidden">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <div>
              <ScrollReveal>
                <h2 className="text-section mb-6">{t("bio.title")}</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] leading-relaxed mb-6">
                  {t("bio.paragraph1")}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] leading-relaxed">
                  {t("bio.paragraph2")}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-section text-center mb-4">{t("skills.title")}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] text-center max-w-xl mx-auto mb-16">
              {t("skills.subtitle")}
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <StaggerItem key={skillGroup.category}>
                <div className="card-apple p-8">
                  <h3 className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-6">
                    {t(`skills.${skillGroup.category}`)}
                  </h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <li
                        key={skill}
                        className="text-lg text-[var(--color-foreground)] dark:text-[var(--color-foreground-dark)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary-dark)]">
        <div className="max-w-[980px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-section text-center mb-16">{t("values.title")}</h2>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-2 gap-6">
            {["quality", "simplicity", "learning", "collaboration"].map((value) => (
              <StaggerItem key={value}>
                <div className="p-8 rounded-2xl bg-[var(--color-background)] dark:bg-[var(--color-background-dark)]">
                  <h3 className="text-xl font-semibold mb-3">{t(`values.${value}.title`)}</h3>
                  <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                    {t(`values.${value}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </main>
  );
}
