# PRD: Scroll Animations System

## Overview

Scroll-triggered animations are the backbone of the site's cinematic feel. This PRD defines the global system — reusable patterns, trigger logic, and performance guidelines — so every section animates consistently without per-component re-specification. Think of this as the animation API for the entire site.

## Core Setup: Lenis + GSAP ScrollTrigger

### Lenis Smooth Scroll

Lenis provides the buttery smooth scroll behavior. It replaces native browser scroll with an interpolated, momentum-based scroll.

```typescript
// components/layout/SmoothScroll.tsx
"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,            // Smoothness (0.05 = very smooth, 0.15 = snappier)
        duration: 1.2,         // Scroll duration
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

### GSAP ScrollTrigger Integration

GSAP ScrollTrigger must be told to use Lenis's scroll position instead of native scroll:

```typescript
// lib/animations.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Call this once in layout after Lenis is initialized
export function initScrollTriggerWithLenis(lenis: any) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

## Reusable Animation Components

### 1. FadeIn — The Workhorse

Used for: any element that should appear on scroll. The most common animation on the site.

```typescript
// components/shared/FadeIn.tsx
interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none"; // default: "up"
  delay?: number;           // seconds, default: 0
  duration?: number;        // seconds, default: 0.6
  distance?: number;        // pixels, default: 40
  threshold?: number;       // 0-1, viewport %, default: 0.15 (triggers when 15% visible)
  stagger?: number;         // seconds between children, default: 0 (no stagger)
  once?: boolean;           // animate only first time, default: true
  className?: string;
}
```

**Behavior:**
- Element starts hidden (opacity: 0, translated by `distance` in `direction`)
- When `threshold` of the element enters the viewport, animation triggers
- Animates to opacity: 1, translate: 0 over `duration` with `delay`
- If `stagger` is set and children are multiple elements, they animate in sequence
- If `once` is true (default), the animation doesn't reverse on scroll-up

**Implementation:** GSAP ScrollTrigger under the hood. The component registers a ScrollTrigger instance on mount and cleans up on unmount via `useGSAP()`.

### 2. AnimatedText — Text Split Reveal

Used for: headings, hero text, section titles.

```typescript
// components/shared/AnimatedText.tsx
interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"; // default: "p"
  splitBy?: "chars" | "words" | "lines";            // default: "words"
  stagger?: number;          // seconds between units, default: 0.05
  duration?: number;         // per unit, default: 0.8
  delay?: number;            // before first unit, default: 0
  trigger?: "scroll" | "load"; // default: "scroll"
  className?: string;
}
```

**Behavior:**
- Text is split into individual spans (chars, words, or lines) using GSAP SplitText or a custom splitter
- Each unit starts at opacity: 0, translateY: 100% (masked below its line)
- On trigger (scroll or load), units reveal with stagger
- After animation completes, inline styles are cleaned up to prevent layout issues
- The original text is preserved for accessibility (screen readers see the full text, not individual spans)

### 3. ParallaxImage — Subtle Depth on Scroll

Used for: background images, decorative elements, hero marquee.

```typescript
// components/shared/ParallaxImage.tsx
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;    // -0.3 to 0.3 (negative = opposite to scroll), default: 0.1
  className?: string;
}
```

**Behavior:**
- Image is inside a container with `overflow: hidden`
- Image is slightly larger than its container (scale: 1.2) to allow parallax room
- On scroll, image translates vertically at `speed` relative to scroll position
- Uses GSAP ScrollTrigger with `scrub: true` for smooth, scroll-locked movement
- Speed should be subtle (0.05–0.2). Anything higher feels disorienting.

### 4. ClipReveal — Cinematic Image Reveal

Used for: project images, hero images, featured content.

```typescript
// components/shared/ClipReveal.tsx
interface ClipRevealProps {
  children: React.ReactNode;
  direction?: "bottom" | "top" | "left" | "right" | "center"; // default: "bottom"
  duration?: number;    // default: 1.0
  delay?: number;       // default: 0
  className?: string;
}
```

**Behavior:**
- Element starts with `clip-path` hiding it (e.g., `inset(100% 0 0 0)` for bottom reveal)
- On scroll into view, clip-path animates to `inset(0)`, revealing the content
- Simultaneously, the content inside scales from 1.1 to 1.0 (subtle zoom-out as it reveals)
- Duration is slower than fade (1.0s) for a more cinematic feel

