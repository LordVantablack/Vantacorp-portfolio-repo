# THEME.md — VantaLabs Design System

## Brand Identity

- **Name**: VantaLabs (placeholder — architecture must support easy name swap)
- **Tone**: Confident, precise, unhurried. Not corporate, not startup-bubbly. Speaks like a senior engineer who also has taste — technical authority with editorial refinement.
- **Aesthetic Direction**: Dark editorial luxury. Think WorldQuant Foundry's cinematic restraint crossed with ICOMAT's (Rejouice) immaculate pacing and scroll choreography. Every element earns its place. Negative space is a design tool, not emptiness.
- **Tagline**: "Software, engineered to scale." (SEO-aligned, communicates technical depth + growth orientation. Swap-ready.)

## Design Philosophy

The site should feel like flipping through a beautifully art-directed magazine in a dark room — each scroll reveals something with intention. The key tension to maintain: the site must feel visually rich and technically impressive, but never busy. Complexity lives in the details (micro-interactions, type treatments, scroll pacing), not in density.

Reference touchstones:
- WorldQuant Foundry — dark bg, numbered sections, large type, hover-reveal team cards, scroll-triggered fades
- ICOMAT (by Rejouice) — video hero, tabbed horizontal content, cinematic section pacing, testimonial carousel, clean grid

## Color Palette

All colors defined as CSS custom properties in `globals.css` and mapped to Tailwind in `tailwind.config.ts`.

