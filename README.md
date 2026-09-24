# Md Asif Ansari — Portfolio

Personal portfolio for **Md Asif Ansari**, Data Analyst / Power BI Developer. Built as a single-page, motion-rich site with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger, and Lenis.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 with CSS-variable theming (dark default, light toggle)
- Framer Motion — UI reveals, hero text, modals, magnetic buttons
- GSAP + ScrollTrigger — experience timeline line-draw
- Lenis — smooth scroll (disabled when `prefers-reduced-motion` is set)
- lucide-react icons
- next/font — Sora (body) + Syne (display)

Color system lives in `app/globals.css` (`@theme` + `:root` / `.dark` tokens): deep navy/charcoal base, teal accent, sky secondary.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

The resume is served from [`public/resume.pdf`](public/resume.pdf) and linked in the nav and hero.

## Contact form

`POST /api/contact` validates name, email and message.

- Without `RESEND_API_KEY`, the API returns `{ fallback: true }` and the client opens a `mailto:` draft to `aansari430@gmail.com`.
- With Resend configured, the message is emailed directly.

Copy `.env.example` to `.env.local` and set:

```
RESEND_API_KEY=re_...
RESEND_FROM=Portfolio <onboarding@resend.dev>
CONTACT_TO=aansari430@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the env vars above (optional Resend keys; `NEXT_PUBLIC_SITE_URL` recommended for canonical/OG URLs).
4. Deploy. Zero extra config — `npm run build` is the production command.

## Content

All copy is sourced from the resume and lives in [`lib/data.ts`](lib/data.ts). Do not invent roles, metrics or employers when editing.

## Animmaster / motion swaps

Motion is hand-built to the quality bar of libraries like [animmasterlib.dev](https://animmasterlib.dev) (scroll, hero, text, nav, page-level transitions). If you later drop purchased Animmaster files into the repo, replace the matching section rather than stacking two implementations:

| Animmaster category      | Current file                         |
| ------------------------ | ------------------------------------ |
| Navigation menus         | `components/Navbar.tsx`              |
| Hero / text animations   | `components/Hero.tsx`                |
| Scroll animations        | `components/ui/Reveal.tsx`, `Experience.tsx` |
| Mouse effects            | `components/ui/MagneticButton.tsx`   |
| WebGL / background       | `components/effects/DataGridCanvas.tsx` |

Keep reduced-motion fallbacks when swapping.

## Accessibility

Semantic landmarks, skip link, focus-visible rings, modal focus trap, and `prefers-reduced-motion` (Lenis, GSAP, Framer, canvas and marquee all soften or stop).
