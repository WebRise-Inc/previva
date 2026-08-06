"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".section-heading",
  ".service-card",
  ".reason-item",
  ".process-row",
  ".story-image-wrap",
  ".google-review",
  ".article-card",
  ".article-index-card",
  ".split-feature-image",
  ".split-feature-copy",
  ".mission-points article",
  ".values-grid article",
  ".service-pillar",
  ".needs-grid article",
  ".external-tool-grid > a",
  ".native-calculator",
  ".worksheet-group",
  ".article-body > section",
].join(",");

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    elements.forEach((element, index) => {
      element.classList.add("reveal-ready");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