### Core Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #050505;          /* Near-black, main background */
  --bg-elevated: #0F0F0F;         /* Cards, nav, elevated surfaces */
  --bg-surface: #161616;          /* Subtle surface distinction */
  --bg-hover: #1A1A1A;            /* Hover states on surfaces */

  /* Text */
  --text-primary: #F0F0F0;        /* Primary text — not pure white, slightly warm */
  --text-secondary: #8A8A8A;      /* Secondary / muted text */
  --text-tertiary: #555555;       /* Subtle labels, metadata */

  /* Borders & Dividers */
  --border-subtle: #1E1E1E;       /* Default dividers */
  --border-visible: #2A2A2A;      /* More visible borders (cards, inputs) */
  --border-hover: #3A3A3A;        /* Border on hover */

  /* Accent — warm stone/taupe for luxury without being flashy */
  --accent: #B8A089;              /* Primary accent: warm stone */
  --accent-hover: #D4BAA0;        /* Accent hover: lighter warm */
  --accent-muted: rgba(184, 160, 137, 0.15); /* Accent backgrounds, subtle fills */

  /* Functional */
  --success: #4ADE80;
  --error: #F87171;
  --warning: #FBBF24;
}
```

### Why This Palette

- **No pure black (#000000)** — `#050505` has just enough warmth to avoid feeling sterile. Pure black creates harsh contrast with white text.
- **No pure white (#FFFFFF)** — `#F0F0F0` is softer on dark backgrounds. Feels printed, not digital.
- **Warm accent (#B8A089)** — A muted stone/taupe avoids the cliché of blue or purple tech accents. Feels luxurious without trying. Used sparingly — CTAs, active states, rare highlights.
- **The palette is 90% monochromatic** — Like both reference sites, color is barely present. The richness comes from typography, spacing, and motion.

## Typography

### Font Stack

```typescript
// lib/fonts.ts
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Why These Fonts

- **Syne (Display/Headings)** — Geometric, bold, distinctive. Has personality without being novelty. The varied weights (400–800) allow for nuanced hierarchy. Feels technical but has warmth.
- **DM Sans (Body)** — Clean, slightly geometric, highly readable at small sizes. Pairs with Syne's geometry without competing. Comfortable for long-form reading.
- **JetBrains Mono (Code/Technical)** — For any code snippets, technical labels, or monospaced accents. Industry standard for dev-focused audiences.

### Type Scale

All sizes use `clamp()` for fluid responsiveness. No fixed breakpoint jumps.

```css
/* Type scale — used via Tailwind classes */
--text-hero: clamp(3.5rem, 8vw, 7rem);       /* Hero headline only */
--text-display: clamp(2.5rem, 5vw, 4.5rem);   /* Section titles */
--text-h1: clamp(2rem, 4vw, 3rem);            /* Page titles */
--text-h2: clamp(1.5rem, 3vw, 2.25rem);       /* Sub-section titles */
--text-h3: clamp(1.25rem, 2vw, 1.5rem);       /* Component titles */
--text-body: 1rem;                             /* 16px base */
--text-body-lg: 1.125rem;                      /* 18px, for lead text */
--text-small: 0.875rem;                        /* 14px, metadata */
--text-xs: 0.75rem;                            /* 12px, labels */
```

### Typography Rules

- **Headings**: Always Syne. Uppercase ONLY for nav links and small labels (like "01 / SERVICES"). Never uppercase for section titles — use case as-is with bold weight.
- **Body text**: Always DM Sans. Line height 1.6 for paragraphs, 1.4 for UI text.
- **Letter spacing**: Headings: -0.02em (slight tightening). Uppercase labels: 0.1em (tracking out). Body: default (0).
- **Max line length**: Body text should never exceed `max-w-[640px]` (roughly 65 characters per line). Headings can span wider.
- **Font weights**: Headings use 700 (bold) or 800 (extrabold). Body uses 400 (regular). Emphasis uses 500 (medium), never bold in body copy.

## Spacing System

### Base Unit: 4px

All spacing uses multiples of 4px. Tailwind's default spacing scale (which uses 4px increments) maps directly.

### Section Spacing

```css
/* Vertical padding between major sections */
--section-padding-y: clamp(80px, 12vh, 160px);

/* Container */
--container-max: 1280px;
--container-padding-x: clamp(20px, 5vw, 80px);

/* Content max-width for text blocks */
--content-max: 640px;
```

### Spacing Philosophy

- **Generous vertical space between sections** — Both reference sites use large gaps. Sections should breathe. When in doubt, add more space.
- **Tight internal grouping** — Elements within a section are close together (12–24px). The contrast between tight grouping and wide separation creates visual rhythm.
- **Asymmetric layouts welcome** — Not everything needs to be centered. Left-aligned headings with right-aligned descriptions (like ICOMAT's feature sections) create editorial tension.

## Animation System

### Global Principles

1. **Restraint over spectacle** — Every animation must have a purpose: reveal content, provide feedback, or guide attention. No decoration-only motion.
2. **Scroll is the primary trigger** — Most animations fire on scroll-into-view, not on page load. The scroll IS the experience.
3. **Consistent easing** — One primary easing curve site-wide. Variations only for specific effects.
4. **Respect user preferences** — All animations disabled when `prefers-reduced-motion: reduce` is active. Fallback: content is visible immediately with no motion.

### Easing Curves

```typescript
// lib/animations.ts
export const EASE = {
  // Primary — smooth deceleration, feels natural and premium
  primary: [0.16, 1, 0.3, 1],         // CSS: cubic-bezier(0.16, 1, 0.3, 1)

  // Enter — slightly more dramatic for initial reveals
  enter: [0.0, 0.0, 0.2, 1],          // CSS: cubic-bezier(0, 0, 0.2, 1)

  // Smooth — gentle, for subtle movements (parallax, magnetic)
  smooth: [0.25, 0.1, 0.25, 1],       // CSS: cubic-bezier(0.25, 0.1, 0.25, 1)

  // Magnetic — for magnetic button hover effect
  magnetic: [0.23, 1, 0.32, 1],

  // GSAP string format
  gsapPrimary: 'power3.out',
  gsapEnter: 'power2.out',
  gsapSmooth: 'power1.inOut',
};
```

### Timing

```typescript
export const DURATION = {
  fast: 0.3,          // Micro-interactions, hover states, tooltips
  medium: 0.6,        // Component reveals, text animations
  slow: 1.0,          // Section entrances, hero reveals
  pageTransition: 0.8, // Route transitions
};

export const STAGGER = {
  tight: 0.05,        // Characters in text split
  default: 0.1,       // Sibling elements (cards, list items)
  relaxed: 0.15,      // Larger items (sections, features)
};
```

### Standard Animation Patterns

**1. Fade-Up Reveal (most common)**
Used for: section titles, paragraphs, cards, images
```
Initial: opacity 0, translateY 40px
Final: opacity 1, translateY 0
Duration: 0.6–1.0s
Trigger: element 85% in viewport
Easing: primary
```

**2. Text Split Reveal**
Used for: hero headline, section titles
```
Split by: words (hero) or lines (section titles)
Each word/line: opacity 0, translateY 100%
Stagger: 0.05s (chars) or 0.1s (words)
Duration: 0.8s per unit
Trigger: on load (hero) or scroll-into-view (sections)
```

**3. Subtle Parallax**
Used for: background images, decorative elements
```
Speed: 0.1–0.3 (10–30% of scroll speed)
Direction: vertical only (no horizontal parallax)
Applied via: GSAP ScrollTrigger with scrub: true
```

**4. Scale Reveal (images)**
Used for: project images, feature images
```
Initial: scale 1.1, opacity 0, clip-path reveals from center or edge
Final: scale 1, opacity 1, clip-path fully revealed
Duration: 1.0–1.2s
```

**5. Magnetic Hover (buttons, interactive elements)**
Used for: CTA buttons, nav links
```
Effect: element subtly follows cursor within a defined radius (8–12px)
Easing: magnetic
Spring back on mouse leave: 0.4s
Intensity: subtle — 8px max displacement
```

**6. Cursor Trail / Mouse Parallax (hero only)**
Used for: hero section background elements
```
Effect: background layers shift slightly based on mouse position
Intensity: very subtle — 10–20px max shift
Layers: 2–3 depth layers with decreasing movement
Performance: use requestAnimationFrame, not mousemove directly
```

### Page Transitions

```
Exit: current page fades out (opacity 1→0) + slides up slightly (translateY 0→-20px)
Duration: 0.4s
Enter: new page fades in (opacity 0→1) + slides up (translateY 20px→0)
Duration: 0.5s
Overlap: 0.1s (exit starts, enter begins slightly before exit finishes)
Implementation: Framer Motion AnimatePresence in layout.tsx
```

## Component Design Patterns

### Buttons

```
Primary: bg accent (#B8A089), text #050505, rounded-full, px-8 py-3
         Hover: bg accent-hover (#D4BAA0), subtle scale(1.02)
         Active: scale(0.98)
         Magnetic hover effect enabled

Ghost:   bg transparent, border 1px border-visible, text-primary, rounded-full, px-8 py-3
         Hover: border-hover, bg-hover
         Active: scale(0.98)

Text:    No bg, no border. Text with underline offset animation on hover.
         Underline slides in from left on hover, slides out to right on leave.
```

### Cards (Project Cards)

```
Background: bg-elevated (#0F0F0F)
Border: 1px border-subtle, hover: border-hover
Border radius: rounded-xl (12px)
Padding: p-0 (image bleeds to edges) or p-6 (text-only cards)
Hover: image scales 1.03, border brightens, subtle translateY -4px
Transition: 0.4s primary easing
Image: aspect-video or aspect-[4/3], object-cover, rounded-t-xl
```

### Section Headers

```
Pattern: numbered label + title + description
Example:
  "01 / SERVICES"          ← text-xs, uppercase, tracking-widest, text-secondary, font-mono
  "What we build"          ← text-display, font-display (Syne), font-bold, text-primary
  "We partner with..."     ← text-body-lg, text-secondary, max-w-content, mt-4

Alignment: left-aligned by default. Centered only for hero.
```

### Navigation

```
Position: fixed top, full-width
Background: transparent initially, bg-primary/80 + backdrop-blur on scroll
Height: 72px desktop, 64px mobile
Logo: left-aligned, text in Syne bold
Links: right-aligned, uppercase, text-small, tracking-wide, DM Sans medium
       Hover: text-primary (from text-secondary), underline slides in
Mobile: hamburger icon → full-screen overlay with large centered links
Transition: bg and blur fade in/out on scroll threshold (50px)
```

### Footer

```
Layout: multi-column on desktop (logo + tagline | nav links | contact), stacked on mobile
Background: bg-elevated or same as bg-primary with top border
Typography: text-small for links, text-xs for legal/copyright
Spacing: generous padding (section-padding-y)
Style: clean and functional — not a design moment. Match WorldQuant Foundry footer simplicity.
```

## Responsive Breakpoints

```
Mobile first. All base styles target mobile (< 640px).

sm: 640px   — Small tablets
md: 768px   — Tablets, large phones landscape
lg: 1024px  — Small desktops, tablets landscape
xl: 1280px  — Standard desktops (container max-width)
2xl: 1536px — Large desktops

Key responsive behaviors:
- Hero text: scales fluidly via clamp(), no breakpoint jumps
- Grid: 1 col mobile → 2 col md → 3 col lg (for services/features)
- Nav: inline links on lg+, hamburger below lg
- Section padding: reduces on mobile via clamp()
- Images: full-bleed on mobile, contained on desktop
```

## Image & Media Strategy

- **No stock photos** — Use solid color blocks, subtle gradient meshes, or abstract generative patterns as placeholders until real project screenshots/assets exist
- **Project images**: real screenshots, ideally browser mockups or device frames for polish
- **File format**: WebP via next/image automatic optimization. Source as PNG or high-quality JPG.
- **Lazy loading**: all images below the fold are lazy-loaded (next/image does this by default)
- **Hero media**: either a scrolling image marquee, a subtle gradient mesh animation, or a minimal 3D element. Not a video — keep LCP fast.

## Accessibility Requirements

- WCAG 2.1 AA minimum
- Color contrast: all text meets 4.5:1 ratio (primary text on bg-primary: #F0F0F0 on #050505 = 18.4:1 ✓)
- Focus indicators: visible focus ring (2px outline, accent color, 2px offset) on all interactive elements
- Keyboard navigation: full tab order through all interactive elements
- Screen reader: semantic HTML, aria-labels on icon buttons, alt text on all images
- Motion: `prefers-reduced-motion` check wraps all GSAP and Framer Motion animations
- Skip-to-content link: hidden visually, visible on focus, links to `<main>`