## Global Animation Defaults

```typescript
// lib/animations.ts
export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 85%",       // Trigger when top of element hits 85% of viewport
  end: "bottom 20%",      // End when bottom of element hits 20% of viewport
  toggleActions: "play none none none", // Play on enter, don't reverse
};

export const EASE = {
  primary: "power3.out",
  enter: "power2.out",
  smooth: "power1.inOut",
};

export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
};

export const STAGGER = {
  tight: 0.05,
  default: 0.1,
  relaxed: 0.15,
};
```

## Section-by-Section Animation Map

| Section | Elements | Animation | Timing |
|---------|----------|-----------|--------|
| Hero | Agency name | AnimatedText (chars, load trigger) | 0.2s delay |
| Hero | Tagline | FadeIn (up) | 0.6s delay |
| Hero | CTAs | FadeIn (up) | 0.9s delay |
| Hero | Image marquee | FadeIn (none, opacity only) | 1.1s delay |
| Hero | Scroll indicator | FadeIn (none) | 1.5s delay |
| Services | Section header | AnimatedText (words) + FadeIn | scroll |
| Services | Service rows | FadeIn (up, stagger 0.15s) | scroll |
| Selected Work | Section header | AnimatedText (words) | scroll |
| Selected Work | Project cards | ClipReveal (bottom) + FadeIn for text | scroll, stagger 0.2s |
| About Preview | Title | AnimatedText (words, sticky) | scroll |
| About Preview | Description | FadeIn (up) | scroll, 0.2s after title |
| About Preview | Process steps | FadeIn (up, stagger 0.1s) | scroll |
| Contact CTA | Headline | AnimatedText (words) | scroll |
| Contact CTA | Button | FadeIn (up) | scroll, 0.3s delay |
| Contact Page | Form fields | FadeIn (up, stagger 0.1s) | load |

## Performance Guidelines

### GPU-Accelerated Properties Only
Animate ONLY: `opacity`, `transform` (translate, scale, rotate), `clip-path`, `filter` (sparingly).
NEVER animate: `width`, `height`, `padding`, `margin`, `top/left`, `background-color`, `border`.

### ScrollTrigger Instance Management
- Every component that creates a ScrollTrigger MUST clean it up on unmount.
- Use `useGSAP()` hook from `@gsap/react` which handles cleanup automatically.
- After route changes, call `ScrollTrigger.refresh()` to recalculate positions.

### Batching
- When animating multiple sibling elements (e.g., a list of service rows), use `ScrollTrigger.batch()` instead of individual triggers per element. This is more performant.

### Will-Change
- Do NOT add `will-change` to everything. Only add it to elements actively being animated, and remove it after animation completes.
- GSAP handles this internally in most cases.

### Mobile Considerations
- Reduce or simplify animations on mobile:
  - `ParallaxImage` speed reduced to 0.05 (or disabled) on mobile
  - Stagger values halved on mobile (animations feel faster on smaller screens)
  - `AnimatedText` split by words (not chars) on mobile for performance
  - Disable mouse-based effects entirely

```typescript
// lib/animations.ts
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function getAnimationConfig() {
  const mobile = isMobile();
  return {
    stagger: mobile ? STAGGER.tight : STAGGER.default,
    parallaxSpeed: mobile ? 0 : 0.1,
    splitBy: mobile ? "words" : "chars",
  };
}
```

## Reduced Motion

Every animation component checks `prefers-reduced-motion`:

```typescript
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

When reduced motion is preferred:
- All scroll animations are disabled — content is immediately visible
- Page transitions use simple opacity fade (no translate)
- Parallax effects are disabled
- Image marquee is static (no auto-scroll, but can still be visible)
- Hover states still work (they're user-initiated, not motion)

## Debugging

```typescript
// Enable during development only
if (process.env.NODE_ENV === "development") {
  ScrollTrigger.defaults({ markers: true }); // Shows trigger markers
}
```

## Out of Scope

- FLIP animations (shared element transitions between pages)
- Scroll-jacking (taking over native scroll for custom scroll sections)
- Horizontal scroll sections
- Scroll-driven video playback
- Complex GSAP timelines with multiple scenes
- Physics-based spring animations (stick with easing curves)
