import Link from 'next/link';

import { cn } from '@/lib/utils';
import { CONTACT_EMAIL, FOOTER_NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

// ── Shared styles ─────────────────────────────────────────────────────────────

const linkClass = cn(
  'relative pb-px w-fit',
  'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  'transition-colors duration-300',
  // Underline slides in from left on hover — same technique as Navbar
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0',
  'after:bg-[var(--accent)] after:transition-[width] after:duration-300 hover:after:w-full',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm',
);

const columnLabelClass = cn(
  'font-[family-name:var(--font-body)] text-xs uppercase tracking-widest',
  'text-[var(--text-tertiary)] mb-4 block',
);

// ── Footer ────────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-[var(--border-subtle)]">
      {/* Main grid — full-width outer, padded inner */}
      <div className="px-[clamp(20px,5vw,80px)]">
        <div
          className={cn(
            'grid grid-cols-1 gap-12',
            'md:grid-cols-[2fr_1.5fr_1.5fr]',
            'pt-[clamp(80px,12vh,160px)] pb-10',
          )}
        >
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className={cn(
                'font-[family-name:var(--font-display)] font-bold text-lg tracking-tight',
                'text-[var(--text-primary)] w-fit',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm',
              )}
            >
              VANTALABS
            </Link>
            <p className="font-[family-name:var(--font-body)] text-sm text-[var(--text-secondary)]">
              Software, engineered to scale.
            </p>
          </div>

          {/* Column 2 — Navigate */}
          <nav aria-label="Footer navigation">
            <span className={columnLabelClass}>Navigate</span>
            <ul className="flex flex-col gap-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cn(linkClass, 'text-sm')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Connect */}
          <div>
            <span className={columnLabelClass}>Connect</span>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={cn(linkClass, 'text-sm')}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, 'text-sm')}
                  >
                    {social.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-subtle)] py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-body)] text-xs text-[var(--text-tertiary)]">
            &copy; {year} VantaLabs. All rights reserved.
          </p>
          <Link
            href="/"
            className={cn(
              'font-[family-name:var(--font-body)] text-xs text-[var(--text-tertiary)]',
              'hover:text-[var(--text-secondary)] transition-colors duration-300 w-fit',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm',
            )}
          >
            Built by VantaLabs.
          </Link>
        </div>
      </div>
    </footer>
  );
}
