export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with VantaLabs felt less like hiring a vendor and more like gaining a technical co-founder. They understood the problem before we finished explaining it.',
    author: 'Name Surname',
    role: 'Position',
    company: 'Aikyam Capital',
  },
];
