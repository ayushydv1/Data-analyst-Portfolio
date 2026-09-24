"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { DataGridCanvas } from "@/components/effects/DataGridCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getLenis } from "@/components/SmoothScroll";
import { marqueeTools, site } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -72 });
      return;
    }
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end pt-28 pb-0"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <DataGridCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--glow),transparent_42%),linear-gradient(to_bottom,transparent,var(--bg)_88%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.p
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/70 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-muted uppercase backdrop-blur"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          {site.location} · 4+ years in analytics & BI
        </motion.p>

        <h1 className="font-display text-[clamp(2.75rem,13vw,8.75rem)] leading-[0.86] font-extrabold tracking-[-0.04em] text-fg">
          {"Md Asif".split(" ").map((word, index) => (
            <span key={word} className="mr-[0.22em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.08 + index * 0.08, duration: 0.8, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.24, duration: 0.8, ease }}
            >
              Ansari
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-8 max-w-2xl"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease }}
        >
          <p className="text-lg text-accent sm:text-xl">{site.title}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            4+ years turning business requirements into Power BI dashboards,
            DAX models and KPIs people actually use.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65, ease }}
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="bg-accent text-bg hover:bg-accent/90"
          >
            View projects
            <ArrowDownRight className="size-4" />
          </MagneticButton>
          <MagneticButton
            href={site.resumeHref}
            download
            className="border border-border bg-bg-elevated/70 text-fg backdrop-blur hover:border-accent/40"
          >
            <Download className="size-4" />
            Download resume
          </MagneticButton>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-muted"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <a href={site.phoneHref} className="hover:text-accent">
            {site.phone}
          </a>
          <span className="mx-2 text-border">·</span>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            {site.email}
          </a>
        </motion.p>
      </div>

      <div className="relative z-10 mt-16 border-y border-border bg-bg-elevated/40 backdrop-blur">
        <div className="overflow-hidden py-4">
          <div className="marquee-track flex w-max gap-10 pr-10">
            {[...marqueeTools, ...marqueeTools].map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                className="text-xs font-medium tracking-[0.22em] text-muted uppercase"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
