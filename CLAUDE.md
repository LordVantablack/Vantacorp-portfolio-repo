# CLAUDE.md — VantaLabs Portfolio

## Project Overview

- **Project**: VantaLabs — Development agency portfolio website
- **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP + Lenis, Convex, Clerk
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Node Version**: 20+
- **Domain**: TBD (vantalabs placeholder)

## What This Site Is

A portfolio website for VantaLabs, a development agency specializing in web development, mobile apps, AI integration, and workflow automation. The site must feel like a premium, established studio — confident, cinematic, and refined. The aesthetic is dark editorial luxury: think WorldQuant Foundry meets ICOMAT (by Rejouice). Restrained motion, bold typography, generous negative space on dark backgrounds.

The agency is young with limited published case studies. The site architecture must make 2–3 projects feel curated and intentional, not sparse. "Selected Work" not "Our Clients." Deep case studies over shallow cards. The site itself is the primary portfolio piece — every interaction is proof of capability.

## Architecture Decisions

- App Router with `src/` directory structure
- All pages are server components by default — use `"use client"` only when interactivity requires it
- Animations: GSAP + ScrollTrigger for scroll-driven animations, Framer Motion for component-level transitions and page transitions
- Lenis for smooth scrolling (initialized in root layout, wrapped in a provider)
- shadcn/ui as the base component library, customized to match dark theme
- Images served via `next/image` with Vercel Image Optimization
- All content hardcoded initially — architecture must support easy migration to a headless CMS (Sanity) later
- No blog at launch. Architecture should allow adding one without restructuring
- A hidden `/work` detail page exists but is not linked in navigation until case studies are ready
- **Auth**: Clerk handles all authentication — middleware, session, and user identity
- **Backend/Database**: Convex handles all data — queries, mutations, and real-time subscriptions. Never use fetch/axios/REST for app data

## Auth & Backend Conventions (Clerk + Convex)

- `ConvexClientProvider` is already set up in `components/ui/` — do not add another provider
- Clerk is initialized in the root layout — do not re-wrap pages with `ClerkProvider`
- Use `useUser()` and `useAuth()` from `@clerk/nextjs` for client-side user access
- Use `auth()` from `@clerk/nextjs/server` for server component auth
- Protect routes via `middleware.ts` using Clerk's `clerkMiddleware()` — already configured
- All Convex functions live in `/convex` — never create API routes for data that Convex can serve
- Use `useQuery()` and `useMutation()` from `convex/react` for all data operations
- Use `useConvexAuth()` for checking auth state within Convex context
- Convex functions that require auth should use `ctx.auth.getUserIdentity()` to verify the caller
- See `@convex/schema.ts` for the full data model before writing any queries or mutations
- See `@convex/auth.config.ts` for auth configuration

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Lenis provider, Clerk + Convex providers, metadata)
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   ├── page.tsx                # Home (hero, services, about preview, contact CTA)
│   ├── about/
│   │   └── page.tsx            # About page (team, philosophy, process)
│   ├── work/
│   │   ├── page.tsx            # Selected Work grid (hidden from nav initially)
│   │   └── [slug]/
│   │       └── page.tsx        # Individual case study page
│   └── contact/
│       └── page.tsx            # Contact page
├── components/
│   ├── ui/                     # shadcn/ui base components (Button, Dialog, etc.)
│   │   └── ConvexClientProvider.tsx  # Convex + Clerk provider wrapper
│   ├── sections/               # Page-level sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── ContactCTA.tsx
│   │   └── Testimonials.tsx
│   ├── layout/                 # Persistent layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageTransition.tsx
│   │   └── SmoothScroll.tsx    # Lenis provider wrapper
│   └── shared/                 # Reusable building blocks
│       ├── AnimatedText.tsx    # GSAP SplitText reveal component
│       ├── FadeIn.tsx          # Scroll-triggered fade-in wrapper
│       ├── SectionWrapper.tsx  # Consistent section padding/container
│       ├── ProjectCard.tsx     # Card used in SelectedWork grid
│       ├── NumberedItem.tsx    # "01 / 04" style labeled items
│       └── MagneticButton.tsx  # Subtle magnetic hover effect on buttons
├── convex/                     # All Convex backend functions
│   ├── schema.ts               # Data model — read this before writing queries
│   ├── auth.config.ts          # Clerk + Convex auth configuration
│   └── _generated/             # Auto-generated by Convex — never edit manually
├── lib/
│   ├── utils.ts                # cn() helper, misc utilities
│   ├── constants.ts            # Site-wide constants (nav links, social links, metadata)
│   ├── animations.ts           # Shared GSAP timeline configs and scroll triggers
│   └── fonts.ts                # next/font configurations
├── hooks/
│   ├── useGSAP.ts              # GSAP cleanup hook for React
│   ├── useLenis.ts             # Lenis scroll instance access
│   ├── useMediaQuery.ts        # Responsive breakpoint hook
│   └── useMousePosition.ts     # For subtle parallax / magnetic effects
├── types/
│   ├── project.ts              # Project / case study type definitions
│   └── index.ts                # Shared types
└── data/
    ├── projects.ts             # Hardcoded project data (migrates to Sanity later)
    ├── services.ts             # Service offerings data
    └── team.ts                 # Team member data
