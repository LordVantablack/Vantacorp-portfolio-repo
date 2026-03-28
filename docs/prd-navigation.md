# PRD: Navigation

## Overview

The navigation is persistent across all pages. It must feel invisible until needed — transparent on the hero, subtly present on scroll, functional on all screen sizes. The nav should match the editorial restraint of the overall site: no dropdowns, no mega-menus, no complexity.

## Desktop Navigation (lg+)

### Layout

```
┌────────────────────────────────────────────────────────────────┐
│  VANTALABS                        Services  About  Contact    │
└────────────────────────────────────────────────────────────────┘
```

- **Logo (left)**: "VANTALABS" — Syne, font-bold, text-lg. Text-based, no icon logo for now. Links to `/` (home).
- **Nav links (right)**: Horizontal row. DM Sans, font-medium, text-small, uppercase, tracking-wide.
- **Links**: Services (scrolls to `#services` on home, or navigates to `/#services` from other pages), About (`/about`), Contact (`/contact`).
- **Note**: "Work" is intentionally excluded from nav for now. It exists as a page (`/work`) but is not promoted until there are enough case studies. Can be added with a single line change in `constants.ts`.
- **Height**: 72px
- **Padding**: `container-padding-x` from THEME.md on each side

### Scroll Behavior

```
State 1 — Top of page (scrollY < 50px):
  Background: transparent
  Text color: text-primary
  Border: none
  Blur: none

State 2 — Scrolled (scrollY >= 50px):
  Background: bg-primary with 80% opacity (rgba(5, 5, 5, 0.8))
  Backdrop filter: blur(12px)
  Border: 1px bottom, border-subtle
  Transition: 0.3s ease

State 3 — Scrolling down rapidly:
  Nav hides (translateY: -100%)
  Transition: 0.3s ease

State 4 — Scrolling up (or stopped):
  Nav reappears (translateY: 0)
  Transition: 0.3s ease
```

The hide-on-scroll-down, show-on-scroll-up pattern keeps the nav accessible without eating screen space during content consumption.

### Link Hover Effect

Each nav link has an underline reveal on hover:
- A thin line (1px) slides in from left to right on hover
- Slides out to the right on mouse leave
- Color: accent (#B8A089)
- Duration: 0.3s
- Active page link: underline is always visible

## Mobile Navigation (< lg)

### Hamburger Trigger

- **Position**: top-right, inside the nav bar
- **Icon**: two horizontal lines (not three — cleaner). Or a single line that morphs.
- **Size**: 32x32px tap target (minimum 44x44px including padding)
- **Animation**: lines morph to an X when menu is open (rotate + translate, 0.3s)

### Fullscreen Overlay

```
┌──────────────────────┐
│  VANTALABS       [X] │
│                      │
│                      │
│     Services         │
│     About            │
│     Contact          │
│                      │
│                      │
│  info@vantalabs.dev  │
│  [Social icons]      │
└──────────────────────┘
```

- **Background**: bg-primary, full screen (100vh/100dvh), z-50
- **Links**: centered vertically, Syne font, text-h1 size, stacked with 24px gap
- **Entry animation**: overlay slides in from right (translateX: 100% → 0), 0.5s, primary easing. Links stagger in (fade + translateY, 0.1s stagger) after overlay is open.
- **Exit**: reverse — links fade out quickly (0.2s), overlay slides out to right (0.4s)
- **Body scroll lock**: when overlay is open, body scroll is disabled (set `overflow: hidden` on body, or use Lenis `.stop()` / `.start()`)
- **Close triggers**: X button, clicking a nav link (auto-closes), pressing Escape key

### Mobile Footer Info

At the bottom of the overlay, show:
- Email address (text-small, text-secondary)
- Social icons: GitHub, LinkedIn, Twitter/X (icon buttons, 24px, text-secondary, hover: text-primary)

## Technical Requirements

### Component Structure

```
Navbar.tsx (client component)
├── Logo.tsx (link to home)
├── DesktopNav.tsx (hidden below lg)
│   └── NavLink.tsx (with underline animation)
├── MobileMenuButton.tsx (hidden above lg)
└── MobileOverlay.tsx (portal, conditional render)
    └── NavLink.tsx (large variant)
```

### Nav Link Configuration

```typescript
// lib/constants.ts
export const NAV_LINKS = [
  { label: 'Services', href: '/#services', type: 'scroll' },
  { label: 'About', href: '/about', type: 'page' },
  { label: 'Contact', href: '/contact', type: 'page' },
  // { label: 'Work', href: '/work', type: 'page' }, ← uncomment when ready
] as const;
```

### Scroll-to Behavior for Hash Links

When a user clicks "Services" from the home page: smooth scroll (via Lenis) to the `#services` section. When clicking "Services" from another page: navigate to `/#services`, then smooth scroll after page loads.

### Accessibility

- Mobile menu button: `aria-label="Open menu"` / `aria-label="Close menu"`, `aria-expanded` toggled
- Overlay: `role="dialog"`, `aria-modal="true"`, trap focus inside overlay when open
- All links: clearly focusable with visible focus ring
- Skip-to-content link: visually hidden, first element in tab order, visible on focus, links to `<main id="main">`

### Z-Index

```
Navbar: z-40
Mobile overlay: z-50
```

## Out of Scope

- Dropdown menus
- Search functionality in nav
- Theme toggle (dark/light) — site is dark only at launch
- Language selector
- Notification badges
