"use client";

import { Award, LayoutDashboard, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/data";

const icons = [LayoutDashboard, Award, Trophy];

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="achievements-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Achievements"
          title="Recognition beyond the refresh button."
        />
        <h2 id="achievements-heading" className="sr-only">
          Achievements
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((item, index) => {
            const Icon = icons[index] ?? Award;
            return (
              <Reveal key={item.title} delay={0.08 * index}>
                <article className="group h-full rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-accent/35">
                  <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