```

## Code Style & Conventions

- TypeScript strict mode — no `any` types, ever
- Prefer named exports for all components and utilities
- Components: PascalCase file names and component names
- Utilities and hooks: camelCase file names
- CSS: Tailwind utility classes exclusively. No CSS modules, no inline `style` props unless dynamically computed (e.g., transform values from JS)
- Use `cn()` helper (from `lib/utils.ts`, re-exported from shadcn) for conditional class merging
- No default exports except `page.tsx` and `layout.tsx` (Next.js requirement)
- Imports: group by (1) React/Next, (2) third-party, (3) components, (4) lib/hooks/types — separated by blank lines
- GSAP animations always wrapped in `useGSAP()` hook with proper cleanup
- Framer Motion: use `motion` components for declarative animations, `AnimatePresence` for exit animations
- All images use `next/image` with explicit `width`/`height` or `fill` + `sizes` prop
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — always
- Every `<section>` gets an `id` for scroll-to navigation
- Accessible: all interactive elements focusable, proper `aria-labels`, respect `prefers-reduced-motion`

## Design System Reference

Read `THEME.md` in the project root for the complete design system: colors, typography, spacing, animation timing, and component patterns. Every visual decision should reference THEME.md for consistency.

## Important Commands

- `pnpm dev` — Start development server (localhost:3000)
- `pnpm build` — Production build (run before any deploy)
- `pnpm lint` — ESLint check
- `pnpm type-check` — TypeScript compiler check (tsc --noEmit)

## Project Docs
- See @THEME.md for design system
- See @CONTENT.md for all copy and content
- See @REFERENCE.md for visual references and aesthetic direction - this is MANDATORY reading before building any component with visual or motion decisions. Do not interpret the aesthetic from THEME.md alone.
- All component PRDs live in @docs/prds/ — read the relevant PRD before building any component

## What NOT To Do

- Do NOT use the `pages/` directory — this is App Router only
- Do NOT install moment.js — use `date-fns` if date formatting is ever needed
- Do NOT use CSS modules — Tailwind only
- Do NOT use `any` in TypeScript — always define proper types
- Do NOT add animation libraries beyond GSAP + Framer Motion without explicit discussion
- Do NOT use `useEffect` for GSAP — use the `useGSAP()` hook from `@gsap/react`
- Do NOT put business logic in components — extract to `lib/` or `hooks/`
- Do NOT hardcode colors — use CSS custom properties defined in `globals.css` and referenced via Tailwind
- Do NOT use stock placeholder images — use solid color blocks or gradient placeholders until real assets are ready
- Do NOT over-animate — the sites we reference (WorldQuant Foundry, ICOMAT) use restraint. Motion should feel intentional, not decorative
- Do NOT build a blog, pricing page, or team carousel at launch — these are future additions
- Do NOT use fetch/axios/REST for app data — Convex handles all data fetching
- Do NOT create new auth logic — Clerk middleware and providers are already configured
- Do NOT edit anything inside `convex/_generated/` — this is auto-generated by Convex
- Do NOT add a second `ConvexClientProvider` or `ClerkProvider` — they are already in the root layout