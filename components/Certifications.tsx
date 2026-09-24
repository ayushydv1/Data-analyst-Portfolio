"use client";

import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Certifications"
          title="Formal proof on Power BI, SQL and Python."
        />
        <h2 id="certifications-heading" className="sr-only">
          Certifications
        </h2>

        <ul className="flex flex-wrap gap-3">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} delay={0.06 * index} className="max-w-full">
              <li className="inline-flex items-center gap-3 rounded-full border border-border bg-bg-card px-4 py-3 text-sm text-fg">
                <BadgeCheck className="size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  {cert.name}
                  <span className="text-muted"> · {cert.issuer}</span>
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
