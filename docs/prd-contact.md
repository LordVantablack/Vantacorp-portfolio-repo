# PRD: Contact Page

## Overview

The contact page converts interest into conversation. It should feel inviting but not desperate — confident, like someone who's happy to hear from you but doesn't need to beg for work. Two paths: a form for structured inquiries, and direct contact info for people who prefer email. No Calendly embed at launch — keep it simple.

## Layout

```
Desktop:
┌──────────────────────────────────────────────────────────────┐
│  [Nav]                                                       │
│                                                              │
│  Let's build                          Get in touch           │
│  something.                                                  │
│                                       Name *                 │
│  Ready to start a project             ──────────────         │
│  or just want to talk?                Email *                │
│  We'd love to hear from you.          ──────────────         │
│                                       Project type           │
│                                       ──────────────         │
│  info@vantalabs.dev                   Message *              │
│  +91 XXXX XXXX XX                     ──────────────         │
│                                       ──────────────         │
│  [GitHub] [LinkedIn] [X]              ──────────────         │
│                                                              │
│                                       [Send Message]         │
│                                                              │
│  [Footer]                                                    │
└──────────────────────────────────────────────────────────────┘

Mobile:
┌──────────────────────────┐
│  [Nav]                   │
│                          │
│  Let's build             │
│  something.              │
│                          │
│  Ready to start...       │
│  info@vantalabs.dev      │
│                          │
│  ── Form ──────────────  │
│  Name                    │
│  Email                   │
│  Project type            │
│  Message                 │
│  [Send Message]          │
│                          │
│  [Footer]                │
└──────────────────────────┘
```

## Left Column (Info)

- **Headline**: "Let's build something." — Syne, text-display, font-bold. Line break after "build" for visual rhythm.
- **Subtext**: "Ready to start a project or just want to talk? We'd love to hear from you." — DM Sans, text-body-lg, text-secondary, max-width 360px.
- **Email**: `info@vantalabs.dev` — DM Sans, text-body, text-primary. Clickable `mailto:` link with underline hover effect.
- **Phone** (optional): include if available. Same style as email.
- **Social links**: icon row (GitHub, LinkedIn, X/Twitter). 20px icons, text-secondary, hover: text-primary. 12px gap between icons.
- **Location** (optional): "Bengaluru, India" — text-small, text-tertiary.

## Right Column (Form)

### Form Fields

```typescript
interface ContactForm {
  name: string;          // Required
  email: string;         // Required, validated
  projectType: string;   // Optional, dropdown/select
  message: string;       // Required
}
```

**Field styling:**
- No traditional input borders. Use bottom-border-only inputs (underline style) for a clean, editorial look.
- Label: text-small, text-tertiary, uppercase, tracking-wide. Sits above the input.
- Input text: DM Sans, text-body, text-primary.
- Underline: 1px border-visible. On focus: transitions to accent color, 0.3s.
- Focus: no browser default outline. Instead, underline color changes to accent.
- Error state: underline turns error color, error message appears below in text-xs.

**Project Type field — select dropdown:**
Options: "Web Application", "Mobile App", "AI Integration", "Workflow Automation", "Other"
Style the select/dropdown to match the dark theme (custom dropdown, not native browser select).

**Message field:**
- Textarea, 4 rows minimum, auto-expands to content
- Same underline style as other inputs

**Submit button:**
- "Send Message" — primary accent button (from THEME.md)
- Full-width on mobile, auto-width on desktop
- States: default → hover (lighter) → loading (text changes to "Sending...", subtle spinner) → success ("Message sent ✓", green) → error ("Something went wrong", red, with retry)

### Form Behavior

**At launch (no backend):**
- Form is present and styled
- On submit: show a toast/notification: "Thanks for reaching out. We'll get back to you within 24 hours." (simulated success)
- The form data can be logged to console for now
- Architecture supports easy addition of: API route → Resend email, or a service like Formspree

**Future backend (Phase 2):**
- POST to `/api/contact`
- Server-side validation
- Send email via Resend to your inbox
- Rate limiting (5 submissions per IP per hour)
- Honeypot field for spam prevention

### Form Validation

- Client-side validation on blur (not on every keystroke)
- Email: basic format check via regex
- Name: min 2 characters
- Message: min 10 characters
- Show errors below each field, not as alerts
- Submit button disabled until all required fields are valid

## Animations

- Left column: headline text-split reveal on load, subtext + contact info stagger fade-up
- Right column: form fields stagger in from below (0.1s between each field), 0.3s after left column starts
- Submit button: fades in last
- On successful submit: form fades out, success message fades in (centered in the form area)

## Home Page CTA Section

The home page has a separate "Contact CTA" section at the bottom (before the footer) that drives to this page:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Have a project in mind?                                     │
│  Let's make it real.                                         │
│                                                              │
│  [Get in Touch]                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- Full-width section, generous padding (section-padding-y × 1.5)
- Text centered. Headline: text-display, Syne. Subtext: text-body-lg, text-secondary.
- Single accent button
- Optional: subtle gradient or grain texture on the background to distinguish from adjacent sections

## Technical

```
/app/contact/page.tsx — server component wrapper
ContactForm.tsx — client component (form state, validation)
ContactInfo.tsx — server component (static text + links)
ContactCTA.tsx — client component (home page CTA section, with animations)

Future:
/app/api/contact/route.ts — API route for form submission
```

## Accessibility

- All inputs have associated `<label>` elements (visually hidden if using placeholder-as-label pattern, but still present in DOM)
- Error messages linked via `aria-describedby`
- Form submission feedback announced to screen readers via `aria-live="polite"` region
- Tab order: Name → Email → Project Type → Message → Submit

## Out of Scope

- Calendly or scheduling embed
- Map embed showing location
- FAQ section
- Live chat widget
- File upload in the form
