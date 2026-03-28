'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/components/shared/FadeIn';
import { cn } from '@/lib/utils';
import { TESTIMONIALS } from '@/data/testimonials';

// ── Constants ─────────────────────────────────────────────────────────────────

const ROTATE_INTERVAL_MS = 6000;
const EASE_PRIMARY = [0.16, 1, 0.3, 1] as const;

// ── Testimonials ──────────────────────────────────────────────────────────────

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasMultiple = TESTIMONIALS.length > 1;

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!hasMultiple) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, ROTATE_INTERVAL_MS);
  }

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDotClick(i: number) {
    setActive(i);
    startTimer();
  }

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className={cn(
        'w-full bg-[var(--bg-primary)]',
        'px-[clamp(20px,5vw,80px)]',
        'py-[clamp(80px,12vh,160px)]',
      )}
    >
      <div className="flex flex-col items-center text-center">
        {/* Section label */}
        <FadeIn direction="up" distance={20} className="w-full mb-16 md:mb-20">
          <span
            className={cn(
              'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
              'text-[var(--text-secondary)]',
            )}
          >
            04 / TESTIMONIALS
          </span>
        </FadeIn>

        <div className="w-full max-w-[800px] mx-auto">
          {/* Decorative opening quotation mark */}
          <FadeIn direction="none" duration={0.6}>
            <span
              aria-hidden="true"
              className={cn(
                'font-[family-name:var(--font-display)]',
                'text-[120px] leading-none select-none',
                'text-[var(--accent-muted)]',
                'block -mb-6',
              )}
            >
              &ldquo;
            </span>
          </FadeIn>

          {/* Quote — AnimatePresence cross-fade on rotation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: EASE_PRIMARY } }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_PRIMARY } }}
            >
              <FadeIn direction="up" distance={30}>
                <blockquote
                  className={cn(
                    'font-[family-name:var(--font-display)] font-normal',
                    'text-[clamp(1.5rem,3vw,2.25rem)]',
                    'leading-snug tracking-[-0.02em]',
                    'text-[var(--text-primary)]',
                  )}
                >
                  {t.quote}
                </blockquote>
              </FadeIn>

              {/* Attribution */}
              <FadeIn direction="up" distance={20} delay={0.2} className="mt-8">
                <footer className="font-[family-name:var(--font-body)]">
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    &mdash; {t.author}
                  </p>
                  <p className="text-base text-[var(--text-secondary)] mt-1">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </FadeIn>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators — only rendered when 2+ testimonials */}
          {hasMultiple && (
            <FadeIn direction="up" distance={10} delay={0.4} className="mt-10 flex justify-center gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDotClick(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    i === active
                      ? 'bg-[var(--accent)] scale-125'
                      : 'bg-transparent border border-[var(--border-subtle)] hover:border-[var(--accent)]',
                  )}
                />
              ))}
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
