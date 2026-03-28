'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/components/shared/FadeIn';
import { cn } from '@/lib/utils';
import { DURATION } from '@/lib/animations';

// ── Types & Data ─────────────────────────────────────────────────────────────

interface Service {
  number: string;
  title: string;
  description: string;
  technologies: string[];
}

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Full-stack web applications built with modern frameworks. From marketing sites to complex SaaS platforms — fast, accessible, and built to scale.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  },
  {
    number: '02',
    title: 'Mobile Applications',
    description:
      'Cross-platform mobile experiences that feel native. We build apps that work seamlessly across iOS and Android without compromising on performance.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    number: '03',
    title: 'AI Integration',
    description:
      'Embedding intelligence into your products and operations. From conversational AI to custom model integration, we make AI practical and production-ready.',
    technologies: ['Claude API', 'OpenAI', 'LangChain', 'Python', 'RAG'],
  },
  {
    number: '04',
    title: 'Workflow Automation',
    description:
      'Identifying bottlenecks in your operations and replacing manual processes with intelligent, automated systems. Strategic automation that compounds over time.',
    technologies: ['n8n', 'Python', 'Custom Integrations', 'API Design'],
  },
];

// Framer Motion easing from THEME.md primary curve
const EASE_PRIMARY = [0.16, 1, 0.3, 1] as const;

// ── ServiceItem ───────────────────────────────────────────────────────────────

interface ServiceItemProps {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}

function ServiceItem({ service, isOpen, onToggle }: ServiceItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-b border-[var(--border-subtle)]">
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-start md:items-center justify-between gap-4 py-6',
          'text-left cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--bg-primary)]',
        )}
      >
        {/* Left: number + title — stacked on mobile, inline on desktop */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
          <span
            className={cn(
              'font-[family-name:var(--font-mono)] text-sm tabular-nums',
              'text-[var(--text-tertiary)] flex-shrink-0',
            )}
          >
            {service.number}
          </span>
          <span
            className={cn(
              'font-[family-name:var(--font-display)] font-bold',
              'text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em]',
              'transition-colors duration-300',
              isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]',
            )}
          >
            {service.title}
          </span>
        </div>

        {/* Right: toggle icon — + rotates 45° to form × */}
        <motion.span
          aria-hidden="true"
          className="flex-shrink-0 mt-1 md:mt-0 text-2xl font-light leading-none select-none text-[var(--text-tertiary)]"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : DURATION.fast, ease: EASE_PRIMARY }}
        >
          +
        </motion.span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE_PRIMARY }}
            className="overflow-hidden"
          >
            {/* Indent content to align with title on desktop */}
            <div className="pb-8 md:pl-[3.5rem] lg:pl-[4.5rem]">
              <p
                className={cn(
                  'font-[family-name:var(--font-body)]',
                  'text-[var(--text-secondary)] text-base leading-relaxed',
                  'max-w-[560px]',
                )}
              >
                {service.description}
              </p>

              {/* Tech pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'font-[family-name:var(--font-body)] text-xs',
                      'text-[var(--text-tertiary)]',
                      'border border-[var(--border-visible)] rounded-full',
                      'px-3 py-1',
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

export interface ServicesProps {
  /**
   * When false, all rows are shown fully expanded with no accordion behavior.
   * Useful for static/print views. Default: true
   */
  expandable?: boolean;
}

export function Services({ expandable = true }: ServicesProps) {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    if (!expandable) return;
    // Clicking the open item collapses it; clicking another opens it
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="services"
      className={cn(
        'w-full bg-[var(--bg-primary)]',
        'px-[clamp(20px,5vw,80px)]',
        'py-[clamp(80px,12vh,160px)]',
      )}
    >
      {/* Section header */}
      <FadeIn direction="up" distance={30} className="mb-16 md:mb-20">
        <span
          className={cn(
            'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
            'text-[var(--text-secondary)] block mb-4',
          )}
        >
          01 / SERVICES
        </span>
        <h2
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[var(--text-primary)]',
            'text-[clamp(2.5rem,5vw,4.5rem)]',
            'leading-none tracking-[-0.02em] mb-4',
          )}
        >
          What we build
        </h2>
        <p
          className={cn(
            'font-[family-name:var(--font-body)]',
            'text-[var(--text-secondary)] text-lg leading-relaxed',
            'max-w-[640px]',
          )}
        >
          We partner with ambitious teams to design, build, and scale software that moves the needle.
        </p>
      </FadeIn>

      {/* Service rows — each row has its own scroll trigger + staggered delay */}
      <div className="border-t border-[var(--border-subtle)]">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} direction="up" distance={30} delay={i * 0.07}>
            <ServiceItem
              service={service}
              isOpen={!expandable || openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
