"use client";

import { useTranslations } from "next-intl";

type ServicesSectionProps = {
  className?: string;
};

export function ServicesSection({ className = "" }: ServicesSectionProps) {
  const t = useTranslations("services");

  const services = [
    {
      key: "chatbot",
      icon: ChatIcon,
      glow: "coral",
    },
    {
      key: "automation",
      icon: AutomationIcon,
      glow: "teal",
    },
    {
      key: "strategy",
      icon: StrategyIcon,
      glow: "violet",
    },
  ] as const;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className={`py-24 ${className}`}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ key, icon: Icon, glow }) => (
            <div
              key={key}
              className={`bento-card bento-card--glow-${glow} bento-card--interactive group cursor-pointer`}
              onClick={scrollToContact}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-${glow === 'coral' ? 'coral' : glow === 'teal' ? 'teal' : 'violet'})] to-[var(--color-magenta)] p-0.5`}>
                  <div className="w-full h-full rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-[var(--color-coral)] transition-colors">
                  {t(`${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-text-muted leading-relaxed mb-6 flex-grow">
                  {t(`${key}.description`)}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {(t.raw(`${key}.features`) as string[]).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckIcon className="w-4 h-4 text-[var(--color-teal)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-2xl font-display font-bold gradient-text">
                    {t(`${key}.price`)}
                  </span>
                  <span className="text-sm text-text-muted group-hover:text-[var(--color-coral)] transition-colors flex items-center gap-1">
                    {t("cta")}
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function AutomationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function StrategyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
