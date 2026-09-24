"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-exp-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where the models and measures were built."
        />
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>

        <div className="relative ml-3 border-l border-transparent pl-8 md:ml-4 md:pl-12">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full w-px origin-top bg-accent"
            aria-hidden
          />

          <ol className="space-y-14">
            {experience.map((job) => (
              <li key={job.company} data-exp-item className="relative">
                <span
                  className="absolute top-1.5 -left-[2.2rem] size-3 rounded-full border-2 border-accent bg-bg md:-left-[3.2rem]"
                  aria-hidden
                />
                <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  {job.period}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight text-fg">
                  {job.role}
                </h3>
                <p className="mt-1 text-sm text-muted">{job.company}</p>
                <ul className="mt-5 max-w-3xl space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-4">
                      <span className="absolute top-0 left-0 text-accent">–</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
