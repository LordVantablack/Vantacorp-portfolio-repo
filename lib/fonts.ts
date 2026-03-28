// ---------------------------------------------------------------------------
// Font configuration — per THEME.md typography spec.
// Variables are referenced in components via font-[family-name:var(--font-display)],
// font-[family-name:var(--font-body)], and font-[family-name:var(--font-mono)].
// throughout components. Weights are explicitly listed (Next.js requirement
// for non-variable fonts) to avoid layout shift on weight changes.
// ---------------------------------------------------------------------------

import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

/** Display / headings — Syne. Geometric, bold, distinctive. */
export const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

/** Body copy — DM Sans. Clean, geometric, highly readable at small sizes. */
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '700'],
});

/** Technical labels, code, monospaced accents — JetBrains Mono. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});
