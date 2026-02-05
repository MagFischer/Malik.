"use client";

import { useTranslations } from "next-intl";

type SocialProofCardProps = {
  className?: string;
};

export function SocialProofCard({ className = "" }: SocialProofCardProps) {
  const t = useTranslations("socialProof");
  const tTestimonials = useTranslations("testimonials");

  const testimonials = [
    { key: "testimonial1" },
    { key: "testimonial2" },
    { key: "testimonial3" },
  ];

  return (
    <div className={`bento-card bento-card--glow-teal h-full ${className}`}>
      <h4 className="text-sm font-display font-medium text-text-muted uppercase tracking-wider mb-2">
        {t("title")}
      </h4>
      <p className="text-xs text-text-muted mb-6">
        {t("subtitle")}
      </p>

      <div className="space-y-4">
        {testimonials.map(({ key }, index) => (
          <div
            key={index}
            className="p-4 bg-[var(--bg-elevated)] rounded-lg border border-[var(--glass-border)]"
          >
            <p className="text-sm text-text-secondary italic mb-2">
              &ldquo;{tTestimonials(`${key}.quote`)}&rdquo;
            </p>
            <p className="text-xs text-text-muted">
              — {tTestimonials(`${key}.author`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
