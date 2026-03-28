'use client';

import { useRef, useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';

import { useGSAP } from '@/hooks/useGSAP';
import { FadeIn } from '@/components/shared/FadeIn';
import { EASE, DURATION, prefersReducedMotion } from '@/lib/animations';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

type ValidatedField = 'name' | 'email' | 'message';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'AI Integration',
  'Workflow Automation',
  'Other',
] as const;

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

const LINE_1_WORDS = "Let's build".split(' ');
const LINE_2_WORDS = 'something.'.split(' ');
const LINE_2_START = LINE_1_WORDS.length;

// ── Framer Motion variants ────────────────────────────────────────────────────

const formExitVariants = {
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ── Validation ────────────────────────────────────────────────────────────────

function validate(field: ValidatedField, value: string): string | undefined {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Must be at least 2 characters';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
      return undefined;
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Must be at least 10 characters';
      return undefined;
  }
}

// ── Shared field styles ───────────────────────────────────────────────────────

function inputClass(hasError: boolean): string {
  return cn(
    'w-full bg-transparent',
    'font-[family-name:var(--font-body)] text-base text-[var(--text-primary)]',
    'border-b pb-2 outline-none',
    'transition-colors duration-300',
    'placeholder:text-[var(--text-tertiary)]',
    hasError
      ? 'border-[var(--error)] focus:border-[var(--error)]'
      : 'border-[var(--border-visible)] focus:border-[var(--accent)]',
  );
}

const selectClass = cn(
  'w-full bg-transparent appearance-none',
  'font-[family-name:var(--font-body)] text-base text-[var(--text-primary)]',
  'border-b border-[var(--border-visible)] pb-2 pr-6 outline-none',
  'transition-colors duration-300',
  'focus:border-[var(--accent)]',
  '[&>option]:bg-[var(--bg-elevated)] [&>option]:text-[var(--text-primary)]',
);

