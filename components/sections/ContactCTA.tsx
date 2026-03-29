'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@/hooks/useGSAP';
import { FadeIn } from '@/components/shared/FadeIn';
import { WavePath } from '@/components/ui/wave-path';
import { EASE, DURATION, prefersReducedMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

// ── Copy ──────────────────────────────────────────────────────────────────────

const LINE_1 = 'Have a project in mind?';
const LINE_2 = "Let's make it real.";

const LINE_1_WORDS = LINE_1.split(' ');
const LINE_2_WORDS = LINE_2.split(' ');
const LINE_2_START = LINE_1_WORDS.length; // offset for the shared wordRefs array

// ── ContactCTA ────────────────────────────────────────────────────────────────

export function ContactCTA() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  // Flat ref array: line 1 words first, then line 2 words
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Scroll-triggered word-clip reveal — overflow:hidden wrappers mask each
  // word's inner span as it translates up into view. Same technique as Hero.
  useGSAP(
    () => {
      const spans = wordRefs.current.filter((s): s is HTMLSpanElement => s !== null);
      if (!spans.length || prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.from(spans, {
        yPercent: 100,
        duration: DURATION.slow,
        stagger: 0.08,
        ease: EASE.primary,
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete() {
          gsap.set(spans, { clearProps: 'transform' });
        },
      });
    },
    { scope: headlineRef },
  );

  return (
    <section
      id="contact-cta"
      className={cn(
        'relative w-full overflow-hidden',
        'bg-[var(--bg-elevated)]',
        // section-padding-y × 1.5 per PRD
        'py-[clamp(120px,18vh,240px)]',
        'px-[clamp(20px,5vw,80px)]',
        'border-y border-[var(--border-subtle)]',
      )}
    >
      {/* Radial accent glow — warm halo centered behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[700px] h-[400px]"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 50%, var(--accent-muted), transparent)',
          }}
        />
        {/* Secondary cool glow — offset for depth */}
        <div
          className="absolute w-[500px] h-[300px] translate-x-32 -translate-y-8"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, var(--accent-secondary-muted), transparent)',
          }}
        />
      </div>

      <div className="relative flex flex-col items-center text-center">
        {/* Headline — two lines, word-split scroll reveal */}
        <h2
          ref={headlineRef}
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[var(--text-primary)]',
            'text-[clamp(2.5rem,5vw,4.5rem)]',
            'leading-none tracking-[-0.02em]',
          )}
        >
          {/* Line 1 */}
          <span className="block">
            {LINE_1_WORDS.map((word, i) => (
              <span key={`l1-${i}`}>
                {i > 0 && '\u00A0'}
                {/* overflow:hidden clips the inner span as it slides up */}
                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    ref={(el) => { wordRefs.current[i] = el; }}
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </span>

          {/* Line 2 — accent tint */}
          <span className="block mt-1 text-[var(--accent)]">
            {LINE_2_WORDS.map((word, i) => (
              <span key={`l2-${i}`}>
                {i > 0 && '\u00A0'}
                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    ref={(el) => { wordRefs.current[LINE_2_START + i] = el; }}
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </span>
        </h2>

        {/* Subtext — fades up after headline stagger completes */}
        <FadeIn direction="up" distance={30} delay={0.3} className="mt-6">
          <p
            className={cn(
              'font-[family-name:var(--font-body)]',
              'text-[var(--text-secondary)] text-lg leading-relaxed',
              'max-w-[480px]',
            )}
          >
            We work with ambitious teams to build software that moves the needle.
            Tell us what you&apos;re working on.
          </p>
        </FadeIn>

        {/* Interactive Wave — fades up in sequence */}
        <FadeIn direction="up" distance={20} delay={0.4} className="mt-12 text-[var(--border-strong)] hover:text-[var(--accent)] transition-colors duration-500">
          <WavePath />
        </FadeIn>

        {/* CTA button — last to appear */}
        <FadeIn direction="up" distance={20} delay={0.5} className="mt-12">
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center justify-center rounded-full',
              'px-10 py-4 text-sm font-medium font-[family-name:var(--font-body)]',
              'bg-[var(--accent)] text-[var(--bg-primary)]',
              'transition-[colors,transform] duration-300',
              'hover:bg-[var(--accent-hover)] hover:scale-[1.02]',
              'active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4',
              'focus-visible:ring-offset-[var(--bg-elevated)]',
            )}
          >
            Get in Touch
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
