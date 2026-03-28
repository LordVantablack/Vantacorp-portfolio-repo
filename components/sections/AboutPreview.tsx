'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { AnimatedText } from '@/components/shared/AnimatedText';
import { FadeIn } from '@/components/shared/FadeIn';
import { cn } from '@/lib/utils';

// ── AboutPreview ──────────────────────────────────────────────────────────────

export function AboutPreview() {
  return (
    <section
      id="about"
      className={cn(
        'w-full bg-[var(--bg-primary)]',
        'px-[clamp(20px,5vw,80px)]',
        'py-[clamp(80px,12vh,160px)]',
        'border-t border-[var(--border-subtle)]',
      )}
    >
      {/* Section label */}
      <FadeIn direction="up" distance={20} className="mb-12 md:mb-16">
        <span
          className={cn(
            'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
            'text-[var(--text-secondary)]',
          )}
        >
          03 / ABOUT
        </span>
      </FadeIn>

      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-[1fr_1fr]',
          'gap-[clamp(48px,6vw,96px)]',
          'items-start',
        )}
      >
        {/* Left: headline */}
        <AnimatedText
          as="h2"
          splitBy="words"
          stagger={0.08}
          duration={0.9}
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[var(--text-primary)]',
            'text-[clamp(2.5rem,5vw,4.5rem)]',
            'leading-none tracking-[-0.02em]',
          )}
        >
          A technical partner, not a vendor.
        </AnimatedText>

        {/* Right: copy + CTA */}
        <div className="flex flex-col gap-8 lg:pt-2">
          <FadeIn direction="up" distance={30} delay={0.15}>
            <p
              className={cn(
                'font-[family-name:var(--font-body)]',
                'text-[var(--text-secondary)] text-lg leading-relaxed',
                'max-w-[540px]',
              )}
            >
              We&apos;re a lean, senior-level studio that treats every engagement
              like a product. Deep technical rigor, tight feedback loops, and an
              obsession with shipping software that actually works at scale.
            </p>
          </FadeIn>

          <FadeIn direction="up" distance={20} delay={0.25}>
            <Link
              href="/about"
              className={cn(
                'group inline-flex items-center gap-2',
                'font-[family-name:var(--font-body)] text-sm font-medium',
                'text-[var(--text-secondary)]',
                'transition-colors duration-300 hover:text-[var(--text-primary)]',
                'relative',
                'after:absolute after:bottom-[-2px] after:left-0',
                'after:h-px after:w-0 after:bg-[var(--accent)]',
                'after:transition-[width] after:duration-300',
                'hover:after:w-full',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--accent)] rounded-sm',
              )}
            >
              Our story
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
