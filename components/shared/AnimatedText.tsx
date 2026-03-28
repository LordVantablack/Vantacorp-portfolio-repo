'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, STAGGER, isMobile, prefersReducedMotion } from '@/lib/animations';

// Supported heading / text elements
type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface AnimatedTextProps {
  children: string;
  /** HTML element to render. Default: "p" */
  as?: TextTag;
  /** How to split the text. Default: "words" */
  splitBy?: 'chars' | 'words' | 'lines';
  /** Seconds between each unit. Default: STAGGER.default (0.1) */
  stagger?: number;
  /** Duration per unit in seconds. Default: DURATION.medium (0.6) */
  duration?: number;
  /** Delay before the first unit animates. Default: 0 */
  delay?: number;
  /**
   * "scroll" triggers when the element scrolls into view.
   * "load"   triggers immediately on mount (for hero text).
   * Default: "scroll"
   */
  trigger?: 'scroll' | 'load';
  className?: string;
}

export function AnimatedText({
  children,
  as: Tag = 'p',
  splitBy = 'words',
  stagger = STAGGER.default,
  duration = DURATION.medium,
  delay = 0,
  trigger = 'scroll',
  className,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      // Degrade to word splits on mobile for performance
      const by: 'chars' | 'words' | 'lines' = isMobile()
        ? 'words'
        : splitBy;

      // SplitText requires 'chars,words' to access chars reliably;
      // always include lines so we can apply overflow masking.
      const splitType =
        by === 'chars'
          ? ('chars,words,lines' as const)
          : by === 'words'
            ? ('words,lines' as const)
            : ('lines' as const);

      const split = new SplitText(el, { type: splitType });

      const units =
        by === 'chars'
          ? split.chars
          : by === 'words'
            ? split.words
            : split.lines;

      // Apply overflow:hidden to the mask layer so translateY reveals from below.
      // For chars/words: mask at the line level.
      // For lines:       mask at the element level.
      if (by === 'lines') {
        gsap.set(el, { overflow: 'hidden' });
      } else {
        split.lines.forEach((line) => {
          gsap.set(line, { overflow: 'hidden', display: 'block' });
        });
        // SplitText creates <div> elements (display:block by default).
        // Explicitly force inline-block so words/chars flow on one line.
        gsap.set(split.words, { display: 'inline-block' });
        if (by === 'chars') {
          gsap.set(split.chars, { display: 'inline-block' });
        }
      }

      const scrollTriggerConfig: gsap.TweenVars =
        trigger === 'scroll'
          ? {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          : {};

      gsap.from(units, {
        opacity: 0,
        yPercent: 110, // slightly past 100% to clear line overflow
        duration,
        delay,
        stagger,
        ease: EASE.primary,
        ...scrollTriggerConfig,
        onComplete() {
          // Clear GSAP inline styles — text remains visible via natural CSS
          gsap.set(units, { clearProps: 'all' });
          // Revert overflow masking on lines
          if (by === 'lines') {
            gsap.set(el, { clearProps: 'overflow' });
          } else {
            split.lines.forEach((line) => {
              gsap.set(line, { clearProps: 'all' });
            });
          }
        },
      });

      // Cleanup on unmount — restores original DOM structure
      return () => {
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    // aria-label preserves the original string for screen readers even while
    // the text is split into many child spans by GSAP SplitText.
    <Tag
      // RefObject<HTMLElement> → Ref<HTMLHeadingElement|HTMLParagraphElement|HTMLSpanElement>
      // requires going through unknown; safe because only HTMLElement APIs are
      // accessed inside the useGSAP callback.
      ref={ref as unknown as React.Ref<HTMLHeadingElement>}
      aria-label={children}
      className={className}
    >
      {children}
    </Tag>
  );
}
