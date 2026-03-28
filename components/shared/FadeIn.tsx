'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, prefersReducedMotion } from '@/lib/animations';

interface FadeInProps {
  children: React.ReactNode;
  /** Direction the element enters from. Default: "up" */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Seconds before animation starts. Default: 0 */
  delay?: number;
  /** Animation duration in seconds. Default: 0.6 */
  duration?: number;
  /** Distance in px the element travels. Default: 40 */
  distance?: number;
  /**
   * Fraction of element visible before triggering (0–1). Default: 0.15.
   * 0.15 = trigger when 15% of element is in the viewport.
   */
  threshold?: number;
  /**
   * Seconds between child animations. When > 0, direct children are
   * animated individually in sequence rather than the wrapper as a whole.
   */
  stagger?: number;
  /** Animate only once (don't reverse on scroll-up). Default: true */
  once?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = DURATION.medium,
  distance = 40,
  threshold = 0.15,
  stagger = 0,
  once = true,
  className,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      if (prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger);

      // When stagger is set, animate direct children individually.
      // When stagger is 0, animate the wrapper div as a single unit.
      const targets =
        stagger > 0 ? Array.from(container.children) : [container];

      if (targets.length === 0) return;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      if (direction === 'up') fromVars.y = distance;
      else if (direction === 'down') fromVars.y = -distance;
      else if (direction === 'left') fromVars.x = distance;
      else if (direction === 'right') fromVars.x = -distance;

      gsap.from(targets, {
        ...fromVars,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: EASE.primary,
        scrollTrigger: {
          trigger: container,
          // Convert threshold (0.15) → start position ("top 85%")
          start: `top ${Math.round((1 - threshold) * 100)}%`,
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
