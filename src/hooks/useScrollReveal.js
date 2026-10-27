
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(containerRef) {
  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray("[data-scroll-reveal]");

      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            y: 30,
            opacity: 0,
            filter: "blur(4px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            delay: (index % 3) * 0.08,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => context.revert();
  }, [containerRef]);
}

export default useScrollReveal;
