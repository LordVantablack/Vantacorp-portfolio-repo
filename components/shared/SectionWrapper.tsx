// SectionWrapper — consistent section padding + background.
// Server component — no interactivity, no 'use client'.
//
// Abstracts the spacing values every section shares:
//   py-[clamp(80px,12vh,160px)]  — THEME.md --section-padding-y
//   px-[clamp(20px,5vw,80px)]    — THEME.md --container-padding-x
//
// Content inside manages its own max-width as needed (see Services.tsx for
// the pattern: inner text blocks use max-w-[640px], full-width items span freely).

import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type SectionAs = 'section' | 'div' | 'article';

interface SectionWrapperProps {
  children: React.ReactNode;
  /**
   * HTML id for scroll-to navigation.
   * CLAUDE.md: "Every <section> gets an id for scroll-to navigation."
   */
  id?: string;
  /** HTML element to render. Default: "section" */
  as?: SectionAs;
  /**
   * Background color override. Default: bg-[var(--bg-primary)].
   * Pass "elevated" for bg-[var(--bg-elevated)] (alternate sections).
   */
  background?: 'primary' | 'elevated' | 'surface';
  className?: string;
}

// ── Background map ────────────────────────────────────────────────────────────

const BG: Record<NonNullable<SectionWrapperProps['background']>, string> = {
  primary:  'bg-[var(--bg-primary)]',
  elevated: 'bg-[var(--bg-elevated)]',
  surface:  'bg-[var(--bg-surface)]',
};

// ── SectionWrapper ────────────────────────────────────────────────────────────

export function SectionWrapper({
  children,
  id,
  as: Tag = 'section',
  background = 'primary',
  className,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'w-full',
        BG[background],
        'px-[clamp(20px,5vw,80px)]',
        'py-[clamp(80px,12vh,160px)]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
