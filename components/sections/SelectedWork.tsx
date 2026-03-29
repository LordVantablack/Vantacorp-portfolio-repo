import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { FadeIn } from '@/components/shared/FadeIn';
import { ClipReveal } from '@/components/shared/ClipReveal';
import { BorderBeamCard } from '@/components/ui/BorderBeamCard';
import { cn } from '@/lib/utils';
import { FEATURED_PROJECTS } from '@/data/projects';
import type { Project } from '@/types/project';

// ── ProjectCard ───────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-primary)] rounded-[16px] transition-transform duration-[400ms] ease-out hover:-translate-y-1"
    >
      <BorderBeamCard className="h-full aspect-auto w-full" borderClass="bg-[var(--bg-primary)] p-4 sm:p-6">
      {/* Image / placeholder */}
      <ClipReveal direction="bottom" duration={1.0}>
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[var(--bg-elevated)]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className={cn(
                'object-cover',
                'transition-transform duration-500 ease-out',
                'group-hover:scale-[1.03]',
              )}
            />
          ) : (
            // Gradient placeholder — distinct per project via placeholderGradient
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br',
                project.placeholderGradient,
              )}
            >
              {/* Centered project title as visual anchor in placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={cn(
                    'font-[family-name:var(--font-display)] font-bold uppercase',
                    'text-[var(--text-tertiary)] text-xs tracking-[0.3em]',
                    'select-none',
                  )}
                >
                  {project.title}
                </span>
              </div>
            </div>
          )}

          {/* Subtle dark overlay on hover — draws eye to info bar below */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--bg-primary)]/0 transition-colors duration-500 group-hover:bg-[var(--bg-primary)]/20 pointer-events-none"
          />
        </div>
      </ClipReveal>

      {/* Info bar */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        {/* Left: title + description */}
        <div>
          <h3
            className={cn(
              'font-[family-name:var(--font-display)] font-bold',
              'text-[var(--text-primary)]',
              'text-[clamp(1.25rem,2vw,1.5rem)] leading-tight tracking-[-0.02em]',
              'transition-colors duration-300 group-hover:text-[var(--accent)]',
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'mt-1 font-[family-name:var(--font-body)]',
              'text-[var(--text-secondary)] text-sm leading-relaxed',
              'max-w-[480px]',
            )}
          >
            {project.description}
          </p>
        </div>

        {/* Right: tags + year + CTA */}
        <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
          {/* Tags + year */}
          <div
            className={cn(
              'flex flex-wrap sm:justify-end gap-x-2 gap-y-1',
              'font-[family-name:var(--font-body)] text-xs text-[var(--text-secondary)]',
            )}
          >
            {project.tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < project.tags.length - 1 && (
                  <span className="text-[var(--text-tertiary)] ml-2">•</span>
                )}
              </span>
            ))}
            <span className="text-[var(--text-tertiary)]">{project.year}</span>
          </div>

          {/* "View Case Study →" text link */}
          <span
            className={cn(
              'inline-flex items-center gap-1',
              'font-[family-name:var(--font-body)] text-xs font-medium',
              'text-[var(--text-tertiary)]',
              'transition-colors duration-300 group-hover:text-[var(--accent)]',
            )}
          >
            View Case Study
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
      </BorderBeamCard>
    </Link>
  );
}

// ── SelectedWork ──────────────────────────────────────────────────────────────

export function SelectedWork() {
  return (
    <section
      id="work"
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
          02 / WORK
        </span>
        <h2
          className={cn(
            'font-[family-name:var(--font-display)] font-bold',
            'text-[var(--text-primary)]',
            'text-[clamp(2.5rem,5vw,4.5rem)]',
            'leading-none tracking-[-0.02em] mb-4',
          )}
        >
          Selected Work
        </h2>
        <p
          className={cn(
            'font-[family-name:var(--font-body)]',
            'text-[var(--text-secondary)] text-lg leading-relaxed',
            'max-w-[640px]',
          )}
        >
          A curated look at what we&apos;ve been building.
        </p>
      </FadeIn>

      {/* Project cards — stacked full-width, 64–80px between */}
      <div className="flex flex-col gap-[clamp(60px,8vh,80px)]">
        {FEATURED_PROJECTS.map((project) => (
          <FadeIn
            key={project.slug}
            direction="up"
            distance={60}
            duration={1.0}
          >
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {/* View all link */}
      <FadeIn direction="up" distance={20} className="mt-16 md:mt-20">
        <Link
          href="/work"
          className={cn(
            'group inline-flex items-center gap-2',
            'font-[family-name:var(--font-body)] text-sm font-medium',
            'text-[var(--text-secondary)]',
            'transition-colors duration-300 hover:text-[var(--text-primary)]',
            // Underline slides in from left
            'relative',
            'after:absolute after:bottom-[-2px] after:left-0',
            'after:h-px after:w-0 after:bg-[var(--accent)]',
            'after:transition-[width] after:duration-300',
            'hover:after:w-full',
          )}
        >
          View all projects
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </FadeIn>
    </section>
  );
}
