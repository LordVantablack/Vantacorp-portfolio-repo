# PRD: Hero Section

## Overview

The hero is the first impression. It must instantly communicate: this is a premium development agency that builds serious software. The hero balances visual spectacle (scrolling images, subtle mouse interaction) with clarity (who we are, what we do, what to do next). It should feel cinematic — like a title sequence — without being slow or blocking interaction.

## Visual Design

### Layout

```
Desktop (lg+):
┌──────────────────────────────────────────────────────┐
│  [Navbar - transparent, overlays hero]               │
│                                                      │
│                                                      │
│         VANTALABS                                    │
│         Software, engineered to scale.               │
│                                                      │
│         [View Our Work]  [Get in Touch]              │
│                                                      │
│  ┌─ Scrolling image marquee (behind/below text) ──┐  │
│  │  img  img  img  img  img  img  → continuous     │  │
│  └─────────────────────────────────────────────────┘  │
│                                                      │
│               ↓ (scroll indicator)                   │
└──────────────────────────────────────────────────────┘

Mobile:
┌──────────────────────┐
│  [Navbar]            │
│                      │
│  VANTALABS           │
│  Software,           │
│  engineered          │
│  to scale.           │
│                      │
│  [View Our Work]     │
│  [Get in Touch]      │
│                      │
│  ┌─ Image marquee ─┐ │
│  │  scrolling →     │ │
│  └──────────────────┘ │
│       ↓              │
└──────────────────────┘
```

### Hero Content

- **Agency name**: "VANTALABS" — Syne, font-extrabold, text-hero size, text-primary. All caps for the name specifically.
- **Tagline**: "Software, engineered to scale." — DM Sans, text-body-lg or text-h3, text-secondary, font-regular. Sentence case.
- **CTA Primary**: "View Our Work" — accent bg button, links to `#work` section (smooth scroll) or `/work` page
- **CTA Secondary**: "Get in Touch" — ghost button, links to `/contact`

### Scrolling Image Marquee

This is the hero's visual hook. A horizontal strip of project screenshots / abstract visuals that scrolls continuously, creating ambient motion without requiring interaction.

**Behavior:**
- Continuous horizontal scroll, right to left, at a slow constant speed (~30px/s)
- Images are in a seamless loop (duplicated array for infinite scroll effect)
- Images are slightly desaturated or have a dark overlay (40–50% opacity) so they don't compete with the text
- On hover over the marquee area: scroll speed slows to ~10px/s (subtle deceleration, not a hard stop)
- Subtle parallax: marquee shifts slightly based on mouse Y position (very subtle, 5–10px)
- On mobile: same behavior, touch-scrollable is not needed — it's purely decorative

**Image treatment:**
- Each image: rounded-lg, aspect-[16/10] or aspect-video
- Subtle gap between images (16px)
- Dark overlay gradient on edges (left and right fade-to-black) so the marquee fades into the background
- Use placeholder gradient blocks until real screenshots are ready

**Positioning:**
- The marquee sits in the lower 40% of the hero viewport
- Text content is in the upper 60%, vertically centered within that space
- The marquee has a slight perspective tilt (subtle rotateX via CSS transform, ~2deg) for depth — optional, test visually

### Mouse Interaction (Subtle)

- **Mouse parallax on text**: The hero headline shifts very slightly (5–10px) opposite to mouse movement. Creates a subtle floating/depth effect.
- **Implementation**: Track mouse position via `useMousePosition()` hook, apply transform with `requestAnimationFrame`. Damped/lerped movement, not direct 1:1 tracking.
- **Disable on mobile**: No mouse parallax on touch devices.
- **Disable on reduced-motion**: Static positioning when `prefers-reduced-motion` is active.

### Scroll Indicator

- A small animated element at the bottom center of the hero
- Either: a thin line that pulses/extends downward, or a small chevron that bobs up and down
- Fades out once user scrolls past 100px
- Text label optional: "Scroll" in text-xs, uppercase, tracking-widest

## Animations (Load Sequence)

The hero has a choreographed entrance sequence that plays once on initial page load:

```
Timeline:
0.0s — Page loads. Hero is blank (bg-primary only).
0.2s — Agency name begins split-text reveal (by characters, staggered 0.03s each, fade + translateY from below)
0.6s — Tagline fades in (opacity + translateY, 0.6s duration)
0.9s — CTA buttons fade in together (opacity + translateY, 0.5s)
1.1s — Image marquee fades in and begins scrolling (opacity from 0, 0.8s)
1.5s — Scroll indicator fades in (opacity, 0.4s)
```

- Total entrance: ~2 seconds. Feels fast but choreographed.
- Easing: `primary` curve from THEME.md for all movements.
- On subsequent visits (same session): consider reducing or skipping the entrance animation. Store a flag in sessionStorage.

## Technical Requirements

### Performance
- **LCP target: < 2.0s** — The hero headline text IS the LCP element. It's rendered server-side, then animated client-side. This means the text exists in the DOM immediately (visible even without JS), and the animation enhances it.
- **No layout shift** — Hero height is fixed at `100vh` (or `100dvh` for mobile). No content below it shifts when animations play.
- **Image marquee is lazy** — Marquee images are not critical for LCP. Load them after the hero text is visible. Use `loading="lazy"` or defer the marquee initialization.
- **No heavy 3D** — The scrolling marquee + mouse parallax is the visual hook. No Three.js, no WebGL, no Spline. Keep the hero fast.

### Component Structure

```
Hero.tsx (client component — needs mouse events + animations)
├── HeroContent.tsx (text + CTAs)
│   ├── AnimatedText (agency name, split-text reveal)
│   ├── FadeIn (tagline)
│   └── FadeIn (CTA buttons)
├── ImageMarquee.tsx (scrolling image strip)
│   └── MarqueeImage.tsx (individual image with overlay)
└── ScrollIndicator.tsx (bottom scroll prompt)
```

### Responsive Behavior
- **Desktop (lg+)**: Full layout as described. Marquee shows 4–5 images visible at once.
- **Tablet (md)**: Same layout, slightly smaller text via clamp(). Marquee shows 3 images.
- **Mobile (< md)**: Text stacked, full-width. Marquee below text, shows 1.5–2 images. No mouse parallax. CTAs stack vertically.

### Props / Configuration

```typescript
interface HeroProps {
  agencyName: string;          // "VANTALABS"
  tagline: string;             // "Software, engineered to scale."
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  marqueeImages: { src: string; alt: string }[];
}
```

## Out of Scope

- Video background (too heavy for LCP, not in reference sites' style)
- Complex 3D scene (save for a future iteration)
- Typing effect on tagline (feels dated)
- Full-screen loader / preloader before hero (unnecessary friction)
- Multiple hero layouts or A/B variants

## Reference

- WorldQuant Foundry hero: large text, dark bg, confident typography, subtle background movement
- ICOMAT hero: video/image background with text overlay, scroll-driven transition into content
- The scrolling image marquee pattern: see Rejouice, Locomotive, or any Awwwards SOTD with horizontal scroll strips
