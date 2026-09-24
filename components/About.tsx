"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, stats } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Dashboards that turn messy data into decisions."
        />
        <h2 id="about-heading" className="sr-only">
          About
        </h2>

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted lg:col-span-7 lg:text-lg">
            <p>{site.summary}</p>
            <p>{site.about}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 lg:col-span-5">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={0.08 * index}
                className="rounded-2xl border border-border bg-bg-card p-5"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
