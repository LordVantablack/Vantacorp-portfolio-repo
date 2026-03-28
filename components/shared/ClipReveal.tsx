'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, prefersReducedMotion } from '@/lib/animations';

// clip-path starting values for each direction
const CLIP_FROM: Record<ClipDirection, string> = {
  bottom: 'inset(100% 0% 0% 0%)',
  top:    'inset(0% 0% 100% 0%)',
  left:   'inset(0% 100% 0% 0%)',
  right:  'inset(0% 0% 0% 100%)',
  center: 'inset(25% 25% 25% 25%)',
};

const CLIP_TO = 'inset(0% 0% 0% 0%)';

type ClipDirection = 'bottom' | 'top' | 'left' | 'right' | 'center';

interface ClipRevealProps {
  children: React.ReactNode;
  /** Edge the reveal starts from. Default: "bottom" */
  direction?: ClipDirection;
  /** Animation duration in seconds. Default: 1.0 */
  duration?: number;
  /** Seconds before animation starts. Default: 0 */
  delay?: number;
  className?: string;
}

export function ClipReveal({
  children,
  direction = 'bottom',
  duration = DURATION.slow,
  delay = 0,
  className,
}: ClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      if (prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger);

      // The inner content element scales slightly as it reveals (cinematic zoom-out)
      const inner = container.firstElementChild as HTMLElement | null;

      gsap.from(container, {
        clipPath: CLIP_FROM[direction],
        duration,
        delay,
        ease: EASE.primary,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete() {
          // Remove clip-path inline style so CSS can control it freely
          gsap.set(container, { clearProps: 'clipPath' });
        },
      });

      // Simultaneous subtle scale-down on inner content (1.1 → 1.0)
      if (inner) {
        gsap.from(inner, {
          scale: 1.1,
          duration: duration * 1.1, // slightly longer to feel natural
          delay,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onComplete() {
            gsap.set(inner, { clearProps: 'scale' });
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
