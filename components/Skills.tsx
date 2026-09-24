"use client";

import { useRef, type MouseEvent } from "react";
import { BarChart3, Brain, Database, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons = [BarChart3, Database, Wrench, Brain];

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The stack behind the dashboards."
        />
        <h2 id="skills-heading" className="sr-only">
          Skills
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group, index) => {
            const Icon = icons[index] ?? BarChart3;
            return (
              <Reveal key={group.title} delay={0.08 * index}>
                <SkillCard title={group.title} items={group.items} icon={Icon} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: readonly string[];
  icon: typeof BarChart3;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -6;
    const ry = ((x - rect.width / 2) / rect.width) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-transform duration-200 ease-out will-change-transform",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),var(--glow),transparent_55%)]",
        "hover:border-accent/35 hover:before:opacity-100",
      )}
    >
      <div className="relative">
        <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-border bg-accent-soft text-accent">
          <Icon className="size-5" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-fg">
          {title}
        </h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-bg/60 px-3 py-1 text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
