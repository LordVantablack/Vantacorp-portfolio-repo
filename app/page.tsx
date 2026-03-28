import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { ContactCTA } from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'VantaLabs — Software, Engineered to Scale',
  description:
    'VantaLabs is a development studio that builds web applications, mobile apps, AI integrations, and workflow automation for ambitious teams.',
};

export default function Home() {
  return (
    <>
      <Hero
        agencyName="VANTALABS"
        tagline="Software, engineered to scale."
        primaryCTA={{ label: 'View Our Work', href: '/#work' }}
        secondaryCTA={{ label: 'Get in Touch', href: '/contact' }}
      />
      <Services />
      <SelectedWork />
      <AboutPreview />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
