"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLenis } from "@/components/SmoothScroll";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-border py-24 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Four Power BI dashboards, opened as a gallery."
        />
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={0.06 * index} className="h-full">
              <ProjectCard
                project={project}
                index={index}
                onOpen={() => setActive(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const cover = project.images?.[0];

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    el.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(12px)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div className="h-full [perspective:1100px]">
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-border bg-bg-card will-change-transform",
        "transition-[transform,border-color,box-shadow] duration-200 ease-out",
        "hover:border-accent/40 hover:shadow-[0_24px_60px_-28px_var(--glow)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),var(--glow),transparent_55%)]",
        "hover:before:opacity-100",
      )}
    >
      {cover ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between text-xs tracking-[0.18em] text-muted uppercase">
          <span>0{index + 1}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {project.summary}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors group-hover:text-accent">
          View gallery
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-20"
        aria-label={`Open gallery for ${project.title}`}
      />
    </article>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enlargedSrc, setEnlargedSrc] = useState<string | null>(null);
  const hasGallery = Boolean(project?.images?.length);
  const enlarged =
    project?.images?.find((image) => image.src === enlargedSrc) ?? null;

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = dialogRef.current;
    const focusable = root?.querySelectorAll<HTMLElement>(
      'button, [href], textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    overlayRef.current?.scrollTo({ top: 0 });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (enlargedSrc) {
          setEnlargedSrc(null);
          return;
        }
        onClose();
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.stopPropagation();
    };

    const overlay = overlayRef.current;
    overlay?.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      overlay?.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
      previouslyFocused?.focus();
    };
  }, [project, onClose, enlargedSrc]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-bg/70 p-4 backdrop-blur-md"
          data-lenis-prevent
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex min-h-full items-start justify-center py-8 sm:py-12">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative w-full max-w-4xl rounded-2xl border border-border bg-bg-elevated p-6 shadow-2xl sm:p-8"
              initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.18em] text-accent uppercase">
                    Project
                  </p>
                  <h3
                    id={titleId}
                    className="font-display mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
                  >
                    {project.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="sticky top-0 grid size-10 shrink-0 place-items-center rounded-full border border-border bg-bg-elevated text-fg hover:text-accent"
                  aria-label="Close project details"
                >
                  <X className="size-4" />
                </button>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              {hasGallery ? (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.images?.map((image) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setEnlargedSrc(image.src)}
                      className="overflow-hidden rounded-xl border border-border text-left transition-colors hover:border-accent/40"
                    >
                      <span className="relative block aspect-[16/10] bg-bg">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 640px) 40vw, 100vw"
                          className="object-cover object-top"
                        />
                      </span>
                      <span className="block px-3 py-2 text-xs tracking-[0.16em] text-muted uppercase">
                        {image.label}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </div>

          <AnimatePresence>
            {enlarged ? (
              <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-sm"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEnlargedSrc(null)}
              >
                <div
                  className="relative w-full max-w-5xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setEnlargedSrc(null)}
                    className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-border bg-bg-elevated text-fg"
                    aria-label="Close enlarged screenshot"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-bg">
                    <Image
                      src={enlarged.src}
                      alt={enlarged.alt}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-muted">
                    {enlarged.label}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
