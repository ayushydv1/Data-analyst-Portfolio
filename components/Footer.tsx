"use client";

import { ArrowUp, Mail, Phone } from "lucide-react";
import { site } from "@/lib/data";
import { getLenis } from "@/components/SmoothScroll";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>

        <div className="flex items-center gap-2">
          <Social
            href={site.linkedinHref}
            label="LinkedIn"
            icon={LinkedInIcon}
            external
          />
          <Social href={`mailto:${site.email}`} label="Email" icon={Mail} />
          <Social href={site.phoneHref} label="Call" icon={Phone} />
          <button
            type="button"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-fg hover:border-accent/40 hover:text-accent"
            onClick={() => {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0 });
            }}
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Social({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon: typeof Mail | typeof LinkedInIcon;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="grid size-10 place-items-center rounded-full border border-border text-fg transition-colors hover:border-accent/40 hover:text-accent"
    >
      <Icon className="size-4" />
    </a>
  );
}
