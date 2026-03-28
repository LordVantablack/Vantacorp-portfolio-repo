# PRD: Footer

## Overview

The footer is functional, not a design moment. It provides navigation, contact info, and legal text. It should feel clean and complete — like a well-typeset colophon at the end of a book. Matches the restraint of WorldQuant Foundry's footer (minimal, organized, with a "Site by" credit).

## Layout

```
Desktop:
┌──────────────────────────────────────────────────────────────────┐
│  ─────────────────────────── (top border, border-subtle) ─────── │
│                                                                  │
│  VANTALABS                    Navigate           Connect         │
│  Software, engineered         Services            info@vanta...  │
│  to scale.                    About              GitHub          │
│                               Contact            LinkedIn        │
│                               Work               X / Twitter     │
│                                                                  │
│  ─────────────────────────── (divider) ──────────────────────── │
│                                                                  │
│  © 2026 VantaLabs.                    Built by VantaLabs.       │
│  All rights reserved.                                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

Mobile:
┌──────────────────────────┐
│  ────────── (border) ──  │
│                          │
│  VANTALABS               │
│  Software, engineered    │
│  to scale.               │
│                          │
│  Navigate                │
│  Services                │
│  About                   │
│  Contact                 │
│  Work                    │
│                          │
│  Connect                 │
│  info@vantalabs.dev      │
│  GitHub                  │
│  LinkedIn                │
│  X / Twitter             │
│                          │
│  ────────── (divider) ── │
│  © 2026 VantaLabs.      │
│  Built by VantaLabs.    │
└──────────────────────────┘
```

## Content

### Column 1 — Brand

- **Logo**: "VANTALABS" — Syne, font-bold, text-lg, text-primary
- **Tagline**: "Software, engineered to scale." — DM Sans, text-small, text-secondary. Below logo, 8px gap.

### Column 2 — Navigation

- **Column label**: "Navigate" — text-xs, uppercase, tracking-widest, text-tertiary, DM Sans. Label 16px above first link.
- **Links**: Services, About, Contact, Work — text-small, text-secondary, hover: text-primary. Vertical stack, 8px gap between links.
- Note: "Work" is included in the footer even if not in the main nav — footer is for completeness.

### Column 3 — Connect

- **Column label**: "Connect" — same style as Navigate label.
- **Email**: info@vantalabs.dev — text-small, text-secondary, hover: text-primary. `mailto:` link.
- **Social links**: text links (not icons in the footer — keep it typographic). GitHub, LinkedIn, X. Same style as nav links. External links open in new tab.

### Bottom Bar

- **Divider**: full-width, 1px, border-subtle. 40px above bottom bar.
- **Left**: "© 2026 VantaLabs. All rights reserved." — text-xs, text-tertiary.
- **Right**: "Built by VantaLabs." — text-xs, text-tertiary. This is a small flex: the site itself is proof of work. Links to the home page.
- On mobile: stacked, left-aligned.

## Visual Details

- **Top border**: 1px border-subtle across the full width of the viewport (not just the container). The content inside is still contained.
- **Background**: same as bg-primary. No distinct footer background needed. The top border provides separation.
- **Padding**: section-padding-y top, 40px bottom (less bottom padding since there's nothing below).
- **Grid**: 3 columns on desktop (40% | 30% | 30%), stacked on mobile.

## Animations

- Minimal. No scroll-triggered reveals. The footer should be immediately visible when scrolled to.
- Link hover underlines: same as nav links (slide-in from left).

## Technical

```
Footer.tsx — server component (no interactivity needed)
Uses constants from lib/constants.ts for nav links and social links
```

```typescript
// lib/constants.ts
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/vantalabs', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/vantalabs', external: true },
  { label: 'X', href: 'https://x.com/vantalabs', external: true },
] as const;

export const CONTACT_EMAIL = 'info@vantalabs.dev';
```

## Accessibility

- All external links have `target="_blank"` with `rel="noopener noreferrer"`
- External links include visually hidden text: "opens in new tab"
- Footer wrapped in `<footer>` element with `role="contentinfo"`
- Navigation section wrapped in `<nav aria-label="Footer navigation">`

## Out of Scope

- Newsletter signup
- Privacy policy / Terms pages (add when legally needed)
- Cookie consent banner (add when needed for compliance)
- Back-to-top button (Lenis smooth scroll handles this if needed)
- Dark/light mode toggle
