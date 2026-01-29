"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  stagger?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 60,
  scale = 0.95,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(element, { opacity: 0, y, scale });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      once,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(element, {
              opacity: 0,
              y,
              scale,
              duration: duration * 0.5,
              ease: "power3.in",
            });
          },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, y, scale, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  scale?: number;
  once?: boolean;
};

export function StaggerReveal({
  children,
  className = "",
  childClassName = "",
  stagger = 0.1,
  duration = 0.8,
  y = 60,
  scale = 0.95,
  once = true,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = container.querySelectorAll("[data-stagger-item]");

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(items, { opacity: 0, y, scale });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      end: "bottom 15%",
      once,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease: "power3.out",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(items, {
              opacity: 0,
              y,
              scale,
              duration: duration * 0.5,
              stagger: stagger * 0.5,
              ease: "power3.in",
            });
          },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, duration, y, scale, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
