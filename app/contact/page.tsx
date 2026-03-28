import type { Metadata } from 'next';

import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — VantaLabs',
  description: 'Start a conversation with VantaLabs. Tell us about your project and we\'ll get back to you within 24 hours.',
};

export default function ContactPage() {
  return <ContactForm />;
}
