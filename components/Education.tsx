"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          eyebrow="Education"
          title="The foundation before the first data model."
        />
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>

        <Reveal className="max-w-2xl rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
            {education.year}
          </p>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-fg">
            {education.degree}
          </h3>
          <p className="mt-2 text-muted">
            {education.school} · {education.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
