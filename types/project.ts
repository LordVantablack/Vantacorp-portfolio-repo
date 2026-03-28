export interface Project {
  slug: string;
  title: string;
  /** One-liner shown on the home page card */
  description: string;
  tags: string[];
  year: string;
  /** Path to thumbnail image. Empty string = use gradient placeholder. */
  thumbnail: string;
  /** CSS gradient string used as placeholder background, e.g. "from-[#...] to-[#...]" */
  placeholderGradient: string;
  /** Whether to show on the home page SelectedWork section */
  featured: boolean;
  client: string;
  challenge: string;
  approach: string;
  outcome: string;
  techStack: string[];
  /** Ordered array of image paths for the case study gallery */
  images: string[];
  liveUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
