# PRD: About Section (Home Preview + Dedicated Page)

## Overview

The About section has two forms: a compact preview on the home page that drives curiosity, and a full `/about` page with deeper content. For a young agency, the About section builds trust through philosophy and process rather than a long team roster. It answers: who is behind this, what do they believe, and how do they work?

## Part A: About Preview (Home Page Section)

### Section Header

```
03 / ABOUT
Built different
```

### Layout — Split Content

```
Desktop:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Built different                We don't believe in          │
│                                 bloated teams or drawn-out   │
│                                 timelines. VantaLabs is      │
│                                 a lean, technical studio     │
│                                 that ships fast and builds   │
│                                 to last. We sit at the       │
│                                 intersection of engineering  │
│                                 and design — every project   │
│                                 is an exercise in both.      │
│                                                              │
│                                 [Learn more about us →]      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Left column (40%)**: Section title in text-display, Syne, font-bold. Fixed position within scroll (sticky on desktop, static on mobile). This creates an editorial effect where the title stays visible while the description scrolls.
- **Right column (60%)**: Description paragraph(s). DM Sans, text-body-lg, text-secondary. Line-height 1.7. Max-width 480px.
- **CTA**: "Learn more about us →" text link with underline animation. Links to `/about`.

### Process Teaser (Optional — adds credibility)

Below the split text, a horizontal row of 3–4 process steps:

```
  Discovery        Design        Build        Launch
    01               02            03           04
```

- Each step: number (mono, text-tertiary) + label (DM Sans, text-small, text-primary)
- Connected by a thin horizontal line (border-subtle)
- Scroll-triggered: steps and connecting line reveal left to right with stagger

### Animations

- Title: text split reveal (by words) on scroll
- Description: fade-up, 0.2s after title starts
- CTA: fade-in, after description
- Process steps: stagger reveal left-to-right

## Part B: Full About Page (`/about`)

### Page Structure

```
┌──────────────────────────────────────────────────────┐
│  [Nav]                                               │
│                                                      │
│  About VantaLabs                                     │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ We're a development studio that treats every   │  │
│  │ project like a product. Not an agency that     │  │
│  │ churns out websites — a technical partner that │  │
│  │ builds software you'd stake your business on.  │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ── Our Philosophy ──────────────────────────────    │
│                                                      │
│  [Philosophy content — 2-3 short paragraphs]         │
│                                                      │
│  ── How We Work ─────────────────────────────────    │
│                                                      │
│  01  Discovery                                       │
│      Understanding the problem before writing         │
│      a single line of code.                          │
│                                                      │
│  02  Architecture                                    │
│      Designing systems that scale — choosing the     │
│      right tools, not the trendy ones.               │
│                                                      │
│  03  Build                                           │
│      Rapid, iterative development with continuous    │
│      delivery. You see progress daily.               │
│                                                      │
│  04  Launch & Iterate                                │
│      Deployment, monitoring, and ongoing refinement.  │
│      We don't disappear after launch.                │
│                                                      │
│  ── The Team ────────────────────────────────────    │
│                                                      │
│  [Founder card — photo + name + role + short bio]    │
│                                                      │
│  ── Let's Work Together ─────────────────────────    │
│                                                      │
│  [CTA block → Contact page]                          │
│                                                      │
│  [Footer]                                            │
└──────────────────────────────────────────────────────┘
```

### Content Sections

**1. Hero Statement (top of page)**
Large text, Syne, text-h1, centered or left-aligned. A confident statement about what VantaLabs is.

Suggested copy:
> "We're a development studio that treats every project like a product. Not an agency that churns out websites — a technical partner that builds software you'd stake your business on."

**2. Philosophy (2–3 short paragraphs)**
- Technical depth matters. We understand the systems we build, not just the frameworks.
- We leverage AI as a force multiplier — not a replacement for engineering judgment.
- Speed without sacrificing quality. Lean team, tight feedback loops, no bureaucracy.

**3. Process (numbered steps)**
Use the same `NumberedItem` component from services. 4 steps: Discovery, Architecture, Build, Launch & Iterate. Each with a 1–2 sentence description. This is a trust-builder for potential clients.

**4. Team**
For now, just the founder. A card with:
- Photo (or solid color placeholder with initials)
- Name
- Role: "Founder & Lead Engineer"
- Short bio: 2–3 sentences. Focus on technical background and what drives the work.
- Social links: GitHub, LinkedIn

Designed so additional team members can be added later as the same card component in a grid.

**5. CTA Block**
A full-width section at the bottom:
> "Have a project in mind?"
> [Get in Touch] button

### Animations

- Hero statement: text split reveal on load
- Philosophy: paragraphs fade-up on scroll, staggered
- Process steps: stagger in, similar to services section
- Team card: fade-up
- CTA: fade-up with button scale-in

## Technical

```
About page: /app/about/page.tsx (server component, minimal client islands)
Home preview: components/sections/AboutPreview.tsx (client component for scroll animations)

Shared components:
- NumberedItem.tsx (reused from services)
- TeamCard.tsx (new — reusable for future team growth)
```

## Out of Scope

- Full team page with many members (premature)
- Office photos or location info
- Company timeline / milestones
- Values grid with icons (too corporate)
- Video introduction
