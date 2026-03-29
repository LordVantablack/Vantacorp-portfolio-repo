'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useLenis } from 'lenis/react';

import { cn } from '@/lib/utils';
import { CONTACT_EMAIL, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Framer Motion variants — defined outside component to avoid re-creation
// ---------------------------------------------------------------------------

const overlayVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const linkListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 as const } },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const noMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

// ---------------------------------------------------------------------------
// NavLink — desktop variant with underline reveal
// ---------------------------------------------------------------------------

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

function NavLink({ href, label, onClick, className }: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    href === '/'
      ? pathname === '/'
      : href.startsWith('/#')
        ? false // hash links are never "active" by pathname
        : pathname.startsWith(href);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.slice(2);
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(href);
      }
      onClick?.();
      return;
    }
    onClick?.();
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'relative pb-px',
        'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
        'transition-colors duration-300',
        // underline reveal
        'after:absolute after:bottom-0 after:left-0 after:h-px',
        'after:bg-[var(--accent)] after:transition-[width] after:duration-300',
        isActive ? 'after:w-full text-[var(--text-primary)]' : 'after:w-0 hover:after:w-full',
        // focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm',
        className,
      )}
    >
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// MobileMenuButton — two lines morphing to X
// ---------------------------------------------------------------------------

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className={cn(
        'relative flex h-11 w-11 flex-col items-center justify-center gap-[5px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm',
        'lg:hidden',
      )}
    >
      <span
        className={cn(
          'block h-px w-5 bg-[var(--text-primary)] origin-center transition-transform duration-300 ease-in-out',
          isOpen && 'rotate-45 translate-y-[5px]',
        )}
      />
      <span
        className={cn(
          'block h-px w-5 bg-[var(--text-primary)] origin-center transition-transform duration-300 ease-in-out',
          isOpen && '-rotate-45 -translate-y-[5px]',
        )}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Social icon map
// ---------------------------------------------------------------------------

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

// ---------------------------------------------------------------------------
// MobileOverlay — full-screen nav panel
// ---------------------------------------------------------------------------

interface MobileOverlayProps {
  onClose: () => void;
  prefersReducedMotion: boolean;
}

function MobileOverlay({ onClose, prefersReducedMotion }: MobileOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      overlay.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    // Move focus to first element
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const ol = prefersReducedMotion ? noMotionVariants : overlayVariants;
  const ll = prefersReducedMotion ? noMotionVariants : linkListVariants;
  const li = prefersReducedMotion ? noMotionVariants : linkItemVariants;

  return (
    <motion.div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      variants={ol}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'fixed inset-0 z-50 flex flex-col',
        'bg-[var(--bg-primary)] px-[clamp(20px,5vw,80px)]',
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between h-16">
        <Link
          href="/"
          onClick={onClose}
          className={cn(
            'font-[family-name:var(--font-display)] font-bold text-lg tracking-tight',
            'text-[var(--text-primary)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
          )}
        >
          VANTALABS
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={cn(
            'flex h-11 w-11 items-center justify-center',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'transition-colors duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
          )}
        >
          {/* X icon — two rotated lines */}
          <span className="relative flex h-5 w-5">
            <span className="absolute inset-y-1/2 left-0 right-0 h-px bg-current rotate-45" />
            <span className="absolute inset-y-1/2 left-0 right-0 h-px bg-current -rotate-45" />
          </span>
        </button>
      </div>

      {/* Links — centered in remaining space */}
      <motion.nav
        variants={ll}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-1 flex-col items-start justify-center gap-6"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <motion.div key={link.href} variants={li}>
            <NavLink
              href={link.href}
              label={link.label}
              onClick={onClose}
              className={cn(
                'font-[family-name:var(--font-display)] font-bold',
                'text-[clamp(2rem,4vw,3rem)] tracking-tight leading-none',
                'text-[var(--text-primary)] hover:text-[var(--text-primary)]',
                // override desktop underline sizing for large links
                'after:h-[2px]',
              )}
            />
          </motion.div>
        ))}
      </motion.nav>

      {/* Footer info */}
      <div className="pb-8 flex flex-col gap-4">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={cn(
            'text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'transition-colors duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
          )}
        >
          {CONTACT_EMAIL}
        </a>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => {
            const Icon = ICON_MAP[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
                )}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Navbar — main export
// ---------------------------------------------------------------------------

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenis = useLenis();

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  // Scroll detection
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      // Only hide after 100px to avoid jitter near the top
      setHidden(y > lastY && y > 100);
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock — stop/start Lenis so the smooth scroll instance doesn't
  // continue scrolling behind the mobile overlay.
  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Skip-to-content — first focusable element on the page */}
      <a
        href="#main"
        className={cn(
          'sr-only',
          'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]',
          'focus:px-4 focus:py-2 focus:rounded',
          'focus:bg-[var(--bg-elevated)] focus:text-[var(--text-primary)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2',
          'focus:ring-offset-[var(--bg-primary)]',
        )}
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'transition-transform duration-300 ease-in-out',
          hidden && !menuOpen && '-translate-y-full',
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            'flex items-center justify-between',
            'h-16 lg:h-[72px]',
            'px-[clamp(20px,5vw,80px)]',
            'transition-all duration-300 ease-in-out',
            scrolled &&
              'bg-[rgba(6,6,8,0.85)] backdrop-blur-xl border-b border-[var(--border-subtle)]',
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-[family-name:var(--font-display)] font-bold text-lg tracking-tight',
              'text-[var(--text-primary)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm',
            )}
          >
            VANTALABS
          </Link>

          {/* Desktop links */}
          <div
            className="hidden lg:flex items-center gap-8"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.href} role="listitem">
                <NavLink
                  href={link.href}
                  label={link.label}
                  className={cn(
                    'font-[family-name:var(--font-body)] font-medium',
                    'text-sm uppercase tracking-wider',
                  )}
                />
              </div>
            ))}
          </div>

          {/* Mobile hamburger */}
          <MobileMenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MobileOverlay
            onClose={closeMenu}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
