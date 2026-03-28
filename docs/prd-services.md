# PRD: Services Section

## Overview

The services section communicates what VantaLabs can do — range without requiring a client for each capability. This is critical for a young agency: services prove breadth even when the case study count is low. The design should feel confident and organized, borrowing the numbered-item pattern from WorldQuant Foundry.

## Section Header

```
02 / SERVICES
What we build
We partner with ambitious teams to design, build, and
scale software that moves the needle.
```

## Services List

Display as a vertical accordion or stacked list, not a card grid. Each service is a row that expands or reveals detail on click/hover. This pattern feels editorial and intentional — not a generic features grid.

### Layout — Expandable Rows

```
Desktop:
┌──────────────────────────────────────────────────────────────┐
│  01   Web Development              [+]  or  auto-expand     │
│       ─────────────────────────────────────────── (divider)  │
│       Full-stack web applications built with modern          │
│       frameworks. From marketing sites to complex SaaS       │
│       platforms — fast, accessible, and built to scale.      │
│                                                              │
│       Next.js • React • TypeScript • Tailwind                │
│                                                              │
│  02   Mobile Applications                             [+]   │
│       ─────────────────────────────────────────── (divider)  │
│  03   AI Integration & Automation                     [+]   │
│       ─────────────────────────────────────────── (divider)  │
│  04   Workflow Automation                             [+]   │
│       ─────────────────────────────────────────── (divider)  │
└──────────────────────────────────────────────────────────────┘
```

### Service Items

```typescript
const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Full-stack web applications built with modern frameworks. From marketing sites to complex SaaS platforms — fast, accessible, and built to scale.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    number: "02",
    title: "Mobile Applications",
    description: "Cross-platform mobile experiences that feel native. We build apps that work seamlessly across iOS and Android without compromising on performance.",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    number: "03",
    title: "AI Integration",
    description: "Embedding intelligence into your products and operations. From conversational AI to custom model integration, we make AI practical and production-ready.",
    technologies: ["Claude API", "OpenAI", "LangChain", "Python", "RAG"],
  },
  {
    number: "04",
    title: "Workflow Automation",
    description: "Identifying bottlenecks in your operations and replacing manual processes with intelligent, automated systems. Strategic automation that compounds over time.",
    technologies: ["n8n", "Python", "Custom Integrations", "API Design"],
  },
];
```

### Interaction Pattern

**Option A — Accordion (recommended):**
- First item open by default
- Clicking a row expands it (smooth height animation, 0.4s) and collapses the currently open one
- Number and title always visible. Description and tech tags revealed on expand.
- Expand indicator: `+` rotates to `×` on open, or a chevron rotates

**Option B — All visible, stacked:**
- No accordion behavior. All services displayed at once with dividers between.
- Simpler, works if there are only 4 items. Feels more like the ICOMAT approach.

Go with Option A for interactivity, but build it so switching to Option B is a single prop change (`expandable={false}`).

### Visual Details

- **Number**: JetBrains Mono, text-small, text-tertiary. Left-aligned.
- **Title**: Syne, text-h2, font-bold, text-primary. Same row as number on desktop, stacked on mobile.
- **Description**: DM Sans, text-body, text-secondary. Max-width 560px. Appears on expand with fade-in.
- **Technologies**: row of text pills. DM Sans, text-xs, text-tertiary, border border-subtle, rounded-full, px-3 py-1. Appear on expand with stagger.
- **Divider**: full-width, 1px, border-subtle. Between each service row.
- **Spacing**: 0px between divider and title row. 20px between title and description. 16px between description and tech pills.

### Scroll Animation

- Section header: standard fade-up reveal
- Service rows: stagger in from below (0.15s between each row). Only the title + number animate in. Description animates independently on expand.

## Responsive

- **Desktop**: number, title, and expand icon on one row. Description and tags below when expanded.
- **Mobile**: number above title (stacked). Full-width. Same accordion behavior. Tech pills wrap to multiple lines.

## Technical

```
Services.tsx (client component — needs accordion state)
├── SectionWrapper (padding, container)
├── SectionHeader (numbered label + title + description)
└── ServiceItem.tsx (individual expandable row)
    ├── ServiceHeader (number + title + toggle)
    └── ServiceContent (description + tech pills, animated height)
```

## Out of Scope

- Pricing for each service
- "Request a quote" per service
- Icon illustrations per service (text-only is more editorial)
- Comparison table with competitors
