# PRD: Page Transitions

## Overview

Page transitions are the invisible polish that separates a website from a web application from a cinematic experience. When navigating between routes, the current page should exit gracefully and the new page should enter smoothly. No hard cuts. But also no excessive animation — keep it fast and subtle.

## Transition Pattern — Fade + Slide

### Exit (Current Page)

```
Duration: 0.4s
Easing: primary (cubic-bezier(0.16, 1, 0.3, 1))
Properties:
  opacity: 1 → 0
  translateY: 0 → -20px (subtle upward drift)
  filter: blur(0px) → blur(4px) (optional — test visually, remove if too heavy)
```

### Enter (New Page)

```
Delay: 0.1s (slight overlap with exit)
Duration: 0.5s
Easing: primary
Properties:
  opacity: 0 → 1
  translateY: 20px → 0 (enters from below)
```

### Total Transition Time

~0.6s from click to new page fully visible. This is fast enough to not feel sluggish, slow enough to feel intentional.

## Implementation

### Using Framer Motion AnimatePresence

The transition wraps around the page content in the root layout:

```typescript
// components/layout/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Integration in Root Layout

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScroll>
          <Navbar />
          <main id="main">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Scroll Reset

On route change, scroll position must reset to top. Lenis needs to be told to scroll to 0:

```typescript
// Inside PageTransition or a useEffect in layout
useEffect(() => {
  window.scrollTo(0, 0);
  // If using Lenis: lenis.scrollTo(0, { immediate: true });
}, [pathname]);
```

## Interaction with Navbar

- The navbar does NOT participate in page transitions — it stays fixed and visible throughout.
- The footer is OUTSIDE the transition wrapper, so it doesn't animate on route change. This prevents layout flicker.

## Interaction with Section Scroll Animations

- After the page transition completes (enter animation finishes), scroll-triggered animations within the new page should be ready to fire.
- GSAP ScrollTrigger instances should be created AFTER the page transition's enter animation. Use `onAnimationComplete` callback or a small delay.
- Alternatively: use `ScrollTrigger.refresh()` after each route change to recalculate trigger positions.

## Performance Considerations

- `mode="wait"` in AnimatePresence means the exit completes before enter starts. This prevents both pages rendering simultaneously (which would double memory usage).
- Keep transition properties to `opacity` and `transform` only — these are GPU-accelerated. Avoid animating `height`, `width`, `padding`, etc.
- The optional `blur` filter: test on lower-end devices. Remove if it causes frame drops.

## Reduced Motion

```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reducedMotionVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Use reduced variants when preference is detected
const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;
```

## Edge Cases

- **Back button navigation**: same transition plays. No special handling needed.
- **Same-page navigation** (e.g., clicking a nav link that leads to the current page): no transition should play. Check `pathname === href` before animating.
- **Hash links** (e.g., `/#services`): these are not route changes. They trigger Lenis smooth scroll, not a page transition.
- **404 page**: uses the same transition. No special treatment.

## Out of Scope

- Complex multi-step transitions (wipe, reveal, morph)
- Shared element transitions (image morphing from card to hero)
- Loading states between routes (not needed with static/SSG pages)
- Route-specific transition variants (all routes use the same transition)
