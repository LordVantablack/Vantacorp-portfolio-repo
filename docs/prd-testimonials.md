# PRD: Testimonials Section

## Overview

Social proof without a client logo wall. Even 1–2 testimonials, styled beautifully, build more trust than ten tiny logos in a row. This section is designed to work with minimal content and scale gracefully as testimonials accumulate.

## Placement

On the home page, between Selected Work and the Contact CTA. This positioning is intentional: the viewer has seen what you build (work), now they hear from people you've built for (proof), then they're invited to become the next client (CTA).

## Layout — Single Testimonial (Launch)

At launch with 1–2 testimonials, display them one at a time in a large, editorial format. Not a carousel — a single prominent quote.

```
Desktop:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  04 / TESTIMONIALS                                           │
│                                                              │
│  "Working with VantaLabs felt less like hiring               │
│   a vendor and more like gaining a technical                 │
│   co-founder. They understood the problem before             │
│   we finished explaining it."                                │
│                                                              │
│  — Name Surname                                              │
│    Role, Company Name                                        │
│                                                              │
│                                            ● ○  (dots, if 2+)│
└──────────────────────────────────────────────────────────────┘
```

### Visual Details

- **Quote text**: Syne, text-h2, font-normal (not bold — lighter weight feels more editorial for quotes), text-primary. Centered. Max-width 800px.
- **Attribution**: DM Sans, text-body, text-secondary. Centered, 24px below quote.
- **Name**: font-medium, text-primary. "— " prefix.
- **Role + Company**: font-regular, text-secondary. Line below name.
- **Quotation marks**: Large decorative opening quotation mark above the quote text. Syne, text-[120px], text-accent-muted (the 15% opacity accent). Positioned above-left of the quote. Purely decorative (aria-hidden).

### Multiple Testimonials (2+)

When there are 2+ testimonials:
- Auto-rotate between them on a 6-second timer
- Small dot indicators at the bottom (accent filled for active, border-subtle for inactive)
- No arrow buttons — the dots are the only manual control
- Cross-fade transition between quotes (opacity, 0.5s)
- Timer resets when user clicks a dot

### Single Testimonial (Launch Default)

When there's only one:
- No dots, no rotation. Just the quote displayed statically.
- The component gracefully handles `testimonials.length === 1` without UI artifacts.

## Data Structure

```typescript
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// data/testimonials.ts
export const testimonials: Testimonial[] = [
  {
    quote: "Working with VantaLabs felt less like hiring a vendor and more like gaining a technical co-founder. They understood the problem before we finished explaining it.",
    author: "Name Surname",
    role: "Position",
    company: "Aikyam Capital",
  },
  // Add more as they come in
];
```

## Scroll Animation

- Large quotation mark: fades in first (opacity, 0.6s)
- Quote text: AnimatedText reveal by lines (not chars — quotes should feel fluid, not character-by-character). Stagger 0.1s per line.
- Attribution: FadeIn (up), 0.3s after last line of quote.
- Dots: FadeIn, after attribution.

## Technical

```
Testimonials.tsx (client component — needs rotation timer + animation)
├── TestimonialQuote.tsx (the quote + attribution display)
└── DotIndicators.tsx (conditional, only renders if >1 testimonial)
```

## Out of Scope

- Video testimonials
- Star ratings
- Company logos next to testimonials
- Link to external review platforms (Google, Clutch)
- Testimonial submission form
