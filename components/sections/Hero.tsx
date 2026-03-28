'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@/hooks/useGSAP';
import { FadeIn } from '@/components/shared/FadeIn';
import { DURATION, EASE, prefersReducedMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

// ── Types ────────────────────────────────────────────────────────────────────

interface MarqueeImage {
  src: string;
  alt: string;
}

export interface HeroProps {
  agencyName: string;
  tagline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  marqueeImages?: MarqueeImage[];
}

// ── Marquee placeholder gradients ────────────────────────────────────────────

const PLACEHOLDERS = [
  'from-[#1c1c3a] to-[#0d0d22]',
  'from-[#1c2210] to-[#121808]',
  'from-[#2a1414] to-[#1a0c0c]',
  'from-[#14142e] to-[#0d0d22]',
  'from-[#182218] to-[#0e180e]',
  'from-[#301e0e] to-[#1e1008]',
  'from-[#0e2020] to-[#081818]',
  'from-[#1e1030] to-[#140c1e]',
] as const;

// 8 placeholder items used when no real marquee images are supplied
const DEFAULT_IMAGES: MarqueeImage[] = Array.from({ length: 8 }, (_, i) => ({
  src: '',
  alt: `Project preview ${i + 1}`,
}));

// ── ScrollIndicator ──────────────────────────────────────────────────────────

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay: visible ? 1.5 : 0 }}
    >
      <span className="font-[family-name:var(--font-body)] text-[var(--text-tertiary)] text-xs uppercase tracking-widest">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-[var(--text-tertiary)]"
        animate={{ scaleY: [1, 0.35, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

// ── ImageMarquee ─────────────────────────────────────────────────────────────

interface ImageMarqueeProps {
  images: MarqueeImage[];
  delay: number;
}

function ImageMarquee({ images, delay }: ImageMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Persists the running tween so hover handlers can adjust its timeScale
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Double the images for a seamless loop
  const items = [...images, ...images];

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger);

      // Hidden until the timed reveal
      gsap.set(container, { opacity: 0 });

      // Animate xPercent -50: moves exactly one copy-width left (half of the
      // doubled track) then GSAP loops back to 0 seamlessly on repeat.
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 28,   // approx 30 px/s effective speed
        ease: 'none',
        repeat: -1,
        paused: true,
      });

      tweenRef.current = tween;

      // Fade marquee in, then start scrolling
      gsap.to(container, {
        opacity: 1,
        duration: DURATION.slow,
        delay,
        onComplete: () => { tween.play(); },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef },
  );

  // Slow to ~10 px/s on hover, restore on leave
  const handleMouseEnter = useCallback(() => {
    const t = tweenRef.current;
    if (t) gsap.to(t, { timeScale: 0.33, duration: 0.6, ease: 'power2.out' });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const t = tweenRef.current;
    if (t) gsap.to(t, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Edge fade — left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent"
      />
      {/* Edge fade — right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent"
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{ willChange: 'transform' }}
      >
        {items.map((img, i) => (
          <div
            key={`marquee-${i}`}
            className="relative flex-shrink-0 w-[280px] md:w-[360px] lg:w-[420px] aspect-[16/10] rounded-lg overflow-hidden"
          >
            {img.src ? (
              <>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="420px"
                  className="object-cover"
                />
                {/* Desaturation overlay per PRD */}
                <div className="absolute inset-0 bg-[var(--bg-primary)]/40" />
              </>
            ) : (
              // Gradient placeholder until real screenshots exist
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br',
                  PLACEHOLDERS[i % PLACEHOLDERS.length],
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({
  agencyName,
  tagline,
  primaryCTA,
  secondaryCTA,
  marqueeImages = DEFAULT_IMAGES,
}: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Headline reveal — each word's inner span slides up through an overflow:hidden
  // wrapper. No SplitText: the DOM is already correct before any JS runs, so
  // there is no flash of unstyled/reordered content.
  useGSAP(
    () => {
      const spans = wordSpanRefs.current.filter(
        (s): s is HTMLSpanElement => s !== null,
      );
      if (!spans.length || prefersReducedMotion()) return;

      gsap.from(spans, {
        yPercent: 100,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.1,
        ease: EASE.primary,
        onComplete() {
          gsap.set(spans, { clearProps: 'transform' });
        },
      });
    },
    { scope: headlineRef },
  );

  // Subtle mouse parallax on the text block (desktop only, honours reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      // Normalised to [-1, 1]
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      targetRef.current.x = lerp(targetRef.current.x, mouseRef.current.x, 0.05);
      targetRef.current.y = lerp(targetRef.current.y, mouseRef.current.y, 0.05);

      if (contentRef.current) {
        // Max ±8 px displacement, opposite to mouse direction
        gsap.set(contentRef.current, {
          x: targetRef.current.x * -8,
          y: targetRef.current.y * -8,
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      const el = contentRef.current;
      if (el) gsap.set(el, { x: 0, y: 0 });
    };
  }, [isTouchDevice]);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Upper 60% — text and CTAs */}
      <div
        ref={contentRef}
        className="flex-[0_0_60%] flex flex-col justify-center px-[clamp(20px,5vw,80px)]"
      >
        {/* Agency name — each word is a clip wrapper + animated inner span.
            No SplitText: DOM is static from first paint, no flash possible.
            Parent opacity stays 1; the overflow:hidden wrappers do the masking. */}
        <h1
          ref={headlineRef}
          className={cn(
            'font-[family-name:var(--font-display)] font-extrabold uppercase',
            'text-[var(--text-primary)] leading-none tracking-[-0.02em]',
            'text-[clamp(3.5rem,8vw,7rem)]',
          )}
        >
          {agencyName.split(' ').map((word, i) => (
            <span key={i}>
              {/* Non-breaking space preserves inter-word gap on multi-word names */}
              {i > 0 && '\u00A0'}
              {/* overflow:hidden clips the inner span as it slides up */}
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  ref={(el) => { wordSpanRefs.current[i] = el; }}
                  className="inline-block"
                >
                  {word}
                </span>
              </span>
            </span>
          ))}
        </h1>

        {/* Tagline — fade up at 0.6 s */}
        <FadeIn delay={0.6} direction="up" distance={20} duration={DURATION.medium}>
          <p
            className={cn(
              'mt-4 font-[family-name:var(--font-body)] font-normal',
              'text-[var(--text-secondary)]',
              'text-[clamp(1.125rem,2vw,1.5rem)]',
            )}
          >
            {tagline}
          </p>
        </FadeIn>

        {/* CTAs — fade up at 0.9 s */}
        <FadeIn delay={0.9} direction="up" distance={20} duration={DURATION.medium}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={primaryCTA.href}
              className={cn(
                'inline-flex items-center justify-center rounded-full',
                'px-8 py-3 text-sm font-medium font-[family-name:var(--font-body)]',
                'bg-[var(--accent)] text-[var(--bg-primary)]',
                'transition-[colors,transform] duration-300 hover:bg-[var(--accent-hover)] hover:scale-[1.02]',
                'active:scale-[0.98]',
              )}
            >
              {primaryCTA.label}
            </Link>
            <Link
              href={secondaryCTA.href}
              className={cn(
                'inline-flex items-center justify-center rounded-full',
                'px-8 py-3 text-sm font-medium font-[family-name:var(--font-body)]',
                'border border-[var(--border-visible)] text-[var(--text-primary)]',
                'transition-colors duration-300',
                'hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]',
                'active:scale-[0.98]',
              )}
            >
              {secondaryCTA.label}
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Lower 40% — image marquee */}
      <div className="flex-[0_0_40%] flex items-center min-h-0">
        <ImageMarquee images={marqueeImages} delay={1.1} />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
