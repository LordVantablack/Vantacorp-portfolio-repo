import type { Metadata } from 'next';

import { AboutContent } from '@/components/sections/AboutContent';

export const metadata: Metadata = {
  title: 'About — VantaLabs',
  description:
    "We're a development studio that treats every project like a product. Learn about our philosophy, process, and the team behind VantaLabs.",
};

export default function AboutPage() {
  return <AboutContent />;
}
