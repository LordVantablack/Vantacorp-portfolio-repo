'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Github, Linkedin } from 'lucide-react';

import { useGSAP } from '@/hooks/useGSAP';
import { FadeIn } from '@/components/shared/FadeIn';
import { cn } from '@/lib/utils';
import { EASE, prefersReducedMotion } from '@/lib/animations';

// ── Data ──────────────────────────────────────────────────────────────────────

const PHILOSOPHY = [
  {
    id: 'depth',
    body: 'Technical depth matters. We understand the systems we build — not just the frameworks on top of them. Every architecture decision is deliberate, with an eye on how this system behaves at scale.',
  },
  {
    id: 'ai',
    body: "We leverage AI as a force multiplier, not a replacement for engineering judgment. Intelligence amplifies the work; it doesn't substitute for the craft of building reliable software.",
  },
  {
    id: 'speed',
    body: 'Speed without sacrificing quality. Lean team, tight feedback loops, no bureaucracy. We ship fast because we stay focused — not because we cut corners.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Understanding the problem before writing a single line of code. We ask the questions that save months later.',
  },
  {
    number: '02',
    title: 'Architecture',
    description:
      'Designing systems that scale — choosing the right tools, not the trendy ones. Structure is set here.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Rapid, iterative development with continuous delivery. You see progress daily, not at the end of a sprint.',
  },
  {
    number: '04',
    title: 'Launch & Iterate',
    description:
      "Deployment, monitoring, and ongoing refinement. We don't disappear after launch — that's when the real work starts.",
  },
];

const FOUNDER = {
  initials: 'VL',
  name: 'Founder Name',
  role: 'Founder & Lead Engineer',
  bio: 'A software engineer with a background spanning full-stack web, mobile, and systems design. Driven by the belief that great software is the intersection of deep technical rigor and genuine product thinking.',
  github: 'https://github.com/vantalabs',
  linkedin: 'https://linkedin.com/company/vantalabs',
};

// ── AboutHeroText ─────────────────────────────────────────────────────────────
//
// Manual line-reveal for the hero h1 — no SplitText, no GSAP word-splitting.
//
// Why manual spans instead of AnimatedText/SplitText:
//   SplitText wraps each word in a <div> (block by default). GSAP then sets
//   display:inline-block, but there is a window between mount and that set where
//   every word renders on its own line. On fast connections the flash is brief;
//   on SSR/hydration it is guaranteed visible.
//
// How this works:
//   Each phrase is a hard-coded editorial line — outer span is overflow:hidden,
//   inner span is the animating unit (slides up from below the clip boundary).
//   Text is fully readable in the DOM before JS runs (SSR/a11y safe).
//   useGSAP runs in useLayoutEffect — GSAP sets yPercent:110 before the browser
//   paints the client frame, so there is no flash of pre-animation state.

const HERO_LINES = [
  "We're a development studio",
  'that treats every project',
  'like a product.',
  'Not an agency that churns out websites —',
  'a technical partner that builds software',
  "you'd stake your business on.",
];

