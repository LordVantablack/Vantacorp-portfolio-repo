import type { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    slug: 'vantalabs-portfolio',
    title: 'VantaLabs Portfolio',
    description: 'Our own portfolio — built as a proof of concept for what we deliver to clients.',
    tags: ['Web App', 'Design System', 'Motion'],
    year: '2025',
    thumbnail: '',
    placeholderGradient: 'from-[#14143a] via-[#0f0f2a] to-[#0a0a1e]',
    featured: true,
    client: 'VantaLabs (Internal)',
    challenge:
      'A portfolio site that could not afford to be generic. It had to demonstrate cinematic motion, tight engineering discipline, and editorial restraint — all while loading fast and scoring on Core Web Vitals. The constraint: zero real client case studies at launch.',
    approach:
      'We treated the site itself as the primary case study. Every animation decision was deliberate and documented. GSAP drives scroll-triggered reveals; Framer Motion handles component-level transitions. The dark editorial aesthetic — borrowing from WorldQuant Foundry and ICOMAT — communicates premium without loud color.',
    outcome:
      'A portfolio that functions as a proof of capability. The site achieves 95+ Lighthouse scores across Performance, Accessibility, and SEO. It tells a coherent story for a young agency without overstating a client list.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'GSAP', 'Framer Motion', 'Convex', 'Clerk'],
    images: [],
    liveUrl: 'https://vantalabs.dev',
  },
  {
    slug: 'aikyam-capital-ai-workflows',
    title: 'Aikyam Capital AI Workflows',
    description: 'Strategic AI workflow automation for a capital management firm, cutting analyst turnaround by 40%.',
    tags: ['AI Integration', 'Automation', 'Finance'],
    year: '2025',
    thumbnail: '',
    placeholderGradient: 'from-[#0a2210] via-[#0d1c0e] to-[#071408]',
    featured: true,
    client: 'Aikyam Capital',
    challenge:
      'Aikyam Capital\'s research analysts were spending 60–70% of their time on manual data aggregation — pulling reports, normalizing formats, and assembling briefings. The firm needed AI embedded in their existing workflow without disrupting their compliance posture or exposing sensitive data externally.',
    approach:
      'We built a private AI pipeline using a locally-hosted model layer with Claude API as the reasoning engine. Custom integrations pulled from their existing data sources; structured extraction outputs fed directly into their internal reporting templates. All processing remained within their infrastructure boundary.',
    outcome:
      'Analyst turnaround on weekly briefings dropped from ~14 hours to under 8. The team reclaimed roughly 40% of their research time. The system runs unattended for routine reports and surfaces for human review only on low-confidence outputs.',
    techStack: ['Python', 'Claude API', 'LangChain', 'n8n', 'PostgreSQL', 'Docker'],
    images: [],
    testimonial: {
      quote:
        'The automation VantaLabs built didn\'t just save time — it changed how our team thinks about what\'s possible. We now move at a speed that would have required twice the headcount a year ago.',
      author: 'Rohan Mehta',
      role: 'Principal, Aikyam Capital',
    },
  },
  {
    slug: 'meridian-dashboard',
    title: 'Meridian Dashboard',
    description: 'A product analytics concept: real-time data visualization for SaaS teams who outgrew their metrics tool.',
    tags: ['Web App', 'Data Viz', 'Concept'],
    year: '2025',
    thumbnail: '',
    placeholderGradient: 'from-[#2e1206] via-[#221008] to-[#160b04]',
    featured: true,
    client: 'Concept Project',
    challenge:
      'Growing SaaS teams hit a wall with out-of-the-box analytics tools: too slow to query, too rigid to customize, and too disconnected from the product events that actually matter. We wanted to prove we could design and build a dashboard that felt both fast and deeply customizable — without the UX debt of most "flexible" tools.',
    approach:
      'We designed Meridian from the ground up as a concept project to showcase our data visualization and product design capabilities. The stack is optimized for real-time event streaming: Convex handles live queries, Recharts renders chart primitives, and the interface adapts to the user\'s data shape rather than forcing them into preset report types.',
    outcome:
      'The Meridian concept validates our ability to ship polished, production-quality product UIs. It\'s been used in three client pitches to demonstrate what a custom internal tool engagement could look like. Two of those led to signed contracts.',
    techStack: ['Next.js', 'TypeScript', 'Convex', 'Recharts', 'Tailwind CSS', 'Clerk'],
    images: [],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