// ── FormField ─────────────────────────────────────────────────────────────────

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--text-tertiary)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-[family-name:var(--font-body)] text-xs text-[var(--error)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── ContactForm ───────────────────────────────────────────────────────────────

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [values, setValues] = useState<FormValues>({
    name: '', email: '', projectType: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ValidatedField, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  // Headline word-clip reveal on mount — no ScrollTrigger since it's above fold
  useGSAP(
    () => {
      const spans = wordRefs.current.filter((s): s is HTMLSpanElement => s !== null);
      if (!spans.length || prefersReducedMotion()) return;

      gsap.from(spans, {
        yPercent: 100,
        duration: DURATION.slow,
        delay: 0.15,
        stagger: 0.1,
        ease: EASE.primary,
        onComplete() {
          gsap.set(spans, { clearProps: 'transform' });
        },
      });
    },
    { scope: headlineRef },
  );

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Live error clearing after first blur
    if (touched[field as ValidatedField]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validate(field as ValidatedField, value),
      }));
    }
  }

  function handleBlur(field: ValidatedField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
  }

  const isValid =
    !validate('name', values.name) &&
    !validate('email', values.email) &&
    !validate('message', values.message);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Surface all errors on submit attempt
    setTouched({ name: true, email: true, message: true });
    setErrors({
      name: validate('name', values.name),
      email: validate('email', values.email),
      message: validate('message', values.message),
    });
    if (!isValid) return;

    setSubmitState('loading');
    // Simulated submit — wire to /api/contact in Phase 2
    console.log('Contact submission:', values);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitState('success');
  }

  return (
    <section
      className={cn(
        'w-full',
        // Offset fixed navbar
        'pt-[calc(clamp(80px,12vh,160px)+72px)] pb-[clamp(80px,12vh,160px)]',
        'px-[clamp(20px,5vw,80px)]',
        'bg-[var(--bg-primary)]',
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]',
          'gap-[clamp(64px,8vw,120px)]',
          'max-w-[1280px] mx-auto',
        )}
      >
        {/* ── Left: Info ────────────────────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Headline — word-clip reveal */}
          <h1
            ref={headlineRef}
            className={cn(
              'font-[family-name:var(--font-display)] font-bold',
              'text-[var(--text-primary)]',
              'text-[clamp(2.5rem,5vw,4.5rem)]',
              'leading-none tracking-[-0.02em]',
            )}
          >
            <span className="block">
              {LINE_1_WORDS.map((word, i) => (
                <span key={`l1-${i}`}>
                  {i > 0 && '\u00A0'}
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
            <span className="block">
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
          </h1>

          {/* Subtext */}
          <FadeIn direction="up" distance={24} delay={0.5} className="mt-6">
            <p
              className={cn(
                'font-[family-name:var(--font-body)]',
                'text-[var(--text-secondary)] text-lg leading-relaxed',
                'max-w-[360px]',
              )}
            >
              Ready to start a project or just want to talk?
              We&apos;d love to hear from you.
            </p>
          </FadeIn>

          {/* Email + location */}
          <FadeIn direction="up" distance={20} delay={0.65} className="mt-8 flex flex-col gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                'font-[family-name:var(--font-body)] text-base',
                'text-[var(--text-primary)] w-fit',
                'relative pb-px',
                'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0',
                'after:bg-[var(--accent)] after:transition-[width] after:duration-300',
                'hover:after:w-full',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--accent)] rounded-sm',
              )}
            >
              {CONTACT_EMAIL}
            </a>
            <p className="font-[family-name:var(--font-body)] text-sm text-[var(--text-tertiary)]">
              Bengaluru, India
            </p>
          </FadeIn>

          {/* Social icons */}
          <FadeIn direction="up" distance={16} delay={0.75} className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICON_MAP[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className={cn(
                    'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                    'transition-colors duration-300',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-[var(--accent)] rounded-sm',
                  )}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              );
            })}
          </FadeIn>
        </div>

        {/* ── Right: Form ───────────────────────────────────────────────────── */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {submitState === 'success' ? (
              <motion.div
                key="success"
                variants={successVariants}
                initial={shouldReduceMotion ? 'visible' : 'hidden'}
                animate="visible"
                className="flex flex-col items-start justify-center min-h-[400px] gap-4"
              >
                <span
                  className={cn(
                    'font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest',
                    'text-[var(--accent)]',
                  )}
                >
                  Message sent
                </span>
                <p
                  className={cn(
                    'font-[family-name:var(--font-display)] font-bold',
                    'text-[var(--text-primary)]',
                    'text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.02em]',
                  )}
                >
                  Thanks for reaching out.
                  <br />
                  We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                variants={formExitVariants}
                initial="visible"
                exit={shouldReduceMotion ? 'visible' : 'exit'}
                className="flex flex-col gap-8"
                aria-label="Contact form"
              >
                {/* Name */}
                <FadeIn direction="up" distance={24} delay={0.3}>
                  <FormField
                    id="name"
                    label="Name"
                    error={touched.name ? errors.name : undefined}
                  >
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      aria-required="true"
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      className={inputClass(!!errors.name && !!touched.name)}
                    />
                  </FormField>
                </FadeIn>

                {/* Email */}
                <FadeIn direction="up" distance={24} delay={0.4}>
                  <FormField
                    id="email"
                    label="Email"
                    error={touched.email ? errors.email : undefined}
                  >
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-required="true"
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      className={inputClass(!!errors.email && !!touched.email)}
                    />
                  </FormField>
                </FadeIn>

                {/* Project type */}
                <FadeIn direction="up" distance={24} delay={0.5}>
                  <FormField id="projectType" label="Project Type">
                    <div className="relative">
                      <select
                        id="projectType"
                        value={values.projectType}
                        onChange={(e) => handleChange('projectType', e.target.value)}
                        className={cn(
                          selectClass,
                          !values.projectType && 'text-[var(--text-tertiary)]',
                        )}
                      >
                        <option value="" disabled>Select a type</option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {/* Custom caret — replaces browser-native arrow */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'pointer-events-none absolute right-0 bottom-3',
                          'font-[family-name:var(--font-mono)] text-xs text-[var(--text-tertiary)]',
                        )}
                      >
                        ↓
                      </span>
                    </div>
                  </FormField>
                </FadeIn>

                {/* Message */}
                <FadeIn direction="up" distance={24} delay={0.6}>
                  <FormField
                    id="message"
                    label="Message"
                    error={touched.message ? errors.message : undefined}
                  >
                    <textarea
                      id="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => {
                        handleChange('message', e.target.value);
                        // Auto-expand to content height
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onBlur={() => handleBlur('message')}
                      aria-required="true"
                      aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                      className={cn(inputClass(!!errors.message && !!touched.message), 'resize-none overflow-hidden')}
                    />
                  </FormField>
                </FadeIn>

                {/* Submit */}
                <FadeIn direction="up" distance={16} delay={0.7}>
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={submitState === 'loading'}
                      className={cn(
                        'w-full sm:w-auto',
                        'inline-flex items-center justify-center gap-2 rounded-full',
                        'px-10 py-4 text-sm font-medium font-[family-name:var(--font-body)]',
                        'bg-[var(--accent)] text-[var(--bg-primary)]',
                        'transition-[colors,transform,opacity] duration-300',
                        'hover:bg-[var(--accent-hover)] hover:scale-[1.02]',
                        'active:scale-[0.98]',
                        'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4',
                        'focus-visible:ring-offset-[var(--bg-primary)]',
                      )}
                    >
                      {submitState === 'loading' ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="inline-block w-3 h-3 rounded-full border border-current border-t-transparent animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    {submitState === 'error' && (
                      <p
                        role="alert"
                        className="font-[family-name:var(--font-body)] text-xs text-[var(--error)]"
                      >
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                  </div>
                </FadeIn>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
