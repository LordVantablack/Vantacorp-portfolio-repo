// ---------------------------------------------------------------------------
// Animation constants — used by FadeIn, AnimatedText, ClipReveal, and any
// component that creates GSAP animations directly.
// No GSAP imports here — this file is safe to import in server components.
// ---------------------------------------------------------------------------

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 85%',       // trigger when top of element hits 85% down the viewport
  end: 'bottom 20%',
  toggleActions: 'play none none none',
};

export const EASE = {
  primary: 'power3.out',
  enter: 'power2.out',
  smooth: 'power1.inOut',
};

export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
};

export const STAGGER = {
  tight: 0.05,
  default: 0.1,
  relaxed: 0.15,
};

// ---------------------------------------------------------------------------
// Runtime utilities — client-only (guard with typeof window check)
// ---------------------------------------------------------------------------

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function getAnimationConfig() {
  const mobile = isMobile();
  return {
    stagger: mobile ? STAGGER.tight : STAGGER.default,
    parallaxSpeed: mobile ? 0 : 0.1,
    splitBy: (mobile ? 'words' : 'chars') as 'words' | 'chars',
  };
}
