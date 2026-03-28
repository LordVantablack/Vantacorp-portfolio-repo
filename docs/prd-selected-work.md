# PRD: Selected Work Section + Case Study Pages

## Overview

This is the most strategically important section. With limited case studies, every project must feel like a cinematic reveal — deep, detailed, and impressive. The goal: 2–3 projects presented so thoroughly that viewers assume there are many more behind the scenes. "Selected Work" language implies curation, not scarcity.

## Part A: Selected Work Section (Home Page)

### Section Header

```
01 / WORK                    ← numbered label, mono font, text-xs, uppercase, text-tertiary
Selected Work                ← display font, text-display, font-bold
A curated look at what       ← body-lg, text-secondary, max-w-content
we've been building.
```

### Project Display — Stacked Full-Width Cards

Instead of a grid (which looks sparse with 2–3 items), use a stacked layout where each project gets a large, full-width card. This is the pattern used by premium studios (Rejouice, Locomotive, Basement Studio).

```
Desktop layout:
┌──────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │            [Large project image / screenshot]          │  │
│  │               aspect-[16/9], full width                │  │
│  │                                                        │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Project Name                    Web App • AI • 2025   │  │
│  │  Brief one-line description         [View Case Study →]│  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│           (generous spacing — 60-80px between cards)         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            [Large project image]                       │  │
│  │               ...                                      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Project Card Behavior

- **Image**: large, full-width within the container. `aspect-[16/9]`. Rounded-xl. Overflow hidden.
- **Image hover**: image scales to 1.03 with a 0.5s transition. Optional: slight dark overlay on hover to emphasize the text below.
- **Scroll animation**: each card enters with a fade-up (opacity + translateY 60px → 0, 1.0s duration). Image has a clip-path reveal from bottom to top.
- **Info bar below image**: flex row, project name on the left (Syne, text-h3, font-bold), metadata on the right (tags + year, text-small, text-secondary).
- **Link**: entire card is clickable, links to `/work/[slug]`. "View Case Study →" text link also present for clarity.

### Project Data Structure

```typescript
// types/project.ts
interface Project {
  slug: string;
  title: string;
  description: string;           // One-liner for card
  tags: string[];                // ["Web App", "AI", "Automation"]
  year: string;                  // "2025"
  thumbnail: string;             // Image path for card
  color: string;                 // Accent color for case study page (optional)
  featured: boolean;             // Show on home page
  // Case study content:
  client: string;
  challenge: string;             // 2-3 sentences
  approach: string;              // 2-3 sentences
  outcome: string;               // 2-3 sentences, with metrics if possible
  techStack: string[];           // ["Next.js", "Python", "Claude API"]
  images: string[];              // Gallery images for case study
  liveUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
```

### Initial Projects (Hardcoded Data)

Since concrete client work isn't ready to showcase yet, seed with 2–3 projects:

1. **VantaLabs Portfolio** (this site itself) — "Our own portfolio, built as proof of what we deliver." Show the tech stack, design decisions, performance scores. The meta-project.
2. **Aikyam Capital AI Workflows** — "Strategic AI workflow automation for a capital management firm." Even without showing the actual product, describe the challenge and approach at a high level.
3. **Spec / Concept Project** — Build one impressive concept project (e.g., a landing page for a fictional SaaS, or an AI-powered dashboard demo) and present it as a case study. No one needs to know it's not a paid client.

### "View All Work" Link

Below the project cards, a text link: "View all projects →" that links to `/work`. This page exists but is minimal at launch — just these same projects in a grid. As the portfolio grows, this page becomes the full archive.

## Part B: Case Study Page (`/work/[slug]`)

### Layout Structure

Each case study is a long-scroll editorial page. Think magazine article, not dashboard.

```
┌──────────────────────────────────────────────────────┐
│  [Nav]                                               │
│                                                      │
│  Project Title                          Year         │
│  Client name • Tag, Tag, Tag                         │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │       [Full-width hero image of project]       │  │
│  │          aspect-[16/9], rounded-xl             │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌─────────────────┬──────────────────────────────┐  │
│  │  THE CHALLENGE  │  Description paragraph...    │  │
│  │                 │                              │  │
│  ├─────────────────┼──────────────────────────────┤  │
│  │  OUR APPROACH   │  Description paragraph...    │  │
│  │                 │                              │  │
│  ├─────────────────┼──────────────────────────────┤  │
│  │  THE OUTCOME    │  Description paragraph...    │  │
│  │                 │  Metric: "40% faster..."     │  │
│  └─────────────────┴──────────────────────────────┘  │
│                                                      │
│  Tech Stack: [Next.js] [Python] [Claude API]         │
│              (pill badges, ghost style)               │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │              [Project image 2]                 │  │
│  └────────────────────────────────────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │  [Image 3]       │  │  [Image 4]              │  │
│  └──────────────────┘  └──────────────────────────┘  │
│                                                      │
│  "Testimonial quote from the client..."              │
│  — Name, Role                                        │
│                                                      │
│  [← Previous Project]        [Next Project →]        │
│                                                      │
│  [Footer]                                            │
└──────────────────────────────────────────────────────┘
```

### Case Study Sections

1. **Header**: project title (text-h1, Syne), client name, tags as text (not pills here), year. Left-aligned.
2. **Hero Image**: full-width within container, rounded-xl, aspect-[16/9]. Scroll-triggered scale reveal.
3. **Three-Column Text Grid**: left column is the label ("THE CHALLENGE"), right column is the description. Labels: text-xs, uppercase, tracking-widest, text-tertiary. Description: text-body-lg, text-secondary. Each row separated by border-subtle.
4. **Tech Stack**: horizontal row of pill badges. Ghost style (border, no fill). Small text.
5. **Image Gallery**: mix of full-width and two-column images. Scroll-triggered fade-in. Generous spacing between.
6. **Testimonial** (if available): large quote text (text-h2, Syne, italic or light weight), attribution below.
7. **Prev/Next Navigation**: links to adjacent case studies. Keeps the user exploring.

### Animations

- Hero image: clip-path reveal from center on scroll
- Text sections: staggered fade-up on scroll
- Gallery images: fade-up with slight stagger between columns
- Tech stack pills: stagger in from left
- Testimonial: text split reveal (by words)

## Technical Requirements

### Dynamic Routing

```
/work/[slug]/page.tsx — server component
Uses generateStaticParams() to pre-render all project pages
Data from data/projects.ts (migrates to Sanity later)
```

### SEO

Each case study page gets:
- Unique `<title>`: "Project Name — VantaLabs"
- Meta description from project.description
- OG image: the project thumbnail

### Image Placeholders

Until real project images are ready, use:
- Gradient mesh backgrounds in project accent colors
- Or solid dark surfaces with the project name centered in large type
- Never use stock photos or generic tech imagery

## Out of Scope

- Filtering or sorting on the /work page (not enough projects to justify)
- Password-protected case studies
- Before/after sliders
- Interactive prototypes embedded in case studies
- Video walkthroughs (future addition)
