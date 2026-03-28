'use client';

// Magnetic hover effect wrapper.
// Wraps any children — does not render a button itself.
// Actual button/anchor styling lives in the child element.
// Disabled automatically on touch devices and when prefers-reduced-motion is active.

import { useRef } from 'react';
import { gsap } from 'gsap';

import { useGSAP } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';
import { isMobile, prefersReducedMotion } from '@/lib/animations';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: React.ReactNode;
  /**
   * Maximum displacement in px from the element's resting position.
   * THEME.md specifies 8px. Increase carefully — subtlety is the goal.
   * Default: 8
   */
  intensity?: number;
  className?: string;
}

// ── MagneticButton ────────────────────────────────────────────────────────────

export function MagneticButton({
  children,
  intensity = 8,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      // No effect on touch devices (no cursor) or when motion is reduced.
      if (!el || prefersReducedMotion() || isMobile()) return;

      // gsap.quickTo returns a function that drives a single property toward
      // a target value each call — smoother than gsap.to for rapid updates.
      const xTo = gsap.quickTo(el, 'x', {
        duration: 0.4,
        ease: 'power2.out', // THEME.md magnetic easing: [0.23, 1, 0.32, 1] ≈ power2.out
      });
      const yTo = gsap.quickTo(el, 'y', {
        duration: 0.4,
        ease: 'power2.out',
      });

      function onMouseMove(e: MouseEvent) {
        const rect = el!.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        // Apply 25% of the raw offset, clamped to ±intensity.
        // At typical cursor travel (~40px from center), this gives ~8–10px
        // displacement — noticeable enough to feel alive, subtle enough to
        // feel refined.
        xTo(Math.max(-intensity, Math.min(intensity, dx * 0.25)));
        yTo(Math.max(-intensity, Math.min(intensity, dy * 0.25)));
      }

      function onMouseLeave() {
        // Spring back to origin — THEME.md: "Spring back on mouse leave: 0.4s"
        xTo(0);
        yTo(0);
      }

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
        // Clear any residual transform so the element rests at its natural position.
        gsap.set(el, { x: 0, y: 0 });
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {children}
    </div>
  );
}
