// NumberedItem — "01 / 04" style labeled item.
// Server component — purely presentational, no interactivity.
//
// Covers two REFERENCE.md patterns from WorldQuant Foundry:
//   1. Section header label:  "01 / SERVICES"  (index + label)
//   2. Positional counter:    "01 / 04"         (index + total)
//   3. Solo index:            "01"              (index only)
//
// Usage examples:
//   <NumberedItem index={1} label="Services" title="What we build" titleAs="h2" />
//   <NumberedItem index={1} total={4} title="Discovery" description="..." />

import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type TitleLevel = 'h2' | 'h3' | 'h4';

interface NumberedItemProps {
  /**
   * 1-based position. Rendered as a zero-padded two-digit string ("01", "02"…).
   */
  index: number;
  /**
   * When provided, formats the counter as "01 / 04".
   * Takes precedence over `label`.
   */
  total?: number;
  /**
   * When provided (and no `total`), formats the counter as "01 / SERVICES".
   * Automatically uppercased.
   */
  label?: string;
  /** The heading text. Required. */
  title: string;
  /**
   * HTML heading level. Controls both the element and the font-size.
   * Default: "h3"
   */
  titleAs?: TitleLevel;
  /** Optional body copy rendered below the title. Max-width: 640px. */
  description?: string;
  /** Slot for additional content rendered below the description. */
  children?: React.ReactNode;
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// Title size map — mirrors THEME.md type scale.
// h2 uses display size (section titles), h3/h4 use component-level sizes.
const TITLE_SIZE: Record<TitleLevel, string> = {
  h2: 'text-[clamp(2.5rem,5vw,4.5rem)] leading-none',
  h3: 'text-[clamp(1.25rem,2vw,1.5rem)] leading-tight',
  h4: 'text-[1.125rem]               leading-snug',
};

// ── NumberedItem ──────────────────────────────────────────────────────────────

export function NumberedItem({
  index,
  total,
  label,
  title,
  titleAs: TitleTag = 'h3',
  description,
  children,
  className,
}: NumberedItemProps) {
  // Build counter string: "01 / 04", "01 / SERVICES", or just "01"
  const counter = total
    ? `${pad(index)} / ${pad(total)}`
    : label
      ? `${pad(index)} / ${label.toUpperCase()}`
      : pad(index);

  return (
    <div className={cn('', className)}>
      {/* Numbered label — mono, xs, uppercase, tracking-widest per THEME.md */}
      <span
        className={cn(
          'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
          'text-[var(--text-secondary)] block mb-4',
        )}
      >
        {counter}
      </span>

      {/* Title */}
      <TitleTag
        className={cn(
          'font-[family-name:var(--font-display)] font-bold',
          'text-[var(--text-primary)] tracking-[-0.02em]',
          TITLE_SIZE[TitleTag],
        )}
      >
        {title}
      </TitleTag>

      {/* Optional description — body text, secondary color, max 640px */}
      {description && (
        <p
          className={cn(
            'font-[family-name:var(--font-body)]',
            'text-[var(--text-secondary)] leading-relaxed',
            'max-w-[640px] mt-3',
          )}
        >
          {description}
        </p>
      )}

      {/* Optional children slot */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