function AboutHeroText({ className }: { className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || prefersReducedMotion()) return;

      const inner = container.querySelectorAll<HTMLSpanElement>('[data-line-inner]');

      gsap.from(inner, {
        yPercent: 110,
        duration: 1.0,
        stagger: 0.08,
        ease: EASE.primary,
        delay: 0.1,
      });
    },
    { scope: containerRef },
  );

  return (
    <h1 ref={containerRef} className={className}>
      {HERO_LINES.map((line, i) => (
        // Outer span: clips the inner span as it rises from below
        <span key={i} className="block overflow-hidden leading-tight">
          {/* Inner span: the animated unit — starts below the clip boundary */}
          <span data-line-inner="" className="block">
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

// ── ProcessStep ───────────────────────────────────────────────────────────────

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="border-b border-[var(--border-subtle)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
      <span
        className={cn(
          'font-[family-name:var(--font-mono)] text-sm tabular-nums flex-shrink-0',
          'text-[var(--text-tertiary)]',
        )}
      >
        {number}
      </span>
      <div className="flex flex-col gap-2 max-w-[560px]">
        <h3
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[clamp(1.25rem,2vw,1.5rem)] tracking-[-0.02em]',
            'text-[var(--text-primary)]',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'font-[family-name:var(--font-body)]',
            'text-[var(--text-secondary)] text-base leading-relaxed',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  title: string;
}

function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <FadeIn direction="up" distance={30} className="mb-12 md:mb-16">
      <span
        className={cn(
          'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
          'text-[var(--text-secondary)] block mb-4',
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          'font-[family-name:var(--font-display)] font-bold',
          'text-[var(--text-primary)]',
          'text-[clamp(2.5rem,5vw,4.5rem)]',
          'leading-none tracking-[-0.02em]',
        )}
      >
        {title}
      </h2>
    </FadeIn>
  );
}

// ── AboutContent ──────────────────────────────────────────────────────────────

export function AboutContent() {
  return (
    <div className="w-full bg-[var(--bg-primary)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'px-[clamp(20px,5vw,80px)]',
          // Offset for fixed navbar
          'pt-[calc(clamp(80px,12vh,160px)+72px)]',
          'pb-[clamp(80px,12vh,160px)]',
          'border-b border-[var(--border-subtle)]',
        )}
      >
        <FadeIn direction="up" distance={20} className="mb-6">
          <span
            className={cn(
              'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
              'text-[var(--text-secondary)]',
            )}
          >
            About VantaLabs
          </span>
        </FadeIn>

        <AboutHeroText
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[var(--text-primary)]',
            'text-[clamp(2rem,4vw,3rem)]',
            'leading-tight tracking-[-0.02em]',
            'max-w-[860px]',
          )}
        />
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section
        className={cn(
          'px-[clamp(20px,5vw,80px)]',
          'py-[clamp(80px,12vh,160px)]',
          'border-b border-[var(--border-subtle)]',
        )}
      >
        <SectionHeader label="Our Philosophy" title="How we think" />

        <div className="flex flex-col gap-8 max-w-[640px]">
          {PHILOSOPHY.map((p, i) => (
            <FadeIn key={p.id} direction="up" distance={30} delay={i * 0.1}>
              <p
                className={cn(
                  'font-[family-name:var(--font-body)]',
                  'text-[var(--text-secondary)] text-lg leading-relaxed',
                )}
              >
                {p.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'px-[clamp(20px,5vw,80px)]',
          'py-[clamp(80px,12vh,160px)]',
          'border-b border-[var(--border-subtle)]',
        )}
      >
        <SectionHeader label="How We Work" title="Our process" />

        <div className="border-t border-[var(--border-subtle)]">
          {PROCESS_STEPS.map((step, i) => (
            <FadeIn key={step.number} direction="up" distance={30} delay={i * 0.07}>
              <ProcessStep
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'px-[clamp(20px,5vw,80px)]',
          'py-[clamp(80px,12vh,160px)]',
          'border-b border-[var(--border-subtle)]',
        )}
      >
        <SectionHeader label="The Team" title="Who we are" />

        <FadeIn direction="up" distance={40}>
          {/* Founder card — grid-ready for future team members */}
          <div className="inline-flex flex-col gap-6 max-w-[360px]">
            {/* Photo / initials placeholder */}
            <div
              className={cn(
                'w-full aspect-[4/3] rounded-xl overflow-hidden',
                'bg-[var(--bg-elevated)] border border-[var(--border-subtle)]',
                'flex items-center justify-center',
              )}
              style={{
                background:
                  'radial-gradient(ellipse 80% 80% at 50% 50%, var(--bg-surface), var(--bg-elevated))',
              }}
            >
              <span
                className={cn(
                  'font-[family-name:var(--font-display)] font-bold text-4xl tracking-widest',
                  'text-[var(--text-tertiary)] select-none',
                )}
              >
                {FOUNDER.initials}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <h3
                className={cn(
                  'font-[family-name:var(--font-display)] font-bold',
                  'text-[var(--text-primary)] text-xl tracking-[-0.02em]',
                )}
              >
                {FOUNDER.name}
              </h3>
              <p
                className={cn(
                  'font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider',
                  'text-[var(--text-tertiary)]',
                )}
              >
                {FOUNDER.role}
              </p>
            </div>

            <p
              className={cn(
                'font-[family-name:var(--font-body)]',
                'text-[var(--text-secondary)] text-sm leading-relaxed',
              )}
            >
              {FOUNDER.bio}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href={FOUNDER.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
                className={cn(
                  'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
                )}
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className={cn(
                  'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm',
                )}
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'px-[clamp(20px,5vw,80px)]',
          'py-[clamp(80px,12vh,160px)]',
          'flex flex-col items-center text-center',
        )}
      >
        <FadeIn direction="up" distance={30}>
          <h2
            className={cn(
              'font-[family-name:var(--font-display)] font-bold',
              'text-[var(--text-primary)]',
              'text-[clamp(2.5rem,5vw,4.5rem)]',
              'leading-none tracking-[-0.02em]',
            )}
          >
            Have a project in mind?
          </h2>
        </FadeIn>

        <FadeIn direction="up" distance={20} delay={0.2} className="mt-10">
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
              'focus-visible:ring-offset-[var(--bg-primary)]',
            )}
          >
            Get in Touch
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
