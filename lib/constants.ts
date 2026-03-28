export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  // { label: 'Work', href: '/work' }, ← uncomment when case studies are ready
] as const;

// Footer includes Work even while it's hidden from the main nav
export const FOOTER_NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Work', href: '/work' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/vantalabs', icon: 'github' as const, external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/vantalabs', icon: 'linkedin' as const, external: true },
  { label: 'X', href: 'https://x.com/vantalabs', icon: 'twitter' as const, external: true },
] as const;

export const CONTACT_EMAIL = 'info@vantalabs.dev';
