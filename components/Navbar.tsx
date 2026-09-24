"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getLenis } from "@/components/SmoothScroll";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onNavClick = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -72 });
      return;
    }
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border] duration-300",
        scrolled || open
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-fg"
            onClick={(event) => {
              event.preventDefault();
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0 });
            }}
        >
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-underline text-sm text-muted transition-colors hover:text-fg"
              onClick={(event) => {
                event.preventDefault();
                onNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border text-fg transition-colors hover:border-accent/40 hover:text-accent"
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 hidden dark:block" />
            <Moon className="size-4 dark:hidden" />
          </button>

          <a
            href={site.resumeHref}
            download
            className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-[4.25rem] z-40 bg-bg/95 px-5 backdrop-blur-xl sm:px-8 lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <nav
              className="flex h-full flex-col justify-center gap-2 pb-24"
              aria-label="Mobile"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-display text-4xl font-semibold tracking-tight text-fg"
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavClick(link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={site.resumeHref}
                download
                className="mt-8 inline-flex w-fit rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg"
                onClick={() => setOpen(false)}
              >
                Download resume
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
