"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StickyShowcaseProps = {
  children: ReactNode;
  className?: string;
};

export function StickyShowcase({ children, className = "" }: StickyShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: content,
      pinSpacing: false,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={contentRef} className="sticky top-0">
        {children}
      </div>
    </div>
  );
}

type ShowcaseItemProps = {
  children: ReactNode;
  className?: string;
  index: number;
};

export function ShowcaseItem({ children, className = "", index }: ShowcaseItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    gsap.set(element, { opacity: index === 0 ? 1 : 0 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        gsap.to(element, {
          opacity: 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        gsap.to(element, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        if (index !== 0) {
          gsap.to(element, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